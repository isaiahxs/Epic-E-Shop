from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text

def seed_comments():
    Comment.query.delete()
    
    comment1 = Comment(user_id=1, item_id='61bb53b3bd358a192111d97c', text='I love this item!')
    comment2 = Comment(user_id=2, item_id='61bb53b3bd358a192111d97c', text="I'm so glad they brought this back!")
    comment3 = Comment(user_id=3, item_id='61bb53b3bd358a192111d97c', text='I never really liked this item :o')
    comment4 = Comment(user_id=4, item_id='5da5d9bf377bc5b20a96e5e1', text='Best item ever!')
    comment5 = Comment(user_id=5, item_id='6467a03b03356945427f6068', text='This item looks awesome!')
    comment6 = Comment(user_id=6, item_id='5daedbcebffa742e002c321c', text='This item is too expensive :(')
    comment7 = Comment(user_id=7, item_id='5df2d48bb84283d7abdeb062', text='Not my type of item :/')
    comment8 = Comment(user_id=8, item_id='5fd2b936c0132843480146e8', text='Would love to have this item!')
    comment9 = Comment(user_id=9, item_id='60b033cd0b408201818d663d', text='This item is totally cool :o')
    comment10 = Comment(user_id=10, item_id='5da5d9bf377bc5b20a96e5e1', text='I prefer other items.')
    comment11 = Comment(user_id=11, item_id='6467a03b03356945427f6068', text='Great item, but not for me.')
    comment12 = Comment(user_id=12, item_id='5daedbcebffa742e002c321c', text='This item is the best in the game!')
    comment13 = Comment(user_id=13, item_id='5df2d48bb84283d7abdeb062', text='Not a fan of this item.')
    comment14 = Comment(user_id=1, item_id='6467a03b03356945427f6068', text='The design is fantastic!')
    comment15 = Comment(user_id=2, item_id='5daedbcebffa742e002c321c', text='Not worth the price.')
    comment16 = Comment(user_id=3, item_id='5df2d48bb84283d7abdeb062', text='This one is just average.')
    comment17 = Comment(user_id=4, item_id='5fd2b936c0132843480146e8', text='Looks great in my collection :)')
    comment18 = Comment(user_id=5, item_id='60b033cd0b408201818d663d', text='Not really sure I like this one :o')
    comment19 = Comment(user_id=6, item_id='5da5d9bf377bc5b20a96e5e1', text='Everyone should have this!')
    comment20 = Comment(user_id=7, item_id='61bb53b3bd358a192111d97c', text='This is a must-have! :)')
    comment21 = Comment(user_id=8, item_id='5daedbcebffa742e002c321c', text='Wish it was cheaper :(')
    comment22 = Comment(user_id=9, item_id='6467a03b03356945427f6068', text='Looks great!')
    comment23 = Comment(user_id=10, item_id='5df2d48bb84283d7abdeb062', text='Overrated item >:)')

    comments_list = [
        comment1, comment2, comment3, comment4, comment5, comment6, comment7, comment8, comment9, comment10, 
        comment11, comment12, comment13, comment14, comment15, comment16, comment17, comment18, comment19, comment20, 
        comment21, comment22, comment23
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