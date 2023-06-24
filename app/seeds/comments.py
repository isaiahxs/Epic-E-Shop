from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text

def seed_comments():

    comment1 = Comment(user_id=1, item_id='61bb53b3bd358a192111d97c', text='I love this item!')
    comment2 = Comment(user_id=2, item_id='61bb53b3bd358a192111d97c', text='They should really bring this item back in the shop!')
    comment3 = Comment(user_id=3, item_id='61bb53b3bd358a192111d97c', text='I never really liked this item.')

    comments_list = [
        comment1, comment2, comment3
    ]

    for comment in comments_list:
        db.session.add(comment)

    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))
        
    db.session.commit()