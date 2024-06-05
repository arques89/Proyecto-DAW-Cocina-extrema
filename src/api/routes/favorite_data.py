from flask import Blueprint, request, jsonify, make_response
from models import db, Video, Favorite
from flask_jwt_extended import jwt_required, get_jwt_identity, decode_token
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
def get_videos():
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:5173")
        response.headers.add('Access-Control-Allow-Headers', "Authorization, Content-Type")
        response.headers.add('Access-Control-Allow-Methods', 'GET, OPTIONS, POST, DELETE, PUT')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        print("Sending OPTIONS response with headers:", response.headers)
        return response
    elif request.method == 'GET':
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

        videos_data = []

        if is_authenticated:
            # Obtener directamente los videos favoritos del usuario
            favorites = Favorite.query.filter_by(user_id=user_id).all()
            
            # Crear la lista de videos con la información necesaria
            for favorite in favorites:
                video = favorite.video
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
                    'is_favorite': True  # Estos videos son favoritos por definición
                }
                videos_data.append(video_data)

        return jsonify(videos_data), 200

@favorites_api.route('/api/favorite/videos/<int:video_id>', methods=['POST'])
@jwt_required() 
def add_favorite(video_id):
    user_id = get_jwt_identity()

    # Verificar si el video existe
    video = Video.query.get(video_id)
    if not video:
        return jsonify({"error": "Video not found"}), 404

    # Verificar si el favorito ya existe
    existing_favorite = Favorite.query.filter_by(user_id=user_id, video_id=video_id).first()
    if existing_favorite:
        return jsonify({"error": "Video already in favorites"}), 400

    # Crear el nuevo favorito
    new_favorite = Favorite(user_id=user_id, video_id=video_id)
    db.session.add(new_favorite)
    db.session.commit()

    return jsonify({"message": "Favorite added", "favorite": new_favorite.serialize()}), 201

@favorites_api.route('/api/favorite/videos/<int:video_id>', methods=['DELETE'])
@jwt_required()
def delete_favorite(video_id):
    user_id = get_jwt_identity()

    # Verificar si el favorito existe
    favorite = Favorite.query.filter_by(user_id=user_id, video_id=video_id).first()
    if not favorite:
        return jsonify({"error": "Favorite not found"}), 404

    # Eliminar el favorito
    db.session.delete(favorite)
    db.session.commit()

    return jsonify({"message": "Favorite deleted"}), 200

