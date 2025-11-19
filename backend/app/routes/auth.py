from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
from ..database import get_db
from ..models import Usuario

router = APIRouter(tags=["Auth"])

pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

# Secret and algorithm - in production move to env vars
SECRET_KEY = "change_this_secret_to_something_secure"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 1 day

class Token(BaseModel):
    access_token: str
    token_type: str



class LoginData(BaseModel):
    email: str
    password: str


@router.post("/login")
def login(data: LoginData, db: Session = Depends(get_db)):
    user = db.query(Usuario).filter(Usuario.email == data.email).first()
    if not user:
        raise HTTPException(status_code=401, detail="Credenciales inválidas")

    if not pwd_context.verify(data.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Credenciales inválidas")

    to_encode = {
        "sub": user.email,
        "rol": user.rol,
        "nombre": user.nombre or "",
        "exp": datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
    }
    token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    # devolver también rol y nombre para que el frontend muestre UI adecuada
    return {"access_token": token, "token_type": "bearer", "rol": user.rol, "nombre": user.nombre}
