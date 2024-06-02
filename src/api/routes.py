# from flask import Flask, request, jsonify, url_for, Blueprint, current_app, session, render_template, render_template_string
# from models import db, User
# from werkzeug.exceptions import HTTPException
# from flask_bcrypt import Bcrypt
# from flask_session import Session
# from flask_jwt_extended import create_access_token
# from flask_jwt_extended import get_jwt_identity
# from flask_jwt_extended import jwt_required
# from flask_jwt_extended import JWTManager
# from models import db, User, Video, Comment, Like, Favorite, Category, VideoCategory
# import bcrypt
# from flask_mail import Message , Mail
# import random
# import jwt
# bcrypt = Bcrypt()
# import datetime

# mail = Mail()
# import cloudinary
# import cloudinary.uploader
# import cloudinary.api

# api = Blueprint('api', __name__)

# from datetime import timedelta
# delta = timedelta(
#     days=50,
#     seconds=27,
#     microseconds=10,
#     milliseconds=29000,
#     minutes=5,
#     hours=8,
#     weeks=2
# )

# cloudinary.config(
#   cloud_name = "dztgp8g6w",
#   api_key = "158344581497744",
#   api_secret = "a5xb9RBMOpovJEOOranrRYLWAYw"
# )

# class APIException(HTTPException):
#     code = 400

#     def __init__(self, message, status_code=None, payload=None):
#         super().__init__(message, payload)
#         if status_code is not None:
#             self.code = status_code




# # mailtrap

# # Ruta para enviar un correo electrónico de prueba
# # @api.route('/confirm_account')
# # def confirm_account():
# #     # Crear un mensaje de correo electrónico
# #     msg = Message('Confirma tu Cuenta', 
# #     sender='from@example.com', 
# #     recipients=['to@example.com'])

# #     # Renderizar una plantilla HTML para el cuerpo del correo electrónico
# #     msg.html = render_template('confirm_account.html', 
# #     username='Usuario de ejemplo')
# #     # msg.body = "Hey Paul, sending you this email from my Flask app, lmk if it works."

# #     # Enviar el correo electrónico
# #     mail.send(msg)
# #     return 'Correo electrónico enviado correctamente!'
# # Generador de contraseñas
# from flask import request, jsonify
# import cloudinary.uploader

# @api.route('/upload_video', methods=['POST'])
# def upload_video():
#     # Verificar si se envía un archivo
#     if 'file' not in request.files:
#         return jsonify({"error": "No file part in the request"}), 400
    
#     file = request.files['file']

#     if file.filename == '':
#         return jsonify({"error": "No selected file"}), 400

#     if file:
#         # Subir archivo a Cloudinary
#         result = cloudinary.uploader.upload(file, resource_type="video")
#         video_url = result.get('secure_url')

#         if not video_url:
#             return jsonify({"error": "Failed to upload video to Cloudinary"}), 500

#         # Obtener otros datos del request
#         description = request.form.get('description')
#         user_id = request.form.get('user_id')

#         if not description or not user_id:
#             return jsonify({"error": "Description and user_id are required"}), 400

#         # Crear un nuevo registro de Video en la base de datos
#         new_video = Video(
#             src=video_url,
#             description=description,
#             user_id=user_id
#         )

#         db.session.add(new_video)
#         db.session.commit()

#         return jsonify(new_video.serialize()), 201

#     return jsonify({"error": "File upload failed"}), 500

# @api.route('/api/videos', methods=['GET'])
# def get_videos():
#     try:
#         videos = Video.query.all()
#         videos_serialized = [video.serialize() for video in videos]
#         return jsonify(videos_serialized), 200
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# def gen_pass():
#     minus = "abcdefghijklmnopqrstuvwxyz"
#     mayus = minus.upper()
#     numeros = "0123456789"
#     simbolos = "@#[]{-.}]/,¿?!="
#     longitud = 8
#     base = minus + mayus + numeros + simbolos

#     muestra = random.sample(base, longitud)
#     password_cambiada = "".join(muestra)

#     return password_cambiada

# @api.route('/forgot_password', methods=['POST'])
# def forgot_password():
#     data = request.get_json()
#     email = data.get('email')

#     if not email:
#         return jsonify({'error': 'Correo electrónico requerido'}), 400

