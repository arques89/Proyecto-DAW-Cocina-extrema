from flask import Flask, jsonify, Blueprint
from models import db, Video, Like

vlog_api = Blueprint('vlog_api', __name__)

@vlog_api.route('/api/videos', methods=['GET'])
def get_videos():
    videos = Video.query.all()
    videos_data = [
        {
            'id': video.id,
            'title': video.title,
            'src': video.src,
            'favorites_count': len(video.favorites) or 0,
            'comments_count': len(video.comments) or 0,
            'likes_count': len(video.likes) if video.likes else 0
        }
        for video in videos
    ]
    return jsonify(videos_data)































# from flask import Blueprint, request, jsonify
# from models import db, Video, Comment, Like, Favorite
# import cloudinary.uploader
# from flask_jwt_extended import jwt_required, get_jwt_identity
# import datetime

# vlog_api = Blueprint('vlog_api', __name__)

# # Configuración de Cloudinary
# cloudinary.config(
#     cloud_name="dztgp8g6w",
#     api_key="158344581497744",
#     api_secret="a5xb9RBMOpovJEOOranrRYLWAYw"
# )

# @vlog_api.route('/upload_video', methods=['POST'])
# def upload_video():
#     if 'file' not in request.files:
#         return jsonify({"error": "No file part in the request"}), 400
    
#     file = request.files['file']

#     if file.filename == '':
#         return jsonify({"error": "No selected file"}), 400

#     if file:
#         result = cloudinary.uploader.upload(file, resource_type="video")
#         video_url = result.get('secure_url')

#         if not video_url:
#             return jsonify({"error": "Failed to upload video to Cloudinary"}), 500

#         description = request.form.get('description')
#         user_id = request.form.get('user_id')

#         if not description or not user_id:
#             return jsonify({"error": "Description and user_id are required"}), 400

#         new_video = Video(
#             src=video_url,
#             description=description,
#             user_id=user_id
#         )

#         db.session.add(new_video)
#         db.session.commit()

#         return jsonify(new_video.serialize()), 201

#     return jsonify({"error": "File upload failed"}), 500

# @vlog_api.route('/api/videos', methods=['GET'])
# def get_videos():
#     try:
#         videos = Video.query.all()
#         videos_serialized = [video.serialize() for video in videos]
#         return jsonify(videos_serialized), 200
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# @vlog_api.route('/api/videos/<int:video_id>/comments', methods=['GET'])
# def get_video_comments(video_id):
#     comments = Comment.query.filter_by(video_id=video_id).all()
#     comments_serialized = [comment.serialize() for comment in comments]
#     return jsonify(comments_serialized), 200

# @vlog_api.route('/api/videos/<int:video_id>/like', methods=['DELETE'])
# @jwt_required()
# def remove_like(video_id):
#     user_id = get_jwt_identity()
#     like = Like.query.filter_by(user_id=user_id, video_id=video_id).first()

#     if not like:
#         return jsonify({"error": "Like not found"}), 404

#     db.session.delete(like)
#     db.session.commit()

#     return jsonify({"message": "Like removed successfully"}), 200

# @vlog_api.route('/api/videos/<int:video_id>/like', methods=['POST'])
# @jwt_required()
# def add_like(video_id):
#     user_id = get_jwt_identity()['id']
#     video = Video.query.get(video_id)

#     if not video:
#         return jsonify({"error": "Video not found"}), 404

#     like = Like.query.filter_by(user_id=user_id, video_id=video_id).first()
#     if like:
#         return jsonify({"message": "User already liked this video"}), 400

#     new_like = Like(user_id=user_id, video_id=video_id)
#     db.session.add(new_like)
#     db.session.commit()

#     return jsonify({"message": "Like added successfully"}), 201


# @vlog_api.route('/api/videos/<int:video_id>/comment', methods=['POST'])
# @jwt_required()
# def add_comment(video_id):
#     user_identity = get_jwt_identity()
#     user = User.query.get(user_identity['id'])
#     data = request.get_json()
#     if not data or not data.get('text'):
#         return jsonify({"error": "Comment text is required"}), 400

#     new_comment = Comment(
#         text=data['text'],
#         user_id=user.id,
#         video_id=video_id,
#         timestamp=datetime.datetime.utcnow()
#     )
#     db.session.add(new_comment)
#     db.session.commit()

#     print(f"Comment added by {user.name} {user.surname}")

#     return jsonify({"message": "Comment added successfully", "comment": new_comment.serialize(), "user": {"name": user.name, "surname": user.surname}}), 201

# @vlog_api.route('/api/videos/<int:video_id>/comments', methods=['GET'])
# def get_comments(video_id):
#     comments = Comment.query.filter_by(video_id=video_id).order_by(Comment.timestamp.desc()).all()
#     comments_serialized = []
#     for comment in comments:
#         user = User.query.get(comment.user_id)
#         comment_data = comment.serialize()
#         comment_data['user'] = {'name': user.name, 'surname': user.surname}
#         comments_serialized.append(comment_data)
#     return jsonify(comments_serialized), 200

# @vlog_api.route('/api/videos/<int:video_id>/favorite', methods=['POST'])
# @jwt_required()
# def add_favorite(video_id):
#     user_id = get_jwt_identity()['id']
#     video = Video.query.get(video_id)

#     if not video:
#         return jsonify({"error": "Video not found"}), 404

#     favorite = Favorite.query.filter_by(user_id=user_id, video_id=video_id).first()
#     if favorite:
#         return jsonify({"message": "Video already in favorites"}), 400

#     new_favorite = Favorite(user_id=user_id, video_id=video_id)
#     db.session.add(new_favorite)
#     db.session.commit()

#     return jsonify({"message": "Video added to favorites successfully"}), 201