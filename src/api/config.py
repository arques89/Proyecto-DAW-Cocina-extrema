class Config:
    SQLALCHEMY_DATABASE_URI = "sqlite:///db.sqlite3"
    SECRET_KEY = "mysecret"
    JWT_SECRET_KEY = "super-secret"
    MAIL_SERVER = 'sandbox.smtp.mailtrap.io'
    MAIL_PORT = 2525
    MAIL_USERNAME = 'e8c7b5d9a3fd13'
    MAIL_PASSWORD = '56adb643104776'
    MAIL_USE_TLS = True
    MAIL_USE_SSL = False