#     # Verificar si el correo existe en la base de datos
#     user = User.query.filter_by(email=email).first()
#     if not user:
#         return jsonify({'error': 'El correo electrónico no está registrado'}), 404

#     # Generar token
#     token = jwt.encode({
#         'email': email,
#         'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
#     }, 'your-secret-key', algorithm='HS256')

#     msg = Message('Restablecer tu Contraseña', sender='from@example.com', recipients=[email])
#     msg.html = render_template('forgot_password.html', token=token)
#     mail.send(msg)

#     return jsonify({'message': 'Correo electrónico enviado correctamente!'}), 200

# @api.route('/new_password/<token>', methods=['GET', 'POST'])
# def new_password(token):
#     try:
#         data = jwt.decode(token, 'your-secret-key', algorithms=['HS256'])
#         email = data['email']
#     except jwt.ExpiredSignatureError:
#         return jsonify({'error': 'El token ha expirado'}), 400
#     except jwt.InvalidTokenError:
#         return jsonify({'error': 'Token inválido'}), 400

#     if request.method == 'POST':
#         new_password = request.json.get('new_password')
#         if not new_password:
#             return jsonify({'error': 'Nueva contraseña requerida'}), 400

#         # Actualizar la contraseña del usuario en la base de datos
#         user = User.query.filter_by(email=email).first()
#         if not user:
#             return jsonify({'error': 'Usuario no encontrado'}), 404

#         hashed_password = bcrypt.generate_password_hash(new_password).decode('utf-8')
#         user.password = hashed_password
#         db.session.commit()

#         return jsonify({'message': 'Contraseña actualizada exitosamente'}), 200

#     return render_template('set_new_password.html', token=token)


# # Login


# @api.route('/login', methods=['POST'])
# def login_user():
#     email = request.json["email"]
#     password = request.json["password"]
    
#     user = User.query.filter_by(email=email).first()
    
#     if user is None:
#         return jsonify({"error": "Usuario no encontrado"}), 401

#     if not bcrypt.check_password_hash(user.password, password):
#         return jsonify({"error": "Contraseña no valida"}), 401
    
#     if not user.is_active:
#         return jsonify({"error": "Cuenta no activada, comprueba tu correo"}), 401
    
#     data = {
#         "id": user.id,
#         'email': user.email,
#         'name': user.name,
#         'surname': user.surname,
#         'phone': user.phone,
#         'is_active': user.is_active
#     }
        
#     token = create_access_token(identity=data, expires_delta=timedelta(minutes=1))
#     return jsonify({"token": token}), 200


# ##----------------------------------------------------------------------------##
# ##---------------------------------TABLE USER---------------------------------##
# ##----------------------------------------------------------------------------##

# @api.route('/register', methods=['POST'])
# def register_user():
#     email = request.json["email"]
#     password = request.json["password"]
#     body = request.json

#     user_exists = User.query.filter_by(email=email).first() is not None
    
#     if user_exists:
#         return jsonify({"error" : "User already exists"}), 409
    
#     hashed_password = bcrypt.generate_password_hash(password)
#     # Genera el token después de la creación del usuario
#     token = create_access_token(identity=str(email))  # Suponiendo que la generación del token sea exitosa
    
#     # Llamada a create_token pasando el correo electrónico
#     new_user = User(email=email , password=hashed_password , name=body['name'], surname=body['surname'], phone=body['phone'], token=token, is_active=False, is_admin=False)  # Añadir phone al nuevo usuario
#     db.session.add(new_user)
#     db.session.commit()
    
#     confirm_account(email, new_user.name, token)
#     # activate(token)
#     return jsonify({
#         "id" : new_user.id,
#         "email" : new_user.email,
#         'name': new_user.name,
#         'surname': new_user.surname,
#         'phone' : new_user.phone,
#         'token': token  # Agregar el token a la respuesta JSON
#     })


# @api.route('/confirm_account')
# def confirm_account(email, name, token):
#     # Crear un mensaje de correo electrónico
#     msg = Message('Confirma tu Cuenta', 
#     sender='arquesjavier@gmail.com', 
#     recipients=[email])

#     # Renderizar una plantilla HTML para el cuerpo del correo electrónico
#     msg.html = render_template('confirm_account.html', 
#     name=name, email=email, token=token)
#     # msg.body = "Hey Paul, sending you this email from my Flask app, lmk if it works."

