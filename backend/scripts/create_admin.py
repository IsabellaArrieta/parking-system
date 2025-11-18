"""
Utility script to create or update an admin user in parking.db using passlib pbkdf2_sha256.
Run from backend folder:
    python scripts/create_admin.py
"""
from passlib.context import CryptContext
import sqlite3
import os

pwd_ctx = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")
ADMIN_EMAIL = os.environ.get("PARKING_ADMIN_EMAIL", "admin@plazanorte.co")
ADMIN_PASSWORD = os.environ.get("PARKING_ADMIN_PASSWORD", "Admin123$")
ADMIN_NAME = os.environ.get("PARKING_ADMIN_NAME", "Admin")

DB_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "parking.db")

if not os.path.exists(DB_PATH):
    print("Database not found at", DB_PATH)
    print("Make sure you've run the app once so the DB and schema are created.")
    raise SystemExit(1)

conn = sqlite3.connect(DB_PATH)
cur = conn.cursor()
cur.execute("CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE NOT NULL, password_hash TEXT NOT NULL, nombre TEXT, rol TEXT NOT NULL DEFAULT 'user')")
conn.commit()

hashed = pwd_ctx.hash(ADMIN_PASSWORD)
cur.execute("SELECT id FROM usuarios WHERE email = ?", (ADMIN_EMAIL,))
row = cur.fetchone()
if row:
    cur.execute("UPDATE usuarios SET password_hash = ?, nombre = ?, rol = ? WHERE email = ?", (hashed, ADMIN_NAME, 'admin', ADMIN_EMAIL))
    print("Admin updated (email=", ADMIN_EMAIL, ")")
else:
    cur.execute("INSERT INTO usuarios (email, password_hash, nombre, rol) VALUES (?, ?, ?, ?)", (ADMIN_EMAIL, hashed, ADMIN_NAME, 'admin'))
    print("Admin created (email=", ADMIN_EMAIL, ")")
conn.commit()
conn.close()
