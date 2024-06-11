from flask import Blueprint, request, jsonify, make_response
from models import db, Video, Favorite, Comment, Like, User
from flask_jwt_extended import jwt_required, get_jwt_identity, decode_token
from flask_cors import CORS, cross_origin
from functools import wraps

# Crear el Blueprint
vlog_details_api = Blueprint('vlog_details_api', __name__)

@vlog_details_api.route('/api/videos/<int:video_id>', methods=['GET'])
def get_video_details(video_id):
    try:
        video = Video.query.options(
            db.joinedload(Video.comments),
            db.joinedload(Video.favorites),
            db.joinedload(Video.likes)
        ).get(video_id)

        if not video:
            return jsonify({"error": "Video not found"}), 404

        user = User.query.get(video.user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404

        video_data = video.serialize()
        video_data["owner"] = {"name": user.name, "surname": user.surname}
        video_data["comments"] = [comment.serialize() for comment in video.comments]
        video_data["comment_count"] = len(video.comments)

        auth_header = request.headers.get('Authorization')
        if auth_header:
            try:
                token = auth_header.split(" ")[1]
                user_id = decode_token(token)['sub']
                print(f'User ID (GET /api/videos):', user_id)
            except:
                user_id = None
        else:
            user_id = None

        is_authenticated = user_id is not None

        if is_authenticated:
            is_favorite = video.id in [fav.video_id for fav in user.favorites]
            is_liked = video.id in [like.video_id for like in user.likes]
            video_data["is_favorite"] = is_favorite
            video_data["is_liked"] = is_liked
        else:
            video_data["is_favorite"] = False
            video_data["is_liked"] = False

        return jsonify(video_data), 200

    except Exception as e:
        print(f"Error getting video details: {e}")
        return jsonify({"error": "Internal server error"}), 500

@vlog_details_api.route('/api/videos/<int:video_id>/like', methods=['POST'])
@jwt_required()
def add_like(video_id):
    user_id = get_jwt_identity()

    video = Video.query.get(video_id)
    if not video:
        return jsonify({"error": "Video not found"}), 404

    existing_like = Like.query.filter_by(user_id=user_id, video_id=video_id).first()
    if existing_like:
        return jsonify({"error": "Video already liked"}), 400

    new_like = Like(user_id=user_id, video_id=video_id)
    db.session.add(new_like)
    db.session.commit()

    return jsonify({"message": "Like added", "like": new_like.serialize()}), 201

@vlog_details_api.route('/api/videos/<int:video_id>/like', methods=['DELETE'])
@jwt_required()
def remove_like(video_id):
    user_id = get_jwt_identity()

    like = Like.query.filter_by(user_id=user_id, video_id=video_id).first()
    if not like:
        return jsonify({"error": "Like not found"}), 404

    db.session.delete(like)
    db.session.commit()

    return jsonify({"message": "Like removed"}), 200

@vlog_details_api.route('/api/videos/<int:video_id>/comments', methods=['POST'])
@jwt_required()
def add_comment(video_id):
    user_id = get_jwt_identity()
    data = request.get_json()

    video = Video.query.get(video_id)
    if not video:
        return jsonify({"error": "Video not found"}), 404

    text = data.get('text')
    if not text:
        return jsonify({"error": "Comment text is required"}), 400

    new_comment = Comment(text=text, user_id=user_id, video_id=video_id)
    db.session.add(new_comment)
    db.session.commit()

    # Refrescar para obtener las relaciones
    db.session.refresh(new_comment)

    comment_data = new_comment.serialize()

    return jsonify({"message": "Comment added", "comment": comment_data}), 201

@vlog_details_api.route('/api/videos/<int:video_id>/comments/<int:comment_id>', methods=['DELETE'])
@jwt_required()
def delete_comment(video_id, comment_id):
    user_id = get_jwt_identity()

    comment = Comment.query.get(comment_id)
    if not comment:
        return jsonify({"error": "Comment not found"}), 404

    if comment.user_id != user_id:
        return jsonify({"error": "Unauthorized to delete this comment"}), 403

    db.session.delete(comment)
    db.session.commit()

    return jsonify({"message": "Comment deleted"}), 200

@vlog_details_api.route('/api/videos/<int:video_id>/comments', methods=['GET'])
def get_comments(video_id):
    comments = Comment.query.filter_by(video_id=video_id).all()
    comments_data = [comment.serialize() for comment in comments]
    return jsonify(comments_data), 200

@vlog_details_api.route('/api/videos/<int:video_id>/favorite', methods=['POST', 'OPTIONS'])
@cross_origin(supports_credentials=True)
@jwt_required() 
def add_favorite(video_id):
    try:
        user_id = get_jwt_identity()

        video = Video.query.get(video_id)
        if not video:
            return jsonify({"error": "Video not found"}), 404

        existing_favorite = Favorite.query.filter_by(user_id=user_id, video_id=video_id).first()
        if existing_favorite:
            return jsonify({"error": "Video already in favorites"}), 400

        new_favorite = Favorite(user_id=user_id, video_id=video_id)
        db.session.add(new_favorite)
        db.session.commit()

        return jsonify({"message": "Favorite added", "favorite": new_favorite.serialize()}), 201
    except Exception as e:
        print(f"Error adding favorite: {e}") 
        return jsonify({"error": "Internal server error"}), 500

@vlog_details_api.route('/api/videos/<int:video_id>/favorite', methods=['DELETE'])
@jwt_required()
def remove_favorite(video_id):
    try:
        user_id = get_jwt_identity()
        favorite = Favorite.query.filter_by(user_id=user_id, video_id=video_id).first()

        if not favorite:
            return jsonify({"error": "Favorite not found"}), 404

        db.session.delete(favorite)
        db.session.commit()

        return jsonify({"message": "Favorite removed"}), 200
    except Exception as e:
        print(f"Error removing favorite: {e}")
        return jsonify({"error": "Internal server error"}), 500

@vlog_details_api.route('/api/videos/<int:video_id>/favorite', methods=['POST', 'DELETE'])
@jwt_required()
def manage_favorite(video_id):
    try:
        user_id = get_jwt_identity()
        video = Video.query.get(video_id)
        if not video:
            return jsonify({"error": "Video not found"}), 404

        if request.method == 'POST':
            existing_favorite = Favorite.query.filter_by(user_id=user_id, video_id=video_id).first()
            if existing_favorite:
                return jsonify({"error": "Video already in favorites"}), 400

            new_favorite = Favorite(user_id=user_id, video_id=video_id)
            db.session.add(new_favorite)
            db.session.commit()
            return jsonify({"message": "Favorite added", "favorite": new_favorite.serialize()}), 201

        elif request.method == 'DELETE':
            favorite = Favorite.query.filter_by(user_id=user_id, video_id=video_id).first()
            if not favorite:
                return jsonify({"error": "Favorite not found"}), 404

            db.session.delete(favorite)
            db.session.commit()
            return jsonify({"message": "Favorite removed"}), 200

    except Exception as e:
        print(f"Error managing favorite: {e}")
        return jsonify({"error": "Internal server error"}), 500

@vlog_details_api.route('/api/videos/<int:video_id>/like', methods=['POST', 'DELETE'])
@jwt_required()
def manage_like(video_id):
    user_id = get_jwt_identity()
    video = Video.query.get(video_id)
    if not video:
        return jsonify({"error": "Video not found"}), 404

    if request.method == 'POST':
        existing_like = Like.query.filter_by(user_id=user_id, video_id=video_id).first()
        if existing_like:
            return jsonify({"error": "Video already liked"}), 400

        new_like = Like(user_id=user_id, video_id=video_id)
        db.session.add(new_like)
        db.session.commit()
        return jsonify({"message": "Like added", "like": new_like.serialize()}), 201

    elif request.method == 'DELETE':
        like = Like.query.filter_by(user_id=user_id, video_id=video_id).first()
        if not like:
            return jsonify({"error": "Like not found"}), 404

        db.session.delete(like)
        db.session.commit()
        return jsonify({"message": "Like removed"}), 200
