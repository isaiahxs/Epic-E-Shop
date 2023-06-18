from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime

class SectionItem(db.Model):
    __tablename__ = 'section_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    shop_section_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('shop_sections.id')), nullable=False)
    item_id = db.Column(db.String(1000), db.ForeignKey(add_prefix_for_prod('items.id')), nullable=False)

    section = db.relationship("ShopSection", back_populates="items")
    item = db.relationship("Item", back_populates="sections")

    def __repr__(self):
        return f'<SectionItem id={self.id} shop_section_id={self.shop_section_id} item_id={self.item_id}>'