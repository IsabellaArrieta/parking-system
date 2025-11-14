from fastapi import APIRouter, Depends
from ..database import get_db
from sqlalchemy.orm import Session
from ..models import Tarifa

router = APIRouter(tags=["Tarifa"])

@router.get("/")
def obtener_tarifas(db: Session = Depends(get_db)):
    return db.query(Tarifa).all()
