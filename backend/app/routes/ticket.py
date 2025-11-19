from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
from ..database import get_db
from ..models import Ticket, Cupo, Vehiculo, Tarifa

router = APIRouter(tags=["Ticket"])

# ----------------------------------------
# Registrar entrada de vehículo (autoasigna cupo libre)
# ----------------------------------------
@router.post("/entrada")
def registrar_entrada(vehiculo_placa: str, tarifa_id: int, db: Session = Depends(get_db)):
    vehiculo = db.query(Vehiculo).filter(Vehiculo.placa == vehiculo_placa).first()
    if not vehiculo:
        raise HTTPException(status_code=404, detail="Vehículo no encontrado")

    # Buscar cupo libre
    cupo = db.query(Cupo).filter(Cupo.estado == "libre").first()
    if not cupo:
        raise HTTPException(status_code=400, detail="No hay cupos disponibles")

    tarifa = db.query(Tarifa).filter(Tarifa.idTarifa == tarifa_id).first()
    if not tarifa:
        raise HTTPException(status_code=404, detail="Tarifa no encontrada")

    # Ocupar cupo
    cupo.estado = "ocupado"

    # Crear ticket
    ticket = Ticket(
        vehiculo_placa=vehiculo_placa,
        idCupo=cupo.idCupo,
        tarifa_id=tarifa_id,
        horaEntrada=datetime.utcnow(),
        estado="activo"
    )
    db.add(ticket)
    db.commit()
    db.refresh(ticket)
    return {"message": "Entrada registrada", "ticket": ticket, "cupo": cupo}

# ----------------------------------------
# Registrar salida de vehículo
# ----------------------------------------
@router.put("/salida/{ticket_id}")
def registrar_salida(ticket_id: int, db: Session = Depends(get_db)):
    ticket = db.query(Ticket).filter(Ticket.idTicket == ticket_id).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket no encontrado")
    if ticket.estado != "activo":
        raise HTTPException(status_code=400, detail="Ticket ya cerrado")

    # Registrar hora de salida y cerrar ticket
    ticket.horaSalida = datetime.utcnow()
    ticket.estado = "cerrado"

    # Liberar cupo
    cupo = ticket.cupo
    cupo.estado = "libre"

    # Calcular monto
    monto = ticket.calcular_tarifa()

    db.commit()
    db.refresh(ticket)
    return {"message": "Salida registrada", "monto": monto, "ticket": ticket, "cupo": cupo}
