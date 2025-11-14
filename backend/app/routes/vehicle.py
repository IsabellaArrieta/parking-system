from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Vehiculo

router = APIRouter(tags=["Vehiculo"])


# ----------------------------------------
# Registrar un vehículo
# ----------------------------------------
@router.post("/registrar")
def registrar_vehiculo(placa: str, tipo: str, db: Session = Depends(get_db)):
    # Verificar si ya existe
    existe = db.query(Vehiculo).filter(Vehiculo.placa == placa).first()
    if existe:
        raise HTTPException(status_code=400, detail="La placa ya está registrada.")

    vehiculo = Vehiculo(placa=placa, tipo=tipo)
    db.add(vehiculo)
    db.commit()
    db.refresh(vehiculo)

    return {
        "message": "Vehículo registrado correctamente",
        "vehiculo": vehiculo
    }


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
