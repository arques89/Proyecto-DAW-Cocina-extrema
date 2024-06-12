from flask import Flask
from flask_jwt_extended import JWTManager

from routes.home import home_api
from routes.login import login_api
from routes.register import register_api
from routes.forgot import forgot_api
from routes.vlog import vlog_api
from routes.vlog_details import vlog_details_api
from routes.personal_data import personal_data_api
from routes.shared_data import shared_data_api
from routes.favorite_data import favorites_api
from routes.address_data import address_api
from routes.bank_data import bank_data_api
from routes.content import content_api

from config import Config
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
    app.register_blueprint(home_api)
    app.register_blueprint(register_api)
    app.register_blueprint(login_api)
    app.register_blueprint(forgot_api)
    app.register_blueprint(personal_data_api)
    app.register_blueprint(shared_data_api)
    app.register_blueprint(vlog_api)
    app.register_blueprint(vlog_details_api)
    app.register_blueprint(favorites_api)
    app.register_blueprint(address_api)
    app.register_blueprint(bank_data_api)
    app.register_blueprint(content_api)
    # Inicializar la interfaz de administración
    init_admin(app)

    return app

# Comprobación para ejecutar el servidor de desarrollo
if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
