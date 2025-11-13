from fastapi import FastAPI
from .database import Base, engine
from . import models  
from .routes import vehicle

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Parking System API running"}

# Crear las tablas automáticamente
Base.metadata.create_all(bind=engine)

# Registrar rutas
app.include_router(vehicle.router, prefix="/api")
