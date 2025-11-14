from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime
from ..database import get_db
from ..models import Pago
from ..models import Ticket

router = APIRouter(tags=["Pago"])

@router.post("/")
def registrar_pago(ticket_id: int, monto: float, db: Session = Depends(get_db)):
    pago = Pago(ticket_id=ticket_id, monto=monto)
    db.add(pago)

    # Marcar salida
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    ticket.hora_salida = datetime.utcnow()

    db.commit()
    db.refresh(pago)
    return pago
