from app.models import db, Like, environment, SCHEMA
from sqlalchemy.sql import text

def seed_likes():
    Like.query.delete()

    like1 = Like(user_id=1, item_id='61bb53b3bd358a192111d97c', value=True)
    like2 = Like(user_id=2, item_id='61bb53b3bd358a192111d97c', value=True)
    like3 = Like(user_id=3, item_id='61bb53b3bd358a192111d97c', value=False)
    like4 = Like(user_id=4, item_id='5da5d9bf377bc5b20a96e5e1', value=True)
    like5 = Like(user_id=5, item_id='6467a03b03356945427f6068', value=False)
    like6 = Like(user_id=6, item_id='5daedbcebffa742e002c321c', value=True)
    like7 = Like(user_id=7, item_id='5df2d48bb84283d7abdeb062', value=True)
    like8 = Like(user_id=8, item_id='5fd2b936c0132843480146e8', value=False)
    like9 = Like(user_id=9, item_id='60b033cd0b408201818d663d', value=True)
    like10 = Like(user_id=10, item_id='61bb53b3bd358a192111d97c', value=False)
    like11 = Like(user_id=11, item_id='5da5d9bf377bc5b20a96e5e1', value=True)
    like12 = Like(user_id=12, item_id='6467a03b03356945427f6068', value=True)
    like13 = Like(user_id=13, item_id='5daedbcebffa742e002c321c', value=False)
    like14 = Like(user_id=14, item_id='5da5d9bf377bc5b20a96e5e1', value=True)
    like15 = Like(user_id=15, item_id='5df2d48bb84283d7abdeb062', value=False)
    like16 = Like(user_id=1, item_id='6467a03b03356945427f6068', value=True)
    like17 = Like(user_id=2, item_id='5da5d9bf377bc5b20a96e5e1', value=False)
    like18 = Like(user_id=3, item_id='5df2d48bb84283d7abdeb062', value=True)
    like19 = Like(user_id=4, item_id='60b033cd0b408201818d663d', value=False)
    like20 = Like(user_id=5, item_id='5fd2b936c0132843480146e8', value=True)
    like21 = Like(user_id=6, item_id='5df2d48bb84283d7abdeb062', value=False)
    like22 = Like(user_id=7, item_id='60b033cd0b408201818d663d', value=True)
    like23 = Like(user_id=8, item_id='6467a03b03356945427f6068', value=False)

    likes_list = [
        like1, like2, like3, like4, like5, like6, like7, like8, like9, like10, like11, like12, like13, like14, like15, like16, like17, like18, like19, like20, like21, like22, like23
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