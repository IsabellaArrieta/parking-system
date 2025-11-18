from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import Base, engine
from . import models  
from .routes import vehicle, cupo, tarifa, ticket, pago, auth

import os

def run_sql_file(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        sql_script = f.read()

    # Obtener conexión cruda (modo SQLite)
    conn = engine.raw_connection()
    cursor = conn.cursor()
    cursor.executescript(sql_script)
    conn.commit()
    cursor.close()
    conn.close()

# Rutas a los archivos SQL
BASE_DIR = os.path.dirname(__file__)
SQL_SCHEMA = os.path.join(BASE_DIR, "db", "create_schema.sql")
SQL_SEED = os.path.join(BASE_DIR, "db", "seed_data.sql")

DB_PATH = os.path.join(os.getcwd(), "parking.db")

# Crear BD solo si NO existe
if not os.path.exists(DB_PATH):
    print("Creando base de datos e inicializando...")
    run_sql_file(SQL_SCHEMA)
    run_sql_file(SQL_SEED)
    # Crear usuario admin inicial si no existe (hash contraseña)
    try:
        from .database import SessionLocal
        from passlib.context import CryptContext
        from .models import Usuario

        pwd_ctx = CryptContext(schemes=["bcrypt"], deprecated="auto")
        admin_email = "admin@plazanorte.co"
        admin_password = "Admin123$"
        db = SessionLocal()
        existing = db.query(Usuario).filter(Usuario.email == admin_email).first()
        if not existing:
            hashed = pwd_ctx.hash(admin_password)
            new = Usuario(email=admin_email, password_hash=hashed, nombre="Admin", rol="admin")
            db.add(new)
            db.commit()
            print("Admin user created in DB (email=admin@plazanorte.co)")
        db.close()
    except Exception as e:
        print("Warning: could not create admin user:", e)

app = FastAPI()

# Configurar CORS para desarrollo
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Parking System API running"}

# Registrar rutas
app.include_router(vehicle.router, prefix="/api/vehicle")
app.include_router(cupo.router, prefix="/api/cupo")
app.include_router(tarifa.router, prefix="/api/tarifa")
app.include_router(ticket.router, prefix="/api/ticket")
app.include_router(pago.router, prefix="/api/pago")
app.include_router(auth.router, prefix="/api/auth")
