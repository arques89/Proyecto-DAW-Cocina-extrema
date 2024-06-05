from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from models import db, User, Video, Comment, Like, Favorite, Category, VideoCategory, Portada

admin = Admin(name='Admin Panel', template_mode='bootstrap3')

class UserModelView(ModelView):
    column_list = ('id', 'name', 'surname', 'email', 'phone', 'is_active', 'is_admin', 'token')
    column_searchable_list = ('name', 'surname', 'email', 'phone')
    column_filters = ('is_active', 'is_admin')
    form_columns = ('name', 'surname', 'email', 'phone', 'password', 'is_active', 'is_admin', 'token')

class VideoModelView(ModelView):
    column_list = ('id', 'user_id', 'src', 'created_at', 'title', 'ingredients_part1', 'ingredients_part2', 'duration', 'likes', 'comments')
    column_searchable_list = ('title',)
    column_filters = ('created_at', 'user_id')
    form_columns = ('src', 'user_id', 'title', 'ingredients_part1', 'ingredients_part2', 'duration')

class CommentModelView(ModelView):
    column_list = ('id', 'text', 'timestamp', 'user_id', 'video_id')
    column_searchable_list = ('text',)
    column_filters = ('timestamp', 'user_id', 'video_id')
    form_columns = ('text', 'user_id', 'video_id')

class LikeModelView(ModelView):
    column_list = ('id', 'user_id', 'video_id')
    column_searchable_list = ('user_id', 'video_id')
    column_filters = ('user_id', 'video_id')
    form_columns = ('user_id', 'video_id')

class FavoriteModelView(ModelView):
    column_list = ('id', 'user_id', 'video_id')
    column_searchable_list = ('user_id', 'video_id')
    column_filters = ('user_id', 'video_id')
    form_columns = ('user_id', 'video_id')

class CategoryModelView(ModelView):
    column_list = ('id', 'name')
    column_searchable_list = ('name',)
    column_filters = ('name',)
    form_columns = ('name',)

class VideoCategoryModelView(ModelView):
    column_list = ('id', 'video_id', 'category_id')
    column_searchable_list = ('video_id', 'category_id')
    column_filters = ('video_id', 'category_id')
    form_columns = ('video_id', 'category_id')
    
class PortadaModelView(ModelView):
    column_list = ('id', 'url', 'title', 'description', 'timestamp')
    column_searchable_list = ('title', 'description')
    column_filters = ('timestamp',)
    form_columns = ('url', 'title', 'description')
    
def init_admin(app):
    admin = Admin(app, name='Admin Panel', template_mode='bootstrap3')

    # Add model views
    admin.add_view(UserModelView(User, db.session))
    admin.add_view(VideoModelView(Video, db.session))
    admin.add_view(CommentModelView(Comment, db.session))
    admin.add_view(LikeModelView(Like, db.session))
    admin.add_view(FavoriteModelView(Favorite, db.session))
    admin.add_view(CategoryModelView(Category, db.session))
    admin.add_view(VideoCategoryModelView(VideoCategory, db.session))
    admin.add_view(PortadaModelView(Portada, db.session))

    return admin
