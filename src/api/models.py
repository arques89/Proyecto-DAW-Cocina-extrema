from flask_sqlalchemy import SQLAlchemy 

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(80), nullable=False)
    surname = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False, name='uq_email')
    phone = db.Column(db.String(120), unique=True, nullable=False, name='uq_phone')
    password = db.Column(db.String(250), nullable=False)
    is_active = db.Column(db.Boolean(), nullable=False)
    token = db.Column(db.Text, nullable=True)
    is_admin = db.Column(db.Boolean(), default=False)
    
    def __repr__(self):
        return '<User %r>' % self.email

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'surname': self.surname,
            'email': self.email,
            'phone' : self.phone
        }

            # do not serialize the password, its a security breach

class Chef(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(80), unique=True, nullable=False, name='uq_name')
    descripcion = db.Column(db.String(200), unique=True, nullable=False, name='uq_descripcion')
    imagen = db.Column(db.String(80), unique=False, nullable=False)

    def __repr__(self):
        return '<Chef %r>' % self.name
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "image": self.imagen,
            "description": self.descripcion,
        }
        
class Concursantes(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(80), unique=True, nullable=False, name='uq_name')
    descripcion = db.Column(db.String(200), unique=True, nullable=False, name='uq_descripcion')
    imagen = db.Column(db.String(80), unique=False, nullable=False)

    def __repr__(self):
        return '<Concursantes %r>' % self.name
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "image": self.imagen,
            "description": self.descripcion,
        }