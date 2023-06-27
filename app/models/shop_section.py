from .db import db, environment, SCHEMA, add_prefix_for_prod
# from werkzeug.security import generate_password_hash, check_password_hash
# from flask_login import UserMixin
# from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
# from datetime import datetime

class ShopSection(db.Model):
    __tablename__ = 'shop_sections'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    display_name = db.Column(db.String(255), nullable=False)
    key = db.Column(db.String(255), nullable=False)
    priority = db.Column(db.Integer, nullable=False)

    items = db.relationship("SectionItem", back_populates="section")

    def __repr__(self):
        return f'<ShopSection id={self.id} displayName={self.displayName} key={self.key} priority={self.priority}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'displayName': self.display_name,
            'key': self.key,
            'priority': self.priority
        }