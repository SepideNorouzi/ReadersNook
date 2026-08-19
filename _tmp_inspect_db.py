import sqlite3

c = sqlite3.connect(r"C:\Users\Norouzi\Desktop\Reader'sNook-backend\ReadersNook\db.sqlite3")
print("TABLES:")
print([r[0] for r in c.execute("SELECT name FROM sqlite_master WHERE type='table'").fetchall()])
print("USERS:")
for r in c.execute(
    "SELECT id, username, is_staff, is_superuser, is_active FROM user_module_user"
).fetchall():
    print(r)
print("BOOKS:")
cols = [r[1] for r in c.execute("PRAGMA table_info(books_book)").fetchall()]
print("COLUMNS:", cols)
for r in c.execute("SELECT id, title, author, status FROM books_book").fetchall():
    print(r)
