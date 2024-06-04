from flask import request, jsonify, Blueprint
from models import db, User
from werkzeug.exceptions import HTTPException

update_user_bp = Blueprint('update_user_bp', __name__)

class APIException(HTTPException):
    code = 400

    def __init__(self, message, status_code=None, payload=None):
        super().__init__(message, payload)
        if status_code is not None:
            self.code = status_code

@update_user_bp.route('/users/<int:id>', methods=['PUT'])
def update_user(id):
    user = User.query.get(id)
    
    if not user:
        return jsonify({"error": "User not found"}), 404

    body = request.get_json()
    
    # Actualiza solo los campos proporcionados en el cuerpo de la solicitud
    if "name" in body:
        user.name = body["name"]
    if "surname" in body:
        user.surname = body["surname"]
    if "email" in body:
        user.email = body["email"]
    if "phone" in body:
        user.phone = body["phone"]
    if "password" in body:
        user.password = body["password"]
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
