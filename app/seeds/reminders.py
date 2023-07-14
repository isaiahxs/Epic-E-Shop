from app.models import db, Reminder, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reminders():
    Reminder.query.delete()

    # grim fable
    # reminder1 = Reminder(user_id=1, item_id='5da5d9bf377bc5b20a96e5e1', duration=-1, reminded=False)

    # reminders_list = [
    #     reminder1
    # ]

    # for reminder in reminders_list:
    #     db.session.add(reminder)

    db.session.commit()

def undo_reminders():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reminders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reminders"))
        
    db.session.commit()