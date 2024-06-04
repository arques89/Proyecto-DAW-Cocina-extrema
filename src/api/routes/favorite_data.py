from flask import Blueprint, request, jsonify, make_response
from models import db, Video, Favorite
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_cors import CORS, cross_origin
from functools import wraps
from flask_jwt_extended import verify_jwt_in_request

def jwt_required_for_get(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        if request.method == 'GET':
            verify_jwt_in_request()
        return fn(*args, **kwargs)
    return wrapper


favorites_api = Blueprint('favorites_api', __name__)
CORS(favorites_api, supports_credentials=True)

@favorites_api.route('/api/favorite/videos', methods=['GET', 'OPTIONS']) 
@jwt_required_for_get
def get_videos():
    if request.method == 'OPTIONS':
        # ... (manejo de OPTIONS igual al anterior)

        user_id = get_jwt_identity()
    print(f'user_id: {user_id}, is_authenticated: {is_authenticated}')

    # Obtener los favoritos del usuario desde la base de datos
    favorites = Favorite.query.filter_by(user_id=user_id).all()
    favorite_video_ids = [fav.video_id for fav in favorites]
    print(f'favorite_video_ids: {favorite_video_ids}')

    # Obtener todos los videos y filtrar por los favoritos del usuario
    all_videos = Video.query.all()
    videos_data = []

    for video in all_videos:
        video_data = {
            'id': video.id,
            'title': video.title,
            'src': video.src,
            'duration': video.duration,
            'created_at': video.created_at,
            'favorites_count': len(video.favorites),
            'comments_count': len(video.comments),
            'likes_count': len(video.likes),
            'ingredients_part1': video.ingredients_part1,
            'ingredients_part2': video.ingredients_part2,
            'is_favorite': video.id in favorite_video_ids # Verificar si el video es favorito
        }
        
        videos_data.append(video_data)

    return jsonify(videos_data)