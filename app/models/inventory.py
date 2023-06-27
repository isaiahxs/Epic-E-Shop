from .db import db, environment, SCHEMA, add_prefix_for_prod
# from werkzeug.security import generate_password_hash, check_password_hash
# from flask_login import UserMixin
# from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime

class Inventory(db.Model):
    __tablename__ = 'inventory'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    item_id = db.Column(db.String(1000), db.ForeignKey(add_prefix_for_prod('items.item_id')), nullable=False)
    quantity = db.Column(db.Integer, default=1)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    user = db.relationship("User", back_populates="inventory")
    item = db.relationship("Item", back_populates="inventory")

    def __repr__(self):
        return f'<Inventory id={self.id} user_id={self.user_id} item_id={self.item_id}>'

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'item_id': self.item_id,
            'quantity': self.quantity,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }