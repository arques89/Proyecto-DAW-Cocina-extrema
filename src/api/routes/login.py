from flask import Blueprint, request, jsonify
from models import db, User
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token
from datetime import timedelta

bcrypt = Bcrypt()

login_api = Blueprint('login_api', __name__)

# Login
@login_api.route('/login', methods=['POST'])
def login_user():
    email = request.json["email"]
    password = request.json["password"]
    
    user = User.query.filter_by(email=email).first()
    
    if user is None:
        return jsonify({"error": "Usuario no encontrado"}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Contraseña no valida"}), 401
    
    if not user.is_active:
        return jsonify({"error": "Cuenta no activada, comprueba tu correo"}), 401
    
    data = {
        "id": user.id,
        'email': user.email,
        'name': user.name,
        'surname': user.surname,
        'phone': user.phone,
        'is_active': user.is_active
    }
        
    token = create_access_token(identity=data, expires_delta=timedelta(minutes=1))
    return jsonify({"token": token}), 200