#     # Enviar el correo electrónico
#     mail.send(msg)
#     return 'Correo electrónico enviado correctamente!'

# @api.route('/activate/<token>')
# def activate(token):
#     # Buscar al usuario por su dirección de correo electrónico
#     # user = User.query.filter_by(email=email).first()
#     user = User.query.filter_by(token=token).first()
    
#     # Verificar si el usuario existe
#     if not user:
#         return jsonify({"error": "User not found"}), 404

#     # Verificar si el usuario ya está activo
#     if user.is_active:
#         return jsonify({"error": "User is already active"}), 400

#     # Activar la cuenta del usuario
#     user.is_active = True
#     user.token = None  # Asegúrate de asignar None, no null

#     # Guardar los cambios en la base de datos
#     db.session.commit()

#     return render_template('active_account.html')
# ##----------------------------------------------------------------------------##
# ##---------------------------------TABLE CHEF---------------------------------##
# ##----------------------------------------------------------------------------##


# #_____________________________________CRUD_____________________________________#

# #___________________________________LIST CHEF___________________________________#
# # @api.route('/chefs', methods=['GET'])
# # def list_chef():
# #     chefs = Chef.query.all()
# #     all_chefs = []
# #     for chef in chefs:
# #         all_chefs.append(chef.serialize())
# #     return jsonify(all_chefs)

# #__________________________________CREATE CHEF__________________________________#
# # @api.route('/crear_chef' , methods=['POST'])
# # def crear_chef():

# #     imagen_to_load = request.files["imagen"]
# #     if not imagen_to_load:
# #         return jsonify("imagen no existe")


# #     result = cloudinary.uploader.upload(imagen_to_load)
# #     print(result)
# #     url=result['url']
# #     print("esta es la url..................",url)

# #     # dataUser = get_jwt_identity()
# #     name=request.form["name"]
# #     descripcion=request.form["descripcion"]

# #     chef_check_name = Chef.query.filter_by(name=name).first()
# #     if chef_check_name != None:
# #         raise APIException('Ya existe este nombre de chef')
# #     chef = Chef(
# #         name=name.lower(),
# #         imagen=url,
# #         descripcion=descripcion.lower(),
# #     )

# #     db.session.add(chef)
# #     db.session.commit()
# #     return jsonify("ok"), 201

# #__________________________________UPDATE CHEF__________________________________#
# # @api.route('/chef/<int:id>', methods=['POST'])
# # def update_chef(id):
# #     chef = Chef.query.get(id)

# #     image_to_load = request.files["file"]
# #     if not image_to_load:
# #         return jsonify("imagen no existe")

# #     result = cloudinary.uploader.upload(image_to_load)
# #     url = result['url']

# #     name = request.form["name"]
# #     descripcion = request.form["descripcion"]

# #     if name != chef.name:
# #         chef.name = name.lower()
# #     chef.imagen = url
# #     chef.descripcion = descripcion.lower()

# #     db.session.commit()

# #     return jsonify("ok"), 201
# #__________________________________DELETE CHEF__________________________________#
# # @api.route('/chefs/<int:id>' , methods=['DELETE'])
# # def delete_chef(id):

# #     chef = Chef.query.get(id)

# #     if chef is None:
# #         raise APIException("CHEF DELETE", 201)

# #     db.session.delete(chef)
# #     db.session.commit()

# #     return jsonify({"message": "Chef eliminado correctamente"}), 200


# @api.route('/')
# def index():
#     html_content = '''
#     <!DOCTYPE html>
#     <html lang="en">
#     <head>
#         <meta charset="UTF-8">
#         <meta name="viewport" content="width=device-width, initial-scale=1.0">
#         <title>Proyecto Cocina Extrema</title>
#         <style>
#             @import url('https://fonts.googleapis.com/css2?family=Sedgwick+Ave&display=swap');

