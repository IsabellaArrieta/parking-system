from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
from ..database import get_db
from ..models import Ticket, Cupo, Vehiculo, Tarifa

router = APIRouter(tags=["Ticket"])

#--------------------------------------
# Consultar ticket activo por placa
#--------------------------------------

@router.get("/activo/{placa}")
def obtener_ticket_activo(placa: str, db: Session = Depends(get_db)):
    ticket = db.query(Ticket).filter(
        Ticket.vehiculo_placa == placa,
        Ticket.estado == "activo"
    ).first()

    if not ticket:
        raise HTTPException(status_code=404, detail="No hay ticket activo para esta placa")

    return ticket

#--------------------------------------
# Registrar entrada (autoasigna cupo)
#--------------------------------------

@router.post("/entrada")
def registrar_entrada(vehiculo_placa: str, db: Session = Depends(get_db)):
    vehiculo = db.query(Vehiculo).filter(Vehiculo.placa == vehiculo_placa).first()
    if not vehiculo:
        raise HTTPException(404, detail="Vehículo no encontrado")

    # VALIDACIÓN CRÍTICA: no permitir dos tickets activos para la misma placa
    ticket_activo = db.query(Ticket).filter(
        Ticket.vehiculo_placa == vehiculo_placa,
        Ticket.estado == "activo"
    ).first()

    if ticket_activo:
        raise HTTPException(
            400,
            detail=f"El vehículo {vehiculo_placa} ya tiene un ticket activo (ID {ticket_activo.idTicket})."
        )

    # Obtener la tarifa según el tipo de vehículo
    tarifa = db.query(Tarifa).filter(
        Tarifa.tipoVehiculo == vehiculo.tipo
    ).first()

    if not tarifa:
        raise HTTPException(500, detail=f"No hay tarifa configurada para vehículos tipo {vehiculo.tipo}")

    # Cupo libre
    cupo = db.query(Cupo).filter(Cupo.estado == "libre").first()
    if not cupo:
        raise HTTPException(400, detail="No hay cupos disponibles")

    # Ocupa el cupo
    cupo.estado = "ocupado"

    ticket = Ticket(
        vehiculo_placa=vehiculo_placa,
        idCupo=cupo.idCupo,
        tarifa_id=tarifa.idTarifa
    )

    db.add(ticket)
    db.commit()
    db.refresh(ticket)

    return {"message": "Entrada registrada", "ticket": ticket, "cupo": cupo}

#--------------------------------------
# Registrar salida
#--------------------------------------
@router.put("/salida/{ticket_id}")
def registrar_salida(ticket_id: int, db: Session = Depends(get_db)):
    ticket = db.query(Ticket).filter(Ticket.idTicket == ticket_id).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket no encontrado")
    if ticket.estado != "activo":
        raise HTTPException(status_code=400, detail="Ticket ya cerrado")

    # Registrar salida
    ticket.horaSalida = datetime.utcnow()
    ticket.estado = "cerrado"

    # Liberar el cupo
    cupo = ticket.cupo
    cupo.estado = "libre"

    # Calcular tarifa
    monto = ticket.calcular_tarifa()

    db.commit()
    db.refresh(ticket)

    return {"message": "Salida registrada", "monto": monto, "ticket": ticket, "cupo": cupo}
