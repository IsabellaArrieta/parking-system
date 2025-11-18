from pydantic import BaseModel

class PagoCreate(BaseModel):
    ticket_id: int
    monto: float

#schema para la respuesta del pago (solucion al problema cupo vacio)
class CupoBase(BaseModel):
    idCupo: int
    piso: int
    zona: str
    estado: str

    class Config:
        orm_mode = True
