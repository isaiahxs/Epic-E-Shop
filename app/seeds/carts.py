from app.models import db, Cart, environment, SCHEMA
from sqlalchemy.sql import text

def seed_carts():
    Cart.query.delete()

    cart1 = Cart(user_id=1, item_id='61bb53b3bd358a192111d97c', quantity=1)
    cart2 = Cart(user_id=1, item_id='6467a03b03356945427f6068', quantity=1)
    cart3 = Cart(user_id=2, item_id='5daedbcebffa742e002c321c', quantity=1)

    carts_list = [
        cart1, cart2, cart3
    ]

    for cart in carts_list:
        db.session.add(cart)

    db.session.commit()

def undo_carts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.carts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM carts"))
        
    db.session.commit()