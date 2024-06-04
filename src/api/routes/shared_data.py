from flask import Flask, request, jsonify, Blueprint
import cloudinary
import cloudinary.uploader
from models import db, Video, Comment, Favorite, Category
from datetime import datetime

from flask import Blueprint
shared_data_api = Blueprint('shared_data_api', __name__)
# Cloudinary Configuration
cloudinary.config(
    cloud_name="dztgp8g6w",
    api_key="158344581497744",
    api_secret="a5xb9RBMOpovJEOOranrRYLWAYw"
)

@shared_data_api.route('/api/videos', methods=['GET'])
def get_videos():
    videos = Video.query.all()
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
def add_video():
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
        user_id=data['user_id'],
        duration=data['duration'],
        ingredients_part1=data['ingredientsPart1'],
        ingredients_part2=data['ingredientsPart2'],
        created_at=datetime.utcnow()
    )
    db.session.add(new_video)
    db.session.commit()
    return jsonify(new_video.serialize()), 201

@shared_data_api.route('/api/videos/<int:video_id>', methods=['DELETE'])
def delete_video(video_id):
    video = Video.query.get(video_id)
    if not video:
        return jsonify({"error": "Video not found"}), 404
    db.session.delete(video)
    db.session.commit()
    return jsonify({"message": "Video deleted"}), 200

@shared_data_api.route('/api/categories', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    return jsonify([category.serialize() for category in categories])
