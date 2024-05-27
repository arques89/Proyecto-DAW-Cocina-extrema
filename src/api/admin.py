from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from models import db, User, Video, Comment, Like, Favorite, Category, VideoCategory

admin = Admin(name='Admin Panel', template_mode='bootstrap3')

def init_admin(app):
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Video, db.session))
    admin.add_view(ModelView(Comment, db.session))
    admin.add_view(ModelView(Like, db.session))
    admin.add_view(ModelView(Favorite, db.session))
    admin.add_view(ModelView(Category, db.session))
    admin.add_view(ModelView(VideoCategory, db.session))
    admin.init_app(app)
