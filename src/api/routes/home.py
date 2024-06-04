# routes/home.py

from flask import Blueprint, render_template_string

home_api = Blueprint('home_api', __name__)

# Ruta principal
@home_api.route('/')
def index():
    html_content = '''
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Proyecto Cocina Extrema</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Sedgwick+Ave&display=swap');

            body {
                font-family: 'Roboto', sans-serif;
                background-color: #000;
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                color: #fff;
            }
            .container {
                text-align: center;
                padding: 20px;
                background-color: #333;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                border-radius: 8px;
            }
            h1 {
                font-family: 'Sedgwick Ave', cursive;
                color: #ff0000;
                font-size: 48px;
                margin-bottom: 20px;
            }
            p {
                font-size: 18px;
                color: #bbb;
                margin: 10px 0;
            }
            a {
                color: #ff0000;
                text-decoration: none;
                font-size: 20px;
            }
            a:hover {
                text-decoration: underline;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Proyecto Cocina Extrema</h1>
            <p>Bienvenidos a nuestro proyecto de cocina.</p>
            <p>Explora nuestras recetas y videos.</p>
            <a href="/admin">Acceder a la base de datos</a>
        </div>
    </body>
    </html>
    '''
    return render_template_string(html_content)
