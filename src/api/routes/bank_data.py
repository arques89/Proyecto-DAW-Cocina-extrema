from flask import Blueprint, request, jsonify
from models import db, User, BankData
from flask_jwt_extended import jwt_required, get_jwt_identity

bank_data_api = Blueprint('bank_data_api', __name__)

@bank_data_api.route('/api/bankdata', methods=['GET'])
@jwt_required()
def get_bank_data():
    user_id = get_jwt_identity()
    bank_data = BankData.query.filter_by(user_id=user_id).all()
    return jsonify([data.serialize() for data in bank_data]), 200

@bank_data_api.route('/api/bankdata', methods=['POST'])
@jwt_required()
def add_bank_data():
    user_id = get_jwt_identity()
    data = request.get_json()

    new_bank_data = BankData(
        user_id=user_id,
        card_number=data['card_number'],
        cardholder_name=data['cardholder_name'],
        expiry_date=data['expiry_date'],
        cvv=data['cvv'],
        is_default=data['is_default']
    )

    db.session.add(new_bank_data)
    db.session.commit()

    return jsonify(new_bank_data.serialize()), 201

@bank_data_api.route('/api/bankdata/<int:bankdata_id>/default', methods=['PUT'])
@jwt_required()
def set_default_bank_data(bankdata_id):
    try:
        user_id = get_jwt_identity()
        bank_data = BankData.query.filter_by(id=bankdata_id, user_id=user_id).first()
        if not bank_data:
            return jsonify({"error": "Bank data not found"}), 404

        # Reset all bank data to non-default
        BankData.query.filter_by(user_id=user_id).update({"is_default": False})
        
        # Set the selected bank data as default
        bank_data.is_default = True
        db.session.commit()
        return jsonify(bank_data.serialize()), 200

    except Exception as e:
        print(f"Error setting default bank data: {e}")
        return jsonify({"error": "Internal server error"}), 500

@bank_data_api.route('/api/bankdata/<int:bankdata_id>', methods=['PUT'])
@jwt_required()
def update_bank_data(bankdata_id):
    user_id = get_jwt_identity()
    data = request.get_json()

    bank_data = BankData.query.filter_by(id=bankdata_id, user_id=user_id).first()
    if not bank_data:
        return jsonify({"error": "Bank data not found"}), 404

    bank_data.card_number = data.get('card_number', bank_data.card_number)
    bank_data.cardholder_name = data.get('cardholder_name', bank_data.cardholder_name)
    bank_data.expiry_date = data.get('expiry_date', bank_data.expiry_date)
    bank_data.cvv = data.get('cvv', bank_data.cvv)
    bank_data.is_default = data.get('is_default', bank_data.is_default)

    db.session.commit()
    return jsonify(bank_data.serialize()), 200

@bank_data_api.route('/api/bankdata/<int:bankdata_id>', methods=['DELETE'])
@jwt_required()
def delete_bank_data(bankdata_id):
    user_id = get_jwt_identity()
    bank_data = BankData.query.filter_by(id=bankdata_id, user_id=user_id).first()
    if not bank_data:
        return jsonify({"error": "Bank data not found"}), 404

    db.session.delete(bank_data)
    db.session.commit()
    return jsonify({"message": "Bank data deleted"}), 200
