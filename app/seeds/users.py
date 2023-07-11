from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    User.query.delete()
    
    demo = User(
        username='Demo', email='demo@aa.io', password='password', profile_image='https://image.fnbr.co/outfit/5ab16ae85f957f27504aa4df/variant1.png')
    wildstreak = User(
        username='Wildstreak', email='wild@aa.io', password='password', profile_image='https://image.fnbr.co/outfit/5fa12630da845698dc4003a0/icon.png')
    headhunter = User(
        username='Headhunter', email='headhunter@aa.io', password='password', profile_image='https://image.fnbr.co/outfit/5fa12620da84561a8440039d/icon.png')
    raven = User(
        username='Raven', email='raven@aa.io', password='password', profile_image='https://image.fnbr.co/outfit/5abcf2279542fb06a6da12a5/icon.png')
    ghoul = User(
        username='GhoulTrooper', email='ghoultrooper@aa.io', password='password', profile_image='https://image.fnbr.co/outfit/5ab16c0e5f957f27504aa4e4/icon.png')
    skull = User(
        username='SkullTrooper', email='skulltrooper@aa.io', password='password', profile_image='https://image.fnbr.co/outfit/5ab172825f957f27504aa504/icon.png')
    renegade = User(
        username='RenegadeRaider', email='renegaderaider@aa.io', password='password', profile_image='https://image.fnbr.co/outfit/5ab17d925f957f27504aa53d/icon.png')
    galaxy = User(
        username='Galaxy', email='galaxy@aa.io', password='password', profile_image='https://image.fnbr.co/outfit/5b695e5d52009557f55fd87e/icon.png')
    havoc = User(
        username='Havoc', email='havoc@aa.io', password='password', profile_image='https://image.fnbr.co/outfit/5ab1577ee9847b3170da0328/icon.png')
    rustler = User(
        username='Rustler', email='rustler@aa.io', password='password', profile_image='https://image.fnbr.co/outfit/5da5d912377bc518fa96e5d9/icon.png')
    frozen_nog = User(
        username='Frosty', email='frozennog@aa.io', password='password', profile_image='https://image.fnbr.co/outfit/5df2704ab8428343bfdeafba/icon.png')
    kuno = User(
        username='Kuno', email='kuno@aa.io', password='password', profile_image='https://image.fnbr.co/outfit/60d1c143de073f1056af137a/icon.png')
    era = User(
        username='Era', email='era@aa.io', password='password', profile_image='https://image.fnbr.co/outfit/6488a073091338816bc1e100/icon.png')
    blackknight = User(
        username='BlackKnight', email='blackknight@aa.io', password='password', profile_image='https://image.fnbr.co/outfit/5ab1562ce9847b3170da0322/icon.png')
    fade = User(
        username='Fade', email='fade@aa.io', password='password', profile_image='https://image.fnbr.co/outfit/5ee9c51ae59f83c9634ac73c/icon.png')

    users_list = [
        demo, wildstreak, headhunter, raven, ghoul, skull, renegade, galaxy, havoc, rustler, frozen_nog, kuno, era, blackknight, fade
    ]

    for user in users_list:
        db.session.add(user)

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