#             body {
#                 font-family: 'Roboto', sans-serif;
#                 background-color: #000;
#                 margin: 0;
#                 padding: 0;
#                 display: flex;
#                 justify-content: center;
#                 align-items: center;
#                 height: 100vh;
#                 color: #fff;
#             }
#             .container {
#                 text-align: center;
#                 padding: 20px;
#                 background-color: #333;
#                 box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
#                 border-radius: 8px;
#             }
#             h1 {
#                 font-family: 'Sedgwick Ave', cursive;
#                 color: #ff0000; /* Rojo */
#                 font-size: 48px;
#                 margin-bottom: 20px;
#             }
#             p {
#                 font-size: 18px;
#                 color: #bbb;
#                 margin: 10px 0;
#             }
#             a {
#                 color: #ff0000;
#                 text-decoration: none;
#                 font-size: 20px;
#             }
#             a:hover {
#                 text-decoration: underline;
#             }
#         </style>
#     </head>
#     <body>
#         <div class="container">
#             <h1>Proyecto Cocina Extrema</h1>
#             <p>Bienvenidos a nuestro proyecto de cocina.</p>
#             <p>Explora nuestras recetas y videos.</p>
#             <a href="/admin">Acceder a la base de datos</a>
#         </div>
#     </body>
#     </html>
#     '''
#     return render_template_string(html_content)




# #___________________________________LIST CHEF___________________________________#
# #__________________________________CREATE CHEF__________________________________#
# #__________________________________UPDATE USER__________________________________#
# #__________________________________DELETE USER__________________________________#

# #___________________________________LIST USER___________________________________#
# #__________________________________CREATE USER__________________________________#
# #__________________________________UPDATE USER__________________________________#
# #__________________________________DELETE USER__________________________________#


# ##----------------------------------------------------------------------------##
# ##---------------------------------TABLE USER---------------------------------##
# ##----------------------------------------------------------------------------##


# #_____________________________________CRUD_____________________________________#

# #___________________________________LIST USER___________________________________#
# @api.route('/users', methods=['GET'])
# def list_user():
#     users = User.query.all()
#     all_users = []
#     for user in users:
#         all_users.append(user.serialize())
#     return jsonify(all_users)

# #__________________________________CREATE USER__________________________________#
# # @api.route('/register', methods=['POST'])
# # def register_user():
# #     email = request.json["email"]
# #     password = request.json["password"]
# #     body = request.json
# #     user_exists = User.query.filter_by(email=email).first() is not None
    
# #     if user_exists:
# #         return jsonify({"error" : "User already exists"}), 409
    
# #     hashed_password = bcrypt.generate_password_hash(password)

# #     new_user = User(email=email , password=hashed_password , name=body['name'], surname=body['surname'], is_active=True, is_admin=False)
# #     db.session.add(new_user)
# #     db.session.commit()
    
# #     return jsonify({
# #         "id" : new_user.id,
# #         "email" : new_user.email,
# #         'name': new_user.name,
# #         'surname': new_user.surname
        
# #     })
    
# #__________________________________UPDATE USER__________________________________#
# # @api.route('/users/<int:id>' , methods=['PUT'])
# # def update_user(id):

# #     user = User.query.get(id)
# #     body = request.get_json()

# #     if "username" in body:
# #         user.username = body["username"]
# #     elif "email" in body:
# #         user.email = body["email"]

# #     db.session.commit()

# #     return jsonify(user.serialize())


# @api.route('/users/<int:id>', methods=['PUT'])
# def update_user(id):
#     user = User.query.get(id)
    
#     if not user:
#         return jsonify({"error": "User not found"}), 404

#     body = request.get_json()
    
#     # Actualiza solo los campos proporcionados en el cuerpo de la solicitud
#     if "name" in body:
#         user.name = body["name"]
#     if "surname" in body:
#         user.surname = body["surname"]
#     if "email" in body:
#         user.email = body["email"]
#     if "phone" in body:
#         user.phone = body["phone"]
#     if "password" in body:
#         user.password = body["password"]
#     if "is_active" in body:
#         user.is_active = body["is_active"]
#     if "token" in body:
#         user.token = body["token"]
#     if "is_admin" in body:
#         user.is_admin = body["is_admin"]

#     try:
#         db.session.commit()
#         return jsonify(user.serialize()), 200
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({"error": str(e)}), 400
# #__________________________________DELETE USER__________________________________#
# @api.route('/users/<int:id>' , methods=['DELETE'])
# def delete_user(id):

#     user = User.query.get(id)

#     if user is None:
#         raise APIException("USER DELETE", 201)

