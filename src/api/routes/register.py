from flask import Blueprint, request, jsonify, render_template
from models import db, User
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token
from mail import Mail
from flask_mail import Message

bcrypt = Bcrypt()
mail = Mail()
register_api = Blueprint('register_api', __name__)

# Ruta para registrar usuario
@register_api.route('/register', methods=['POST'])
def register_user():
    email = request.json["email"]
    password = request.json["password"]
    body = request.json

    user_exists = User.query.filter_by(email=email).first() is not None
    
    if user_exists:
        return jsonify({"error": "User already exists"}), 409
    
    hashed_password = bcrypt.generate_password_hash(password)
    token = create_access_token(identity=str(email))

    new_user = User(
        email=email,
        password=hashed_password,
        name=body['name'],
        surname=body['surname'],
        phone=body['phone'],
        token=token,
        is_active=False,
        is_admin=False
    )
    
    db.session.add(new_user)
    db.session.commit()
    
    confirm_account(email, new_user.name, token)
    return jsonify({
        "id": new_user.id,
        "email": new_user.email,
        'name': new_user.name,
        'surname': new_user.surname,
        'phone': new_user.phone,
        'token': token
    })

# Ruta para confirmar cuenta
@register_api.route('/confirm_account')
def confirm_account(email, name, token):
    msg = Message('Confirma tu Cuenta', sender='arquesjavier@gmail.com', recipients=[email])
    msg.html = render_template('confirm_account.html', name=name, email=email, token=token)
    mail.send(msg)
    return 'Correo electrónico enviado correctamente!'

# Ruta para activar cuenta
@register_api.route('/activate/<token>')
def activate(token):
    user = User.query.filter_by(token=token).first()
    
    if not user:
        return jsonify({"error": "User not found"}), 404

    if user.is_active:
        return jsonify({"error": "User is already active"}), 400

    user.is_active = True
    user.token = None

    db.session.commit()

    return render_template('active_account.html')