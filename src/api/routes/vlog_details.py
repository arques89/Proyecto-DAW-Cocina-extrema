from flask import Flask, Blueprint, request, jsonify
from flask_sqlalchemy import SQLAlchemy

# Inicialización de la aplicación Flask y la base de datos
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///videos.db'  # Asegúrate de configurar la URI de tu base de datos
db = SQLAlchemy(app)

# Importar los modelos de tu archivo models.py
from models import User, Video, Comment, Favorite, Like

# Crear el Blueprint
vlog_details_api = Blueprint('vlog_details_api', __name__)

# 1. Añadir favoritos
@vlog_details_api.route('/api/videos/<int:video_id>/favorite', methods=['POST'])
def add_favorite(video_id):
    user_id = request.json.get('user_id')
    favorite = Favorite(user_id=user_id, video_id=video_id)
    db.session.add(favorite)
    db.session.commit()
    return jsonify({"message": "Favorite added"}), 201

# 2. Eliminar favoritos
@vlog_details_api.route('/api/videos/<int:video_id>/favorite', methods=['DELETE'])
def remove_favorite(video_id):
    user_id = request.json.get('user_id')
    favorite = Favorite.query.filter_by(user_id=user_id, video_id=video_id).first()
    if favorite:
        db.session.delete(favorite)
        db.session.commit()
        return jsonify({"message": "Favorite removed"}), 200
    return jsonify({"error": "Favorite not found"}), 404

# 3. Obtener comentarios
@vlog_details_api.route('/api/videos/<int:video_id>/comments', methods=['GET'])
def get_comments(video_id):
    comments = Comment.query.filter_by(video_id=video_id).all()
    return jsonify([comment.serialize() for comment in comments]), 200

# 4. Obtener número total de comentarios
@vlog_details_api.route('/api/videos/<int:video_id>/comments/count', methods=['GET'])
def get_comments_count(video_id):
    count = Comment.query.filter_by(video_id=video_id).count()
    return jsonify({"count": count}), 200

# 5. Obtener video
@vlog_details_api.route('/api/videos/<int:video_id>', methods=['GET'])
def get_video(video_id):
    video = Video.query.get(video_id)
    if video:
        return jsonify(video.serialize()), 200
    return jsonify({"error": "Video not found"}), 404

# 6. Obtener título del video
@vlog_details_api.route('/api/videos/<int:video_id>/title', methods=['GET'])
def get_video_title(video_id):
    video = Video.query.get(video_id)
    if video:
        return jsonify({"title": video.title}), 200
    return jsonify({"error": "Video not found"}), 404

# 7. Añadir like
@vlog_details_api.route('/api/videos/<int:video_id>/like', methods=['POST'])
def add_like(video_id):
    user_id = request.json.get('user_id')
    like = Like(user_id=user_id, video_id=video_id)
    db.session.add(like)
    db.session.commit()
    return jsonify({"message": "Like added"}), 201

# 8. Eliminar like
@vlog_details_api.route('/api/videos/<int:video_id>/like', methods=['DELETE'])
def remove_like(video_id):
    user_id = request.json.get('user_id')
    like = Like.query.filter_by(user_id=user_id, video_id=video_id).first()
    if like:
        db.session.delete(like)
        db.session.commit()
        return jsonify({"message": "Like removed"}), 200
    return jsonify({"error": "Like not found"}), 404

# 9. Obtener ingredientes parte 1
@vlog_details_api.route('/api/videos/<int:video_id>/ingredients/part1', methods=['GET'])
def get_ingredients_part1(video_id):
    video = Video.query.get(video_id)
    if video:
        return jsonify({"ingredients_part1": video.ingredients_part1}), 200
    return jsonify({"error": "Video not found"}), 404

# 10. Obtener ingredientes parte 2
@vlog_details_api.route('/api/videos/<int:video_id>/ingredients/part2', methods=['GET'])
def get_ingredients_part2(video_id):
    video = Video.query.get(video_id)
    if video:
        return jsonify({"ingredients_part2": video.ingredients_part2}), 200
    return jsonify({"error": "Video not found"}), 404

# 11. Obtener nombre del propietario de la receta
@vlog_details_api.route('/api/videos/<int:video_id>/owner', methods=['GET'])
def get_video_owner(video_id):
    video = Video.query.get(video_id)
    if video:
        user = User.query.get(video.user_id)
        if user:
            return jsonify({"name": user.name, "surname": user.surname}), 200
    return jsonify({"error": "Video or User not found"}), 404

# Registrar el Blueprint en la aplicación principal
app.register_blueprint(vlog_details_api)

if __name__ == '__main__':
    app.run(debug=True)
