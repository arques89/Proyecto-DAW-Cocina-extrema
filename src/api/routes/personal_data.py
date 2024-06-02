# routes/personal_data.py

from flask import Blueprint, request, jsonify
from models import db, User
from flask_bcrypt import Bcrypt
from flask_jwt_extended import jwt_required, get_jwt_identity

bcrypt = Bcrypt()
personal_data_api = Blueprint('personal_data_api', __name__)

# Rutas de usuario
@personal_data_api.route('/users', methods=['GET'])
def list_user():
    users = User.query.all()
    all_users = [user.serialize() for user in users]
    return jsonify(all_users)

@personal_data_api.route('/users/<int:id>', methods=['PUT'])
def update_user(id):
    user = User.query.get(id)
    
    if not user:
        return jsonify({"error": "User not found"}), 404

    body = request.get_json()
    
    if "name" in body:
        user.name = body["name"]
    if "surname" in body:
        user.surname = body["surname"]
    if "email" in body:
        user.email = body["email"]
    if "phone" in body:
        user.phone = body["phone"]
    if "password" in body:
        user.password = bcrypt.generate_password_hash(body["password"]).decode('utf-8')
    if "is_active" in body:
        user.is_active = body["is_active"]
    if "token" in body:
        user.token = body["token"]
    if "is_admin" in body:
        user.is_admin = body["is_admin"]

    try:
        db.session.commit()
        return jsonify(user.serialize()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

@personal_data_api.route('/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get(id)

    if user is None:
        return jsonify({"error": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": "User eliminado correctamente"}), 200

@personal_data_api.route('/users/<int:id>/password', methods=['PUT'])
@jwt_required()
def update_password(id):
    user = User.query.get(id)
    
    if not user:
        return jsonify({"error": "User not found"}), 404

    body = request.get_json()
    new_password = body.get('password', None)

    if not new_password:
        return jsonify({"error": "Password is required"}), 400

    hashed_password = bcrypt.generate_password_hash(new_password).decode('utf-8')
    user.password = hashed_password

    try:
        db.session.commit()
        return jsonify({"message": "Password updated successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400
