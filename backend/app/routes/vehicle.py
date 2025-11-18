from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Vehiculo



router = APIRouter(tags=["Vehiculo"])

VALID_TIPOS = ["carro", "moto"]

# ----------------------------------------
# Registrar un vehículo
# ----------------------------------------


@router.post("/")
def crear_vehiculo(placa: str, tipo: str, db: Session = Depends(get_db)):
    tipo = tipo.lower()

    if tipo not in VALID_TIPOS:
        raise HTTPException(400, detail="Tipo de vehículo inválido. Solo carro o moto.")
    
    existente = db.query(Vehiculo).filter(Vehiculo.placa == placa).first()
    if existente:
        raise HTTPException(400, detail="Ya existe un vehículo con esta placa")

    vehiculo = Vehiculo(placa=placa, tipo=tipo)
    db.add(vehiculo)
    db.commit()
    db.refresh(vehiculo)

    return {"message": "Vehículo registrado", "vehiculo": vehiculo}

# ----------------------------------------
# Listar todos los vehículos
# ----------------------------------------
@router.get("/")
def listar_vehiculos(db: Session = Depends(get_db)):
    return db.query(Vehiculo).all()


# ----------------------------------------
# Consultar vehículo por placa (opcional)
# ----------------------------------------
@router.get("/{placa}")
def obtener_vehiculo(placa: str, db: Session = Depends(get_db)):
    vehiculo = db.query(Vehiculo).filter(Vehiculo.placa == placa).first()
    if not vehiculo:
        raise HTTPException(status_code=404, detail="Vehículo no encontrado.")
    return vehiculo


# ----------------------------------------
# ELiminar vehículo por placa (opcional)
# ----------------------------------------

@router.delete("/{placa}")
def eliminar_vehiculo(placa: str, db: Session = Depends(get_db)):
    vehiculo = db.query(Vehiculo).filter(Vehiculo.placa == placa).first()
    if not vehiculo:
        raise HTTPException(status_code=404, detail="Vehículo no encontrado")
    db.delete(vehiculo)
    db.commit()
    return {"message": "Vehículo eliminado correctamente"}
