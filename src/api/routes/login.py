from flask import Blueprint, request, jsonify
from models import db, User, Like, Favorite
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token
from datetime import timedelta

bcrypt = Bcrypt()

login_api = Blueprint('login_api', __name__)

@login_api.route('/login', methods=['POST'])
def login_user():
    email = request.json.get("email")
    password = request.json.get("password")

    user = User.query.filter_by(email=email).first()

    if user is None or not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Usuario o contraseña incorrectos"}), 401

    if not user.is_active:
        return jsonify({"error": "Cuenta no activada, comprueba tu correo"}), 401

    token = create_access_token(identity=user.id, expires_delta=timedelta(minutes=30))

    # Obtener likes y favoritos del usuario
    likes = Like.query.filter_by(user_id=user.id).all()
    favorites = Favorite.query.filter_by(user_id=user.id).all()

    return jsonify({
        "token": token,
        "user": {
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "surname": user.surname,
            "phone": user.phone,
            "is_active": user.is_active,
            "likes": [like.video_id for like in likes],
            "favorites": [favorite.video_id for favorite in favorites]
        }
    }), 200
