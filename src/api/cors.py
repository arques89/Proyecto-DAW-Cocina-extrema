from flask_cors import CORS

def init_cors(app):
    CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}},
         supports_credentials=True, allow_headers=["Content-Type", "Authorization"],
         methods=["GET", "POST", "OPTIONS", "DELETE", "PUT"])
