from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Cupo, Vehiculo, Ticket

router = APIRouter(tags=["Cupo"])

# Listar todos los cupos
@router.get("/")
def listar_cupos(db: Session = Depends(get_db)):
    return db.query(Cupo).all()


# Ocupar un cupo asociando un vehículo
@router.put("/ocupar/{cupo_id}")
def ocupar_cupo(cupo_id: int, vehiculo_placa: str, db: Session = Depends(get_db)):
    cupo = db.query(Cupo).filter(Cupo.idCupo == cupo_id).first()
    if not cupo:
        raise HTTPException(status_code=404, detail="Cupo no encontrado")
    if cupo.estado == "ocupado":
        raise HTTPException(status_code=400, detail="Cupo ya ocupado")

    vehiculo = db.query(Vehiculo).filter(Vehiculo.placa == vehiculo_placa).first()
    if not vehiculo:
        raise HTTPException(status_code=404, detail="Vehículo no encontrado")

    # Actualiza estado del cupo
    cupo.estado = "ocupado"

    # Crear ticket asociando cupo y vehículo
    ticket = Ticket(
        vehiculo_placa=vehiculo.placa,
        idCupo=cupo.idCupo
    )
    db.add(ticket)

    db.commit()
    db.refresh(cupo)
    db.refresh(ticket)

    return {"message": "Cupo ocupado y ticket creado", "cupo": cupo, "ticket": ticket}


# Liberar un cupo asociado a un vehículo
@router.put("/liberar/")
def liberar_cupo_por_vehiculo(vehiculo_placa: str, db: Session = Depends(get_db)):
    # Buscar ticket activo del vehículo
    ticket = db.query(Ticket).filter(
        Ticket.vehiculo_placa == vehiculo_placa,
        Ticket.estado == "activo"
    ).first()

    if not ticket:
        raise HTTPException(status_code=404, detail="No se encontró un ticket activo para este vehículo")

    # Liberar el cupo
    cupo = ticket.cupo
    cupo.estado = "libre"

    # Cerrar ticket
    ticket.estado = "cerrado"

    db.commit()
    db.refresh(cupo)
    db.refresh(ticket)

    return {"message": "Cupo liberado y ticket cerrado", "cupo": cupo, "ticket": ticket}
