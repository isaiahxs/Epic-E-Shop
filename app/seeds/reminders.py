from app.models import db, Reminder, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reminders():
    Reminder.query.delete()

    reminder1 = Reminder(user_id=1, item_id='61bb53b3bd358a192111d97c', duration=30, reminded=False)
    reminder2 = Reminder(user_id=2, item_id='61bb53b3bd358a192111d97c', duration=60, reminded=False)
    reminder3 = Reminder(user_id=3, item_id='61bb53b3bd358a192111d97c', duration=-1, reminded=False)

    reminders_list = [
        reminder1, reminder2, reminder3
    ]

    for reminder in reminders_list:
        db.session.add(reminder)

    db.session.commit()

def undo_reminders():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reminders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reminders"))
        
    db.session.commit()