#     db.session.delete(user)
#     db.session.commit()

#     return jsonify({"message": "User eliminado correctamente"}), 200

# # Cambiar contraseña en setings datos personales
# @api.route('/users/<int:id>/password', methods=['PUT'])
# @jwt_required()
# def update_password(id):
#     user = User.query.get(id)
    
#     if not user:
#         return jsonify({"error": "User not found"}), 404

#     body = request.get_json()
#     new_password = body.get('password', None)

#     if not new_password:
#         return jsonify({"error": "Password is required"}), 400

#     hashed_password = bcrypt.generate_password_hash(new_password).decode('utf-8')
#     user.password = hashed_password

#     try:
#         db.session.commit()
#         return jsonify({"message": "Password updated successfully"}), 200
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({"error": str(e)}), 400
    
    
    
    
    
    






# @api.route('/api/videos/<int:video_id>/comments', methods=['GET'])
# def get_video_comments(video_id):
#     comments = Comment.query.filter_by(video_id=video_id).all()
#     comments_serialized = [comment.serialize() for comment in comments]
#     return jsonify(comments_serialized), 200


# @api.route('/api/videos/<int:video_id>/like', methods=['DELETE'])
# @jwt_required()
# def remove_like(video_id):
#     user_id = get_jwt_identity()
#     like = Like.query.filter_by(user_id=user_id, video_id=video_id).first()

#     if not like:
#         return jsonify({"error": "Like not found"}), 404

#     db.session.delete(like)
#     db.session.commit()

#     return jsonify({"message": "Like removed successfully"}), 200

# # Like a video
# @api.route('/api/videos/<int:video_id>/like', methods=['POST'])
# @jwt_required()
# def add_like(video_id):
#     user_id = get_jwt_identity()['id']
#     video = Video.query.get(video_id)

#     if not video:
#         return jsonify({"error": "Video not found"}), 404

#     like = Like.query.filter_by(user_id=user_id, video_id=video_id).first()
#     if like:
#         return jsonify({"message": "User already liked this video"}), 400

#     new_like = Like(user_id=user_id, video_id=video_id)
#     db.session.add(new_like)
#     db.session.commit()

#     return jsonify({"message": "Like added successfully"}), 201

# # Favorite a video
# @api.route('/api/videos/<int:video_id>/favorite', methods=['POST'])
# @jwt_required()
# def add_favorite(video_id):
#     user_id = get_jwt_identity()['id']
#     video = Video.query.get(video_id)

#     if not video:
#         return jsonify({"error": "Video not found"}), 404

#     favorite = Favorite.query.filter_by(user_id=user_id, video_id=video_id).first()
#     if favorite:
#         return jsonify({"message": "Video already in favorites"}), 400

#     new_favorite = Favorite(user_id=user_id, video_id=video_id)
#     db.session.add(new_favorite)
#     db.session.commit()

#     return jsonify({"message": "Video added to favorites successfully"}), 201




















# @api.route('/api/videos/<int:video_id>/comment', methods=['POST'])
# @jwt_required()
# def add_comment(video_id):
#     user_identity = get_jwt_identity()
#     user = User.query.get(user_identity['id'])
#     data = request.get_json()
#     if not data or not data.get('text'):
#         return jsonify({"error": "Comment text is required"}), 400

#     new_comment = Comment(
#         text=data['text'],
#         user_id=user.id,
#         video_id=video_id,
#         timestamp=datetime.datetime.utcnow()
#     )
#     db.session.add(new_comment)
#     db.session.commit()

#     print(f"Comment added by {user.name} {user.surname}")

#     return jsonify({"message": "Comment added successfully", "comment": new_comment.serialize(), "user": {"name": user.name, "surname": user.surname}}), 201

# @api.route('/api/videos/<int:video_id>/comments', methods=['GET'])
# def get_comments(video_id):
#     comments = Comment.query.filter_by(video_id=video_id).order_by(Comment.timestamp.desc()).all()
#     comments_serialized = []
#     for comment in comments:
#         user = User.query.get(comment.user_id)
#         comment_data = comment.serialize()
#         comment_data['user'] = {'name': user.name, 'surname': user.surname}
#         comments_serialized.append(comment_data)
#     return jsonify(comments_serialized), 200