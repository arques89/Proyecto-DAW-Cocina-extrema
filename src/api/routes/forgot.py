from flask import Blueprint, request, jsonify, render_template
from models import db, User
from flask_mail import Message
import jwt
import datetime
from flask_bcrypt import Bcrypt
from mail import Mail

bcrypt = Bcrypt()
mail = Mail()
forgot_api = Blueprint('forgot_api', __name__)

@forgot_api.route('/forgot_password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    email = data.get('email')

    if not email:
        return jsonify({'error': 'Correo electrónico requerido'}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'error': 'El correo electrónico no está registrado'}), 404

    token = jwt.encode({
        'email': email,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }, 'your-secret-key', algorithm='HS256')

    msg = Message('Restablecer tu Contraseña', sender='from@example.com', recipients=[email])
    msg.html = render_template('forgot_password.html', token=token)
    mail.send(msg)

    return jsonify({'message': 'Correo electrónico enviado correctamente!'}), 200

@forgot_api.route('/new_password/<token>', methods=['GET', 'POST'])
def new_password(token):
    try:
        data = jwt.decode(token, 'your-secret-key', algorithms=['HS256'])
        email = data['email']
    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'El token ha expirado'}), 400
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Token inválido'}), 400

    if request.method == 'POST':
        new_password = request.json.get('new_password')
        if not new_password:
            return jsonify({'error': 'Nueva contraseña requerida'}), 400

        user = User.query.filter_by(email=email).first()
        if not user:
            return jsonify({'error': 'Usuario no encontrado'}), 404

        hashed_password = bcrypt.generate_password_hash(new_password).decode('utf-8')
        user.password = hashed_password
        db.session.commit()

        return jsonify({'message': 'Contraseña actualizada exitosamente'}), 200

    return render_template('set_new_password.html', token=token)
