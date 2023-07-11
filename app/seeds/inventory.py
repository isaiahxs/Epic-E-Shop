from app.models import db, Inventory, environment, SCHEMA
from sqlalchemy.sql import text

def seed_inventory():
    Inventory.query.delete()

    # master chief
    item1 = Inventory(user_id=1, item_id='5fd2b936c0132843480146e8', quantity=1)
    # socks
    item2 = Inventory(user_id=1, item_id='60b033cd0b408201818d663d', quantity=1)
    # rey
    item3 = Inventory(user_id=1, item_id='5df2d48bb84283d7abdeb062', quantity=1)

    items_list = [
        item1, item2, item3
    ]

    for item in items_list:
        db.session.add(item)

    db.session.commit()

def undo_inventory():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.inventory RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM inventory"))

    db.session.commit()