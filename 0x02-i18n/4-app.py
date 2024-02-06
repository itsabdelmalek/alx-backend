#!/usr/bin/env python3
"""
Flask app with Babel configuration, get_locale function, and gettext usage.
"""

from flask import Flask, render_template, request
from flask_babel import Babel

app = Flask(__name__)
babel = Babel(app)


class Config:
    """
    Configuration class with language settings.
    """
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app.config.from_object(Config)


@babel.localeselector
def get_locale():
    """
    Determine the best-matching language using request.accept_languages.

    Returns:
        str: Best-matching language code.
    """
    locale = request.args.get("locale")
    if locale:
        return locale
    return request.accept_languages.best_match(app.config["LANGUAGES"])


@app.route("/")
def index():
    """
    Route handler for the main page.

    Returns:
        str: Rendered HTML template with translated messages.
    """
    return render_template("4-index.html")
