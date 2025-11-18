from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
from ..database import get_db
from ..models import Pago, Ticket

router = APIRouter(tags=["Pago"])

@router.post("/")
def registrar_pago(ticket_id: int, db: Session = Depends(get_db)):
    # Obtener ticket
    ticket = db.query(Ticket).filter(Ticket.idTicket == ticket_id).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket no encontrado")
    
    if ticket.estado == "cerrado":
        raise HTTPException(status_code=400, detail="Este ticket ya está pagado y cerrado")

    # 1. Asignar hora de salida ANTES del cálculo
    ticket.horaSalida = datetime.utcnow()

    # 2. Calcular monto real
    monto = ticket.calcular_tarifa()

    # 3. Registrar pago
    pago = Pago(
        ticket_id=ticket_id,
        monto=monto,
        fecha=datetime.utcnow(),
        estado="aprobado"
    )
    db.add(pago)

    # 4. Cerrar ticket
    ticket.estado = "cerrado"

    # 5. Liberar cupo
    ticket.cupo.estado = "libre"

    db.commit()
    db.refresh(pago)

    return {
        "message": "Pago registrado y ticket cerrado",
        "monto": monto,
        "pago": pago,
        "ticket": ticket
    }
