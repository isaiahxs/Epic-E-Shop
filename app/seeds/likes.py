from app.models import db, Like, environment, SCHEMA
from sqlalchemy.sql import text

def seed_likes():
    Like.query.delete()

    like1 = Like(user_id=1, item_id='61bb53b3bd358a192111d97c', value=True)
    like2 = Like(user_id=2, item_id='61bb53b3bd358a192111d97c', value=True)
    like3 = Like(user_id=3, item_id='61bb53b3bd358a192111d97c', value=False)

    likes_list = [
        like1, like2, like3
    ]

    for like in likes_list:
        db.session.add(like)

    db.session.commit()

def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM likes"))
        
    db.session.commit()