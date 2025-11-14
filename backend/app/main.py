from fastapi import FastAPI
from .database import Base, engine
from . import models  
from .routes import vehicle, cupo, tarifa, ticket, pago



app = FastAPI()

@app.get("/")
def root():
    return {"message": "Parking System API running"}

# Crear las tablas automáticamente
Base.metadata.create_all(bind=engine)

# Registrar rutas
app.include_router(vehicle.router, prefix="/api/vehicle")
app.include_router(cupo.router, prefix="/api/cupo")
app.include_router(tarifa.router, prefix="/api/tarifa")
app.include_router(ticket.router, prefix="/api/ticket")
app.include_router(pago.router, prefix="/api/pago")