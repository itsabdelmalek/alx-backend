#!/usr/bin/env python3
"""
Flask app with Babel configuration, user login emulation, and gettext usage.
"""

from flask import Flask, render_template, request, g
from flask_babel import Babel

app = Flask(__name__)
babel = Babel(app)


class Config:
    """
    Config class.
    """
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app.config.from_object(Config)

users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


def get_user(login_as):
    """
    Retrieve user information based on user ID.
    Returns:
        dict or None: User dictionary if found, None otherwise.
    """
    try:
        return users.get(int(login_as))
    except Exception:
        return


@app.before_request
def before_request():
    """
    Function executed before all other functions.
    Sets the user information in flask.g.user if a user is logged in.
    """
    g.user = get_user(request.args.get("login_as"))


@babel.localeselector
def get_locale():
    """
    Determine the best-matching language.

    Priority:
    1. Locale from URL parameters
    2. Locale from user settings
    3. Locale from request header
    4. Default locale

    Returns:
        str: Best-matching language code.
    """
    locale = request.args.get("locale")
    if locale:
        return locale
    user = request.args.get("login_as")
    if user:
        lang = users.get(int(user)).get('locale')
        if lang in app.config['LANGUAGES']:
            return lang
    headers = request.headers.get("locale")
    if headers:
        return headers
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route('/', methods=["GET"], strict_slashes=False)
def index():
    """
    Route handler for the main page.

    Returns:
        str: Rendered HTML template with translated messages.
    """
    return render_template('6-index.html')
