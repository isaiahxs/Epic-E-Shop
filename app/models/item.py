from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime

class Item(db.Model):
    __tablename__ = 'items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # id's and prices are normally integers but in the responses from the api, they're strings
    id = db.Column(db.Integer, primary_key=True)
    item_id = db.Column(db.String(1000), nullable=False)
    name = db.Column(db.String(1000), nullable=False)
    price = db.Column(db.String(1000), nullable=False)
    # When retrieved, SQLAlchemy will automatically convert this back into a Python object.
    images = db.Column(db.JSON, nullable=False)
    rarity = db.Column(db.String(1000), nullable=False)
    type = db.Column(db.String(1000), nullable=False)
    slug = db.Column(db.String(1000), nullable=False)
    readableType = db.Column(db.String(1000), nullable=False)
    description = db.Column(db.String(1000), nullable=False)

    cart = db.relationship("Cart", back_populates="item")
    wishlist = db.relationship("Wishlist", back_populates="item")
    reminders = db.relationship("Reminder", back_populates="item")
    comments = db.relationship("Comment", back_populates="item")
    likes = db.relationship("Like", back_populates="item")
    sections = db.relationship("SectionItem", back_populates="item")

    def __repr__(self):
        return f'<Item id={self.id} name={self.name} price={self.price}>'

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price,
            'images': self.images,
            'rarity': self.rarity,
            'type': self.type,
            'slug': self.slug,
            'readableType': self.readableType,
            'description': self.description
        }