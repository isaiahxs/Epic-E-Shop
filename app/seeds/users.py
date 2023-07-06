from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    User.query.delete()
    
    demo = User(
        username='Demo', email='demo@aa.io', password='password', profile_image='https://image.fnbr.co/outfit/5fa125c7da8456464f40038e/icon.png')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', profile_image='https://image.fnbr.co/outfit/5fa12630da845698dc4003a0/icon.png')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', profile_image='https://image.fnbr.co/outfit/5fa12620da84561a8440039d/icon.png')
    isaiah = User(
        username='isaiahxs', email='isaiahxs@gmail.com', password='password', profile_image='https://image.fnbr.co/outfit/5fa1260eda845607cf40039a/icon.png')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(isaiah)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()