from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey, Float
from sqlalchemy.orm import relationship
from .database import Base
import datetime


# -----------------------------
#  Cliente  (Opcional en MVP)
# -----------------------------
class Cliente(Base):
    __tablename__ = "clientes"

    idCliente = Column(Integer, primary_key=True, index=True)
    nombre = Column(String)
    documento = Column(String)
    telefono = Column(String)
    email = Column(String)

    # Un cliente puede tener muchos vehículos
    vehiculos = relationship("Vehiculo", back_populates="cliente")


# -----------------------------
#  Vehículo
# -----------------------------
class Vehiculo(Base):
    __tablename__ = "vehiculos"

    placa = Column(String, primary_key=True, index=True)
    tipo = Column(String)

    # Relación opcional con Cliente
    cliente_id = Column(Integer, ForeignKey("clientes.idCliente"), nullable=True)
    cliente = relationship("Cliente", back_populates="vehiculos")

    # Relación con tickets
    tickets = relationship("Ticket", back_populates="vehiculo")


# -----------------------------
#  Cupo (Espacio del Parqueadero)
# -----------------------------
class Cupo(Base):
    __tablename__ = "cupos"

    idCupo = Column(Integer, primary_key=True, index=True)
    piso = Column(Integer)
    zona = Column(String)
    estado = Column(String, default="libre")   # libre / ocupado

    # Relación 1..1 con Ticket (solo un ticket activo)
    ticket = relationship("Ticket", back_populates="cupo", uselist=False)


# -----------------------------
#  Tarifa
# -----------------------------
class Tarifa(Base):
    __tablename__ = "tarifas"

    idTarifa = Column(Integer, primary_key=True, index=True)
    tipoVehiculo = Column(String)
    valorHora = Column(Float)
    valorFraccion = Column(Float)
    valorMaximo = Column(Float)

    # Tickets asociados a esta tarifa
    tickets = relationship("Ticket", back_populates="tarifa")

    # Método de cálculo
    def calcular_monto(self, tiempo_minutos: float):
        horas = tiempo_minutos / 60
        monto = horas * self.valorHora

        if monto > self.valorMaximo:
            return self.valorMaximo

        return monto


# -----------------------------
#  Ticket Estacionamiento
# -----------------------------
class Ticket(Base):
    __tablename__ = "tickets"

    idTicket = Column(Integer, primary_key=True, index=True)
    horaEntrada = Column(DateTime, default=datetime.datetime.utcnow)
    horaSalida = Column(DateTime, nullable=True)
    estado = Column(String, default="activo")  # activo / cerrado

    # Relaciones:
    # Vehículo
    vehiculo_placa = Column(String, ForeignKey("vehiculos.placa"))
    vehiculo = relationship("Vehiculo", back_populates="tickets")

    # Cupo
    idCupo = Column(Integer, ForeignKey("cupos.idCupo"))
    cupo = relationship("Cupo", back_populates="ticket")

    # Tarifa
    tarifa_id = Column(Integer, ForeignKey("tarifas.idTarifa"))
    tarifa = relationship("Tarifa", back_populates="tickets")

    # Cálculo de tiempo en minutos
    def calcular_tiempo(self):
        if not self.horaSalida:
            return 0

        delta = self.horaSalida - self.horaEntrada
        return delta.total_seconds() / 60  # minutos

    # Cálculo de tarifa según Tarifa asociada
    def calcular_tarifa(self):
        minutos = self.calcular_tiempo()
        return self.tarifa.calcular_monto(minutos)


# -----------------------------
#  Pago
# -----------------------------
class Pago(Base):
    __tablename__ = "pagos"

    idPago = Column(Integer, primary_key=True, index=True)
    monto = Column(Float)
    fecha = Column(DateTime, default=datetime.datetime.utcnow)
    medio = Column(String)          # efectivo / tarjeta / billetera
    estado = Column(String)         # procesado / anulado

    # Un pago está asociado a un ticket
    ticket_id = Column(Integer, ForeignKey("tickets.idTicket"))
    ticket = relationship("Ticket")
