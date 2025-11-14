from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime
from ..database import get_db
from ..models import Ticket
from ..models import Cupo

router = APIRouter(tags=["Ticket"])

@router.post("/")
def crear_ticket(vehicle_id: int, cupo_id: int, db: Session = Depends(get_db)):
    # Ocupar cupo
    cupo = db.query(Cupo).filter(Cupo.id == cupo_id).first()
    cupo.disponible = False

    ticket = Ticket(vehicle_id=vehicle_id, cupo_id=cupo_id)
    db.add(ticket)
    db.commit()
    db.refresh(ticket)
    return ticket
