from datetime import datetime
from database import db

from datetime import datetime
from database import db

class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(80), nullable=False)
    surname = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(250), nullable=False)
    is_active = db.Column(db.Boolean(), nullable=False)
    token = db.Column(db.Text, nullable=True)
    is_admin = db.Column(db.Boolean(), default=False)
    videos = db.relationship('Video', backref='user', lazy=True)
    comments = db.relationship('Comment', backref='user', lazy=True)
    likes = db.relationship('Like', backref='user', lazy=True)
    favorites = db.relationship('Favorite', backref='user', lazy=True)
    addresses = db.relationship('Address', backref='user', lazy=True)  # Relación con Address

    def __repr__(self):
        return '<User %r>' % self.email

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'surname': self.surname,
            'email': self.email,
            'phone': self.phone,
            'is_active': self.is_active,
            'token': self.token,
            'is_admin': self.is_admin
        }

class Address(db.Model):
    __tablename__ = 'address'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(80), nullable=False)
    surname = db.Column(db.String(80), nullable=False)
    cif_nif = db.Column(db.String(50), nullable=False)
    address = db.Column(db.String(200), nullable=False)
    postal_code = db.Column(db.String(20), nullable=False)
    city = db.Column(db.String(80), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    use_as = db.Column(db.String(100), nullable=False)  # Para "Usar como"
    is_billing_default = db.Column(db.Boolean(), default=False)  # Campo para la dirección de facturación predeterminada

    def __repr__(self):
        return '<Address %r>' % self.id

    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'surname': self.surname,
            'cif_nif': self.cif_nif,
            'address': self.address,
            'postal_code': self.postal_code,
            'city': self.city,
            'phone': self.phone,
            'use_as': self.use_as,
            'is_billing_default': self.is_billing_default
        }

class BankData(db.Model):
    __tablename__ = 'bank_data'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    card_number = db.Column(db.String(20), nullable=False)
    cardholder_name = db.Column(db.String(80), nullable=False)
    expiry_date = db.Column(db.String(5), nullable=False)
    cvv = db.Column(db.String(4), nullable=False)
    is_default = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return '<BankData %r>' % self.id

    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'card_number': self.card_number,
            'cardholder_name': self.cardholder_name,
            'expiry_date': self.expiry_date,
            'cvv': self.cvv,
            'is_default': self.is_default
        }


class Video(db.Model):
    __tablename__ = "video"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    src = db.Column(db.String(250), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    comments = db.relationship('Comment', backref='video', lazy=True)
    likes = db.relationship('Like', backref='video', lazy=True)
    favorites = db.relationship('Favorite', backref='video', lazy=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    title = db.Column(db.String(100), nullable=False)
    ingredients_part1 = db.Column(db.Text, nullable=False)
    ingredients_part2 = db.Column(db.Text, nullable=False)
    duration = db.Column(db.Float, nullable=False)  # Nueva columna para la duración

    def __repr__(self):
        return '<Video %r>' % self.description

    def serialize(self):
        return {
            'id': self.id,
            'src': self.src,
            'description': self.description,
            'user_id': self.user_id,
            'created_at': self.created_at,
            'title': self.title,
            'ingredients_part1': self.ingredients_part1,
            'ingredients_part2': self.ingredients_part2,
            'duration': self.duration,
            'likes': len(self.likes),
            'comments': len(self.comments)
        }


class Comment(db.Model):
    __tablename__ = "comment"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    text = db.Column(db.String(1000), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    video_id = db.Column(db.Integer, db.ForeignKey('video.id'), nullable=False)

    def __repr__(self):
        return '<Comment %r>' % self.text

    def serialize(self):
        return {
            'id': self.id,
            'text': self.text,
            'timestamp': self.timestamp,
            'user_id': self.user_id,
            'video_id': self.video_id
        }

class Like(db.Model):
    __tablename__ = "like"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    video_id = db.Column(db.Integer, db.ForeignKey('video.id'), nullable=False)

    def __repr__(self):
        return '<Like %r>' % self.id

    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'video_id': self.video_id
        }

class Favorite(db.Model):
    __tablename__ = "favorite"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    video_id = db.Column(db.Integer, db.ForeignKey('video.id'), nullable=False)

    def __repr__(self):
        return '<Favorite %r>' % self.id

    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'video_id': self.video_id
        }

class Category(db.Model):
    __tablename__ = "category"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    videos = db.relationship('VideoCategory', backref='category', lazy=True)

    def __repr__(self):
        return '<Category %r>' % self.name

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name
        }

class VideoCategory(db.Model):
    __tablename__ = "video_category"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    video_id = db.Column(db.Integer, db.ForeignKey('video.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)

    def __repr__(self):
        return '<VideoCategory %r>' % self.id

    def serialize(self):
        return {
            'id': self.id,
            'video_id': self.video_id,
            'category_id': self.category_id
        }
class Portada(db.Model):
    __tablename__ = 'portada'
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String, nullable=False)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=True)
    timestamp = db.Column(db.DateTime, default=db.func.current_timestamp())
    
    def __repr__(self):
        return '<portada %r>' % self.id

    def __init__(self, url, title, description=None):
        self.url = url
        self.title = title
        self.description = description