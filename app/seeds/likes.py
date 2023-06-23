from app.models import db, Like, environment, SCHEMA
from sqlalchemy.sql import text

def seed_likes():

    like1 = Like(user_id=1, item_id='61bb53b3bd358a192111d97c', value=True)
    like2 = Like(user_id=2, item_id='61bb53b3bd358a192111d97c', value=True)
    like3 = Like(user_id=3, item_id='61bb53b3bd358a192111d97c', value=False)
    like4 = Like(user_id=1, item_id='5ae8a072f3d31b75f4c5b80a', value=True)

    likes_list = [
        like1, like2, like3, like4
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