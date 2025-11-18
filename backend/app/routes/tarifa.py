from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Tarifa

router = APIRouter(tags=["Tarifa"])

# -----------------------------
# Obtener todas las tarifas
# -----------------------------
@router.get("/")
def obtener_tarifas(db: Session = Depends(get_db)):
    return db.query(Tarifa).all()


# -----------------------------
# Actualizar tarifa usando query params
# -----------------------------
@router.put("/actualizar/{idTarifa}")
def actualizar_tarifa(
    idTarifa: int,
    tipoVehiculo: str = Query(None, description="Nuevo tipo de vehículo"),
    valorHora: float = Query(None, description="Nuevo valor por hora"),
    valorFraccion: float = Query(None, description="Nuevo valor por fracción de hora"),
    valorMaximo: float = Query(None, description="Nuevo valor máximo"),
    db: Session = Depends(get_db)
):
    tarifa = db.query(Tarifa).filter(Tarifa.idTarifa == idTarifa).first()
    if not tarifa:
        raise HTTPException(status_code=404, detail="Tarifa no encontrada")

    # Solo actualizar los campos que se pasen
    if tipoVehiculo is not None:
        tarifa.tipoVehiculo = tipoVehiculo
    if valorHora is not None:
        tarifa.valorHora = valorHora
    if valorFraccion is not None:
        tarifa.valorFraccion = valorFraccion
    if valorMaximo is not None:
        tarifa.valorMaximo = valorMaximo

    db.commit()
    db.refresh(tarifa)
    return {"message": "Tarifa actualizada correctamente", "tarifa": tarifa}

