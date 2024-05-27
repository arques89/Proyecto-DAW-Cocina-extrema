from flask import Flask
from flask_jwt_extended import JWTManager

from config import Config
from routes import api  # Asegúrate de que esta línea importe el Blueprint correctamente
from cors import init_cors
from database import db, init_db
from mail import init_mail
from admin import init_admin

def create_app():
    # Crear una instancia de la aplicación Flask
    app = Flask(__name__)

    # Cargar la configuración desde config.py
    app.config.from_object(Config)

    # Configurar la clave secreta JWT
    jwt = JWTManager(app)

    # Inicializar CORS
    init_cors(app)

    # Inicializar la base de datos
    init_db(app)

    # Inicializar Flask-Mail
    init_mail(app)

    # Registrar las rutas en la aplicación
    app.register_blueprint(api)

    # Inicializar la interfaz de administración
    init_admin(app)

    return app

# Comprobación para ejecutar el servidor de desarrollo
if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
