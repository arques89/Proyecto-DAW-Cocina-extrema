from flask import Blueprint, request, jsonify
from models import db, User, Address
from flask_jwt_extended import jwt_required, get_jwt_identity

address_api = Blueprint('address_api', __name__)

@address_api.route('/api/addresses', methods=['GET'])
@jwt_required()
def get_addresses():
    user_id = get_jwt_identity()
    addresses = Address.query.filter_by(user_id=user_id).all()
    return jsonify([address.serialize() for address in addresses]), 200

@address_api.route('/api/address', methods=['POST'])
@jwt_required()
def add_address():
    user_id = get_jwt_identity()
    data = request.get_json()

    new_address = Address(
        user_id=user_id,
        name=data['name'],
        surname=data['surname'],
        cif_nif=data['cif_nif'],
        address=data['address'],
        postal_code=data['postal_code'],
        city=data['city'],
        phone=data['phone'],
        use_as=data['use_as']
    )

    db.session.add(new_address)
    db.session.commit()

    return jsonify(new_address.serialize()), 201

@address_api.route('/api/addresses/<int:address_id>/default', methods=['PUT'])
@jwt_required()
def set_default_billing_address(address_id):
    try:
        user_id = get_jwt_identity()
        address = Address.query.filter_by(id=address_id, user_id=user_id).first()
        if not address:
            return jsonify({"error": "Address not found"}), 404

        # Reset all addresses to non-default
        Address.query.filter_by(user_id=user_id).update({"is_billing_default": False})
        
        # Set the selected address as default
        address.is_billing_default = True
        db.session.commit()
        return jsonify(address.serialize()), 200

    except Exception as e:
        print(f"Error setting default billing address: {e}")
        return jsonify({"error": "Internal server error"}), 500

@address_api.route('/api/addresses/<int:address_id>', methods=['PUT'])
@jwt_required()
def update_address(address_id):
    user_id = get_jwt_identity()
    data = request.get_json()

    address = Address.query.filter_by(id=address_id, user_id=user_id).first()
    if not address:
        return jsonify({"error": "Address not found"}), 404

    address.name = data.get('name', address.name)
    address.surname = data.get('surname', address.surname)
    address.cif_nif = data.get('cif_nif', address.cif_nif)
    address.address = data.get('address', address.address)
    address.postal_code = data.get('postal_code', address.postal_code)
    address.city = data.get('city', address.city)
    address.phone = data.get('phone', address.phone)
    address.use_as = data.get('use_as', address.use_as)

    db.session.commit()
    return jsonify(address.serialize()), 200

@address_api.route('/api/addresses/<int:address_id>', methods=['DELETE'])
@jwt_required()
def delete_address(address_id):
    user_id = get_jwt_identity()
    address = Address.query.filter_by(id=address_id, user_id=user_id).first()
    if not address:
        return jsonify({"error": "Address not found"}), 404

    db.session.delete(address)
    db.session.commit()
    return jsonify({"message": "Address deleted"}), 200
