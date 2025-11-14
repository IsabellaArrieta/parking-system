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
# Crear tarifa usando query params
# -----------------------------
@router.post("/crear")
def crear_tarifa(
    tipoVehiculo: str = Query(..., description="Tipo de vehículo"),
    valorHora: float = Query(..., description="Valor por hora"),
    valorFraccion: float = Query(..., description="Valor por fracción de hora"),
    valorMaximo: float = Query(..., description="Valor máximo a cobrar"),
    db: Session = Depends(get_db)
):
    # Verificar si ya existe tarifa para ese tipo de vehículo
    existente = db.query(Tarifa).filter(Tarifa.tipoVehiculo == tipoVehiculo).first()
    if existente:
        raise HTTPException(status_code=400, detail="Ya existe una tarifa para este tipo de vehículo")
    
    nueva_tarifa = Tarifa(
        tipoVehiculo=tipoVehiculo,
        valorHora=valorHora,
        valorFraccion=valorFraccion,
        valorMaximo=valorMaximo
    )
    db.add(nueva_tarifa)
    db.commit()
    db.refresh(nueva_tarifa)
    return {"message": "Tarifa creada correctamente", "tarifa": nueva_tarifa}

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

# -----------------------------
# Eliminar tarifa usando query params
# -----------------------------

@router.delete("/eliminar/{idTarifa}")
def eliminar_tarifa(idTarifa: int, db: Session = Depends(get_db)):
    tarifa = db.query(Tarifa).filter(Tarifa.idTarifa == idTarifa).first()
    if not tarifa:
        raise HTTPException(status_code=404, detail="Tarifa no encontrada")
    
    db.delete(tarifa)
    db.commit()
    return {"message": "Tarifa eliminada correctamente"}