from datetime import datetime
from database import db

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
            'phone': self.phone
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

    def __repr__(self):
        return '<Video %r>' % self.description

    def serialize(self):
        return {
            'id': self.id,
            'src': self.src,
            'description': self.description,
            'user_id': self.user_id,
            'likes_count': len(self.likes),
            'comments_count': len(self.comments)
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
