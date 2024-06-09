from flask import Flask, request, jsonify, Blueprint
import cloudinary
import cloudinary.uploader
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Video, Comment, Favorite, Category, Like
from datetime import datetime

shared_data_api = Blueprint('shared_data_api', __name__)

# Cloudinary Configuration
cloudinary.config(
    cloud_name="dztgp8g6w",
    api_key="158344581497744",
    api_secret="a5xb9RBMOpovJEOOranrRYLWAYw"
)

@shared_data_api.route('/api/sharedvideos', methods=['GET'])
@jwt_required()
def get_videos():
    current_user_id = get_jwt_identity()
    videos = Video.query.filter_by(user_id=current_user_id).all()
    videos_data = [
        {
            'id': video.id,
            'title': video.title,
            'src': video.src,
            'duration': video.duration,
            'created_at': video.created_at,
            'favorites_count': len(video.favorites),
            'comments_count': len(video.comments),
            'likes_count': len(video.likes),
            'ingredients_part1': video.ingredients_part1,
            'ingredients_part2': video.ingredients_part2
        }
        for video in videos
    ]
    return jsonify(videos_data)

@shared_data_api.route('/api/videos', methods=['POST'])
@jwt_required()
def add_video():
    current_user_id = get_jwt_identity()
    data = request.form
    video_file = request.files.get('videoFile')

    if video_file:
        upload_result = cloudinary.uploader.upload(video_file, resource_type="video")
        video_url = upload_result['secure_url']
    else:
        return jsonify({"error": "No video file provided"}), 400

    new_video = Video(
        src=video_url,
        description=data['description'],
        title=data['title'],
        user_id=current_user_id,
        duration=data['duration'],
        ingredients_part1=data['ingredientsPart1'],
        ingredients_part2=data['ingredientsPart2'],
        created_at=datetime.utcnow()
    )
    db.session.add(new_video)
    db.session.commit()
    return jsonify(new_video.serialize()), 201

@shared_data_api.route('/api/videos/<int:video_id>', methods=['DELETE'])
@jwt_required()
def delete_video(video_id):
    current_user_id = get_jwt_identity()
    video = Video.query.filter_by(id=video_id, user_id=current_user_id).first()
    if not video:
        return jsonify({"error": "Video not found or not authorized"}), 404

    # Delete related likes, comments, and favorites
    Comment.query.filter_by(video_id=video_id).delete()
    Favorite.query.filter_by(video_id=video_id).delete()
    Like.query.filter_by(video_id=video_id).delete()
    
    db.session.delete(video)
    db.session.commit()
    return jsonify({"message": "Video deleted"}), 200

@shared_data_api.route('/api/categories', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    return jsonify([category.serialize() for category in categories])

@shared_data_api.route('/api/videos/<int:video_id>/comments', methods=['GET'])
def get_video_comments(video_id):
    video = Video.query.get(video_id)
    if not video:
        return jsonify({"error": "Video not found"}), 404
    comments = Comment.query.filter_by(video_id=video_id).all()
    return jsonify([comment.serialize() for comment in comments])

@shared_data_api.route('/api/videos/<int:video_id>', methods=['PUT'])
@jwt_required()
def update_video(video_id):
    current_user_id = get_jwt_identity()
    data = request.form
    video = Video.query.filter_by(id=video_id, user_id=current_user_id).first()
    
    if not video:
        return jsonify({"error": "Video not found or not authorized"}), 404

    video.title = data['title']
    video.description = data['description']
    video.ingredients_part1 = data['ingredientsPart1']
    video.ingredients_part2 = data['ingredientsPart2']
    video.duration = data['duration']
    
    if 'videoFile' in request.files:
        video_file = request.files['videoFile']
        upload_result = cloudinary.uploader.upload(video_file, resource_type="video")
        video.src = upload_result['secure_url']

    db.session.commit()
    return jsonify(video.serialize()), 200
