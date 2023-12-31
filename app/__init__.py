import os
from flask import Flask, render_template, request, session, redirect
# from flask_mail import Mail, Message
from .extensions import mail
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager
from .models import db, User
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.cart_routes import cart_routes
from .api.comment_routes import comment_routes
from .api.cart_routes import cart_routes
from .api.item_routes import item_routes, mail
from .api.like_routes import like_routes
from .api.reminder_routes import reminder_routes
from .api.section_item_routes import section_item_routes
from .api.shop_section_routes import shop_section_routes
from .api.wishlist_routes import wishlist_routes
from .api.inventory_routes import inventory_routes
from .seeds import seed_commands
from .config import Config

app = Flask(__name__, static_folder='../react-app/build', static_url_path='/')

mail_settings = {
    "MAIL_SERVER": 'smtp.gmail.com',
    "MAIL_PORT": 465,
    "MAIL_USE_TLS": False,
    "MAIL_USE_SSL": True,
    "MAIL_USERNAME": os.getenv('EMAIL_USER'),
    "MAIL_PASSWORD": os.getenv('EMAIL_PASSWORD')
}

app.config.update(mail_settings)
# mail = Mail(app)
mail.init_app(app)

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(cart_routes, url_prefix='/api/carts')
app.register_blueprint(comment_routes, url_prefix='/api/comments')
app.register_blueprint(item_routes, url_prefix='/api/items')
app.register_blueprint(like_routes, url_prefix='/api/likes')
app.register_blueprint(reminder_routes, url_prefix='/api/reminders')
app.register_blueprint(section_item_routes, url_prefix='/api/section_items')
app.register_blueprint(shop_section_routes, url_prefix='/api/shop_sections')
app.register_blueprint(wishlist_routes, url_prefix='/api/wishlists')
app.register_blueprint(inventory_routes, url_prefix='/api/inventories')
db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)


# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........
@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


@app.route("/api/docs")
def api_help():
    """
    Returns all API routes and their doc strings
    """
    acceptable_methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    route_list = { rule.rule: [[ method for method in rule.methods if method in acceptable_methods ],
                    app.view_functions[rule.endpoint].__doc__ ]
                    for rule in app.url_map.iter_rules() if rule.endpoint != 'static' }
    return route_list


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    """
    This route will direct to the public directory in our
    react builds in the production environment for favicon
    or index.html requests
    """
    if path == 'favicon.ico':
        return app.send_from_directory('public', 'favicon.ico')
    return app.send_static_file('index.html')


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')