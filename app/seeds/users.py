from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        firstname='Demo', lastname='User', username='Demo', email='demo@aa.io', password='password',
        avatar='https://pngimg.com/uploads/question_mark/small/question_mark_PNG134.png', header='https://wallpaperaccess.com/full/2424419.jpg')

    marnie = User(
        firstname='Marnie', lastname='Big', username='marnie', email='marnie@aa.io', password='password',
        avatar='https://pngimg.com/uploads/question_mark/small/question_mark_PNG134.png', header='https://i.pinimg.com/originals/89/4b/90/894b90a5eff635d5167aa81309b6f9ba.jpg')

    bobbie = User(
        firstname='Bobbie', lastname='Small', username='bobbie', email='bobbie@aa.io', password='password',
        avatar='https://flyclipart.com/thumb2/avatar-icon-outline-137528.png', header='https://i.pinimg.com/originals/89/4b/90/894b90a5eff635d5167aa81309b6f9ba.jpg')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
