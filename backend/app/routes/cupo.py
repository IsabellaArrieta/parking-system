from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Cupo

router = APIRouter(tags=["Cupo"])

@router.get("/")
def listar_cupos(db: Session = Depends(get_db)):
    return db.query(Cupo).all()

@router.put("/ocupar/{cupo_id}")
def ocupar_cupo(cupo_id: int, db: Session = Depends(get_db)):
    cupo = db.query(Cupo).filter(Cupo.id == cupo_id).first()
    cupo.disponible = False
    db.commit()
    return {"message": "Cupo ocupado"}

@router.put("/liberar/{cupo_id}")
def liberar_cupo(cupo_id: int, db: Session = Depends(get_db)):
    cupo = db.query(Cupo).filter(Cupo.id == cupo_id).first()
    cupo.disponible = True
    db.commit()
    return {"message": "Cupo liberado"}
