from flask import Blueprint, request, jsonify
from models import db, User
from flask_bcrypt import Bcrypt
from flask_jwt_extended import jwt_required, get_jwt_identity

bcrypt = Bcrypt()

personal_data_api = Blueprint('personal_data_api', __name__)

# Obtener datos personales del usuario
@personal_data_api.route('/personaldata', methods=['GET'])
@jwt_required()
def get_personal_data():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if user is None:
        return jsonify({"error": "Usuario no encontrado"}), 404

    return jsonify(user.serialize()), 200

# Actualizar datos personales del usuario
@personal_data_api.route('/personaldata', methods=['PUT'])
@jwt_required()
def update_personal_data():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if user is None:
        return jsonify({"error": "Usuario no encontrado"}), 404

    data = request.json
    user.name = data.get('name', user.name)
    user.surname = data.get('surname', user.surname)
    user.email = data.get('email', user.email)
    user.phone = data.get('phone', user.phone)
    
    db.session.commit()
    return jsonify(user.serialize()), 200

# Actualizar contraseña del usuario
@personal_data_api.route('/personaldata/password', methods=['PUT'])
@jwt_required()
def update_password():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if user is None:
        return jsonify({"error": "Usuario no encontrado"}), 404

    data = request.json
    new_password = data.get('password')
    
    if not new_password:
        return jsonify({"error": "Contraseña es requerida"}), 400
    
    hashed_password = bcrypt.generate_password_hash(new_password).decode('utf-8')
    user.password = hashed_password
    
    db.session.commit()
    return jsonify({"message": "Contraseña actualizada exitosamente"}), 200
