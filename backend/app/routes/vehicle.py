from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Vehiculo, Cliente



router = APIRouter(tags=["Vehiculo"])


# ----------------------------------------
# Registrar un vehículo
# ----------------------------------------


@router.post("/registrar")
def registrar_vehiculo(
    placa: str = Query(..., description="Placa del vehículo"),
    tipo: str = Query(..., description="Tipo del vehículo"),
    db: Session = Depends(get_db)
):
    # Verificar si la placa ya existe
    existe = db.query(Vehiculo).filter(Vehiculo.placa == placa).first()
    if existe:
        raise HTTPException(status_code=400, detail="La placa ya está registrada.")
    
    # Crear cliente automáticamente
    nuevo_cliente = Cliente()  # si Cliente solo necesita ID auto
    db.add(nuevo_cliente)
    db.commit()
    db.refresh(nuevo_cliente)  # ahora idCliente estará disponible

    # Crear vehículo asignando el cliente automáticamente
    nuevo_vehiculo = Vehiculo(
        placa=placa,
        tipo=tipo,
        cliente_id=nuevo_cliente.idCliente  # 🔑 usar idCliente, no id
    )
    db.add(nuevo_vehiculo)
    db.commit()
    db.refresh(nuevo_vehiculo)

    return {
        "message": "Vehículo registrado correctamente",
        "vehiculo": {
            "placa": nuevo_vehiculo.placa,
            "tipo": nuevo_vehiculo.tipo,
            "cliente_id": nuevo_vehiculo.cliente_id
        },
        "cliente": {
            "idCliente": nuevo_cliente.idCliente
        }
    }

# ----------------------------------------
# Listar todos los vehículos
# ----------------------------------------
@router.get("/")
def listar_vehiculos(db: Session = Depends(get_db)):
    return db.query(Vehiculo).all()


# ----------------------------------------
# Consultar vehículo por placa (opcional)
# ----------------------------------------
@router.get("/{placa}")
def obtener_vehiculo(placa: str, db: Session = Depends(get_db)):
    vehiculo = db.query(Vehiculo).filter(Vehiculo.placa == placa).first()
    if not vehiculo:
        raise HTTPException(status_code=404, detail="Vehículo no encontrado.")
    return vehiculo


# ----------------------------------------
# ELiminar vehículo por placa (opcional)
# ----------------------------------------

@router.delete("/{placa}")
def eliminar_vehiculo(placa: str, db: Session = Depends(get_db)):
    vehiculo = db.query(Vehiculo).filter(Vehiculo.placa == placa).first()
    if not vehiculo:
        raise HTTPException(status_code=404, detail="Vehículo no encontrado")
    db.delete(vehiculo)
    db.commit()
    return {"message": "Vehículo eliminado correctamente"}
