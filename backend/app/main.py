from fastapi import FastAPI
from .database import Base, engine
from . import models  
from .routes import vehicle, cupo, tarifa, ticket, pago

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

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Parking System API running"}

# Registrar rutas
app.include_router(vehicle.router, prefix="/api/vehicle")
app.include_router(cupo.router, prefix="/api/cupo")
app.include_router(tarifa.router, prefix="/api/tarifa")
app.include_router(ticket.router, prefix="/api/ticket")
app.include_router(pago.router, prefix="/api/pago")
