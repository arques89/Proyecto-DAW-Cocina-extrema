from flask import jsonify, Blueprint
from models import db, Video
from sqlalchemy.orm import joinedload

vlog_api = Blueprint('vlog_api', __name__)

@vlog_api.route('/api/vlogvideos', methods=['GET'])
def get_videos():
    videos = Video.query.options(joinedload(Video.user)).all()
    videos_data = []
    for video in videos:
        user_data = {
            'name': video.user.name,
            'surname': video.user.surname
        } if video.user else None

        video_data = {
            'id': video.id,
            'src': video.src,
            'description': video.description,
            'user_id': video.user_id,
            'created_at': video.created_at,
            'title': video.title,
            'ingredients_part1': video.ingredients_part1,
            'ingredients_part2': video.ingredients_part2,
            'duration': video.duration,
            'likes_count': len(video.likes),
            'comments_count': len(video.comments),
            'favorites_count': len(video.favorites),
            'user': user_data
        }
        videos_data.append(video_data)

    return jsonify(videos_data)
