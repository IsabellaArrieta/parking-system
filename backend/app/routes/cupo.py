from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Cupo

router = APIRouter(tags=["Cupo"])

# Listar todos los cupos
@router.get("/")
def listar_cupos(db: Session = Depends(get_db)):
    return db.query(Cupo).all()


# Cambiar estado manualmente (solo para administradores)
@router.put("/estado/{cupo_id}")
def cambiar_estado_cupo(cupo_id: int, estado: str, db: Session = Depends(get_db)):
    cupo = db.query(Cupo).filter(Cupo.idCupo == cupo_id).first()
    if not cupo:
        raise HTTPException(status_code=404, detail="Cupo no encontrado")

    if estado not in ["libre", "ocupado"]:
        raise HTTPException(status_code=400, detail="Estado inválido")

    cupo.estado = estado
    db.commit()
    db.refresh(cupo)

    return {"message": "Estado del cupo actualizado", "cupo": cupo}
