from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime

class Reminder(db.Model):
    __tablename__ = 'reminders'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    item_id = db.Column(db.String(1000), db.ForeignKey(add_prefix_for_prod('items.item_id')), nullable=False)
    reminder_time = db.Column(db.DateTime, nullable=False)
    duration = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    user = db.relationship("User", back_populates="reminders")
    item = db.relationship("Item", back_populates="reminders")

    def __repr__(self):
        return f'<Reminder id={self.id} user_id={self.user_id} item_id={self.item_id}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'itemId': self.item_id,
            'reminderTime': self.reminder_time,
            'duration': self.duration,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }