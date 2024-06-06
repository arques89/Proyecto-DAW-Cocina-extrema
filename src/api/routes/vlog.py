from flask import Flask, jsonify, Blueprint
from sqlalchemy.orm import joinedload
from models import db, Video

vlog_api = Blueprint('vlog_api', __name__)

@vlog_api.route('/api/videos', methods=['GET'])
def get_videos():
    videos = Video.query.options(joinedload(Video.user)).all()
    videos_data = []
    for video in videos:
        user = video.user
        user_name = user.name if user else 'Anónimo'
        user_surname = user.surname if user else ''
        print(f'Video ID: {video.id}, User ID: {video.user_id}, User Name: {user_name}, User Surname: {user_surname}')
        videos_data.append({
            'id': video.id,
            'title': video.title,
            'src': video.src,
            'favorites_count': len(video.favorites) or 0,
            'comments_count': len(video.comments) or 0,
            'likes_count': len(video.likes) if video.likes else 0,
            'user_name': user_name,
            'user_surname': user_surname
        })
    return jsonify(videos_data)
