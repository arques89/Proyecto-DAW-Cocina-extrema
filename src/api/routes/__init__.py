from flask import Blueprint

api = Blueprint('api', __name__)

# Importa las rutas necesarias
from .login import login_api
from routes.home import home_api
from routes.register import register_api
from routes.forgot import forgot_api
from routes.vlog import vlog_api
from routes.vlog_details import vlog_details_api
from routes.personal_data import personal_data_api
from routes.shared_data import shared_data_api

# Registrar otros blueprints si existen
# api.register_blueprint(other_blueprint)

# Asegúrate de registrar el blueprint 'login_api' en el blueprint 'api'
api.register_blueprint(home_api)
api.register_blueprint(register_api)
api.register_blueprint(login_api)
api.register_blueprint(forgot_api)
api.register_blueprint(personal_data_api)
api.register_blueprint(shared_data_api)
api.register_blueprint(vlog_api)
api.register_blueprint(vlog_details_api)
