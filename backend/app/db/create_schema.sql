PRAGMA foreign_keys = ON;

-- ===========================
--  Tabla: CLIENTES
-- ===========================
CREATE TABLE clientes (
    idCliente INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    documento TEXT UNIQUE,
    telefono TEXT,
    email TEXT
);

-- ===========================
--  Tabla: VEHICULOS
-- ===========================
CREATE TABLE vehiculos (
    placa TEXT PRIMARY KEY,
    tipo TEXT NOT NULL,
    cliente_id INTEGER,
    FOREIGN KEY (cliente_id) REFERENCES clientes(idCliente)
        ON UPDATE CASCADE
        ON DELETE SET NULL
);

CREATE INDEX idx_vehiculos_cliente_id ON vehiculos(cliente_id);

-- ===========================
--  Tabla: CUPOS
-- ===========================
CREATE TABLE cupos (
    idCupo INTEGER PRIMARY KEY AUTOINCREMENT,
    piso INTEGER NOT NULL,
    zona TEXT NOT NULL,
    estado TEXT NOT NULL CHECK (estado IN ('libre','ocupado'))
);

-- Índice recomendado (piso+zona no repetido)
CREATE UNIQUE INDEX idx_cupos_piso_zona ON cupos(piso, zona);

-- ===========================
--  Tabla: TARIFAS
-- ===========================
CREATE TABLE tarifas (
    idTarifa INTEGER PRIMARY KEY AUTOINCREMENT,
    tipoVehiculo TEXT UNIQUE NOT NULL,
    valorHora REAL NOT NULL,
    valorFraccion REAL NOT NULL,
    valorMaximo REAL NOT NULL
);

-- ===========================
--  Tabla: TICKETS
-- ===========================
CREATE TABLE tickets (
    idTicket INTEGER PRIMARY KEY AUTOINCREMENT,
    horaEntrada DATETIME NOT NULL,
    horaSalida DATETIME,
    estado TEXT NOT NULL CHECK (estado IN ('activo','cerrado')),

    vehiculo_placa TEXT NOT NULL,
    idCupo INTEGER NOT NULL,
    tarifa_id INTEGER NOT NULL,

    FOREIGN KEY (vehiculo_placa) REFERENCES vehiculos(placa)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    FOREIGN KEY (idCupo) REFERENCES cupos(idCupo)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    FOREIGN KEY (tarifa_id) REFERENCES tarifas(idTarifa)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

CREATE INDEX idx_tickets_vehiculo ON tickets(vehiculo_placa);
CREATE INDEX idx_tickets_cupo ON tickets(idCupo);
CREATE INDEX idx_tickets_tarifa ON tickets(tarifa_id);

-- ===========================
--  Tabla: PAGOS
-- ===========================
CREATE TABLE pagos (
    idPago INTEGER PRIMARY KEY AUTOINCREMENT,
    monto REAL NOT NULL,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    medio TEXT,
    estado TEXT,
    ticket_id INTEGER NOT NULL,

    FOREIGN KEY (ticket_id) REFERENCES tickets(idTicket)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- ===========================
--  Tabla: USUARIOS
-- ===========================
CREATE TABLE usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    nombre TEXT,
    rol TEXT NOT NULL DEFAULT 'user'
);

CREATE INDEX idx_usuarios_email ON usuarios(email);

CREATE INDEX idx_pagos_ticket_id ON pagos(ticket_id);
