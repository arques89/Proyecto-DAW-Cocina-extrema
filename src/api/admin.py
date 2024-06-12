from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from models import db, User, Video, Comment, Like, Favorite, Category, VideoCategory, Portada, Address, BankData

admin = Admin(name='Admin Panel', template_mode='bootstrap3')

class UserModelView(ModelView):
    column_list = ('id', 'name', 'surname', 'email', 'phone', 'is_active', 'is_admin', 'token', 'is_matriculate')  # Añadir aquí
    column_searchable_list = ('name', 'surname', 'email', 'phone')
    column_filters = ('is_active', 'is_admin', 'is_matriculate')  # Añadir aquí
    form_columns = ('name', 'surname', 'email', 'phone', 'password', 'is_active', 'is_admin', 'token', 'is_matriculate')  # Añadir aquí

class VideoModelView(ModelView):
    column_list = ('id', 'user_id', 'src', 'description', 'created_at', 'title', 'ingredients_part1', 'ingredients_part2', 'duration', 'likes', 'comments')
    column_searchable_list = ('title', 'description')
    column_filters = ('created_at', 'user_id')
    form_columns = ('src', 'user_id', 'description', 'title', 'ingredients_part1', 'ingredients_part2', 'duration')

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

class AddressModelView(ModelView):
    column_list = ('id', 'user_id', 'name', 'surname', 'cif_nif', 'address', 'postal_code', 'city', 'phone', 'use_as', 'is_billing_default')
    column_searchable_list = ('name', 'surname', 'cif_nif', 'city')
    column_filters = ('city', 'postal_code', 'is_billing_default')
    form_columns = ('user_id', 'name', 'surname', 'cif_nif', 'address', 'postal_code', 'city', 'phone', 'use_as', 'is_billing_default')

class BankDataModelView(ModelView):
    column_list = ('id', 'user_id', 'card_number', 'cardholder_name', 'expiry_date', 'cvv', 'is_default')
    column_searchable_list = ('card_number', 'cardholder_name')
    column_filters = ('expiry_date', 'is_default')
    form_columns = ('user_id', 'card_number', 'cardholder_name', 'expiry_date', 'cvv', 'is_default')

def init_admin(app):
    admin = Admin(app, name='Admin Panel', template_mode='bootstrap3')

    # Se añaden las vistas de los models (tablas)
    admin.add_view(UserModelView(User, db.session))
    admin.add_view(VideoModelView(Video, db.session))
    admin.add_view(CommentModelView(Comment, db.session))
    admin.add_view(LikeModelView(Like, db.session))
    admin.add_view(FavoriteModelView(Favorite, db.session))
    admin.add_view(CategoryModelView(Category, db.session))
    admin.add_view(VideoCategoryModelView(VideoCategory, db.session))
    admin.add_view(PortadaModelView(Portada, db.session))
    admin.add_view(AddressModelView(Address, db.session))
    admin.add_view(BankDataModelView(BankData, db.session))

    return admin
