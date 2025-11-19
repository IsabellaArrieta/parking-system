from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from datetime import datetime
from ..database import get_db
from ..models import Pago, Ticket

router = APIRouter(tags=["Pago"])

@router.post("/")
def registrar_pago(
    ticket_id: int = Query(..., description="ID del ticket"),
    monto: float = Query(..., description="Monto pagado"),
    db: Session = Depends(get_db)
):
    ticket = db.query(Ticket).filter(Ticket.idTicket == ticket_id).first()
    
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket no encontrado")

    if ticket.estado != "cerrado":
        raise HTTPException(status_code=400, detail="El ticket debe estar cerrado antes de pagar")

    pago = Pago(
        ticket_id=ticket_id,
        monto=monto,
        medio="efectivo",
        estado="procesado"
    )

    db.add(pago)
    db.commit()
    db.refresh(pago)

    return {"message": "Pago registrado correctamente", "pago": pago}
