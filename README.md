# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Abrir dos terminales una para front-end y otra back-end

------------------------------------------------------
Front-end:
------------------------------------------------------
raiz del proyecto:

Verificar que Vite este instalado:
vite –version
Si no lo esta:
npm install -g vite

despues:
yarn install

yarn dev (levantar el proyecto front-end)

------------------------------------------------------
Back-end:
------------------------------------------------------
Tener instalado en el equipo:

Python 3.12.3 (página oficial de Python)
Python interprete (descargar del store de windows Python 3.12)

Acceder a la raiz del back-end desde raiz del proyecto: cd src/api/

Instalar pipenv:

pip install pipenv

crear el entorno de python:

pipenv shell

Instalar dependencias usadas en el proyecto (pipfile) dentro del entorno:

pipenv install

Usar flask para levantar el proyecto back-end:

flask run




<!-- sm 14px  = 20px en xd
2xl 24px  = 40px en xd
margen laterales  de px-32 -->

<!-- $ pip list
Package            Version
------------------ --------
alembic            1.13.1  
bcrypt             4.1.3   
blinker            1.8.2   
cachelib           0.13.0
certifi            2024.2.2
click              8.1.7
cloudinary         1.40.0
colorama           0.4.6
Flask              3.0.3
Flask-Admin        1.6.1
Flask-Bcrypt       1.0.1
Flask-Cors         4.0.1
Flask-JWT-Extended 4.6.0
Flask-Mail         0.9.1
Flask-Migrate      4.0.7
Flask-Session      0.8.0
Flask-SQLAlchemy   3.1.1
greenlet           3.0.3
itsdangerous       2.2.0
Jinja2             3.1.4
Mako               1.3.5
MarkupSafe         2.1.5
msgspec            0.18.6
pip                24.0
PyJWT              2.8.0
six                1.16.0
SQLAlchemy         2.0.30
typing_extensions  4.11.0
urllib3            2.2.1
Werkzeug           3.0.3
WTForms            3.1.2 -->
