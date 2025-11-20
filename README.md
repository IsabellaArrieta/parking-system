# 🅿️ Parking System

Sistema integral de gestión de estacionamientos desarrollado con tecnologías modernas para optimizar la administración de espacios de parqueo, tarifas, pagos y control de acceso vehicular.

## 📋 Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Ejecución](#ejecución)
- [Arquitectura](#arquitectura)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [API Documentation](#api-documentation)
- [Características](#características)
- [Troubleshooting](#troubleshooting)

## 📝 Descripción General

**Parking System** es una solución completa para la administración de estacionamientos que proporciona:

- **Gestión de Vehículos**: Registro y seguimiento de vehículos estacionados
- **Control de Cupos**: Monitoreo en tiempo real de espacios disponibles
- **Gestión de Tarifas**: Configuración flexible de precios por hora/día
- **Sistema de Pagos**: Procesamiento seguro de transacciones
- **Autenticación y Autorización**: Control de acceso con roles de usuario
- **Emisión de Tickets**: Generación de tickets digitales con datos de entrada/salida
- **Dashboard Administrativo**: Panel de control para supervisión y reportes

### Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| **Frontend** | React 19 + Vite + Tailwind CSS |
| **Backend** | FastAPI + Python 3.10+ |
| **Base de Datos** | SQLite/PostgreSQL |
| **Autenticación** | JWT + PassLib |
| **ORM** | SQLAlchemy |

## 🔧 Requisitos Previos

### Sistema General
- **Git** (para clonar el repositorio)
- **Node.js** 18+ (para frontend)
- **Python** 3.10+ (para backend)
- **npm** o **yarn** (gestor de paquetes JavaScript)
- **pip** (gestor de paquetes Python)

### Backend Específico
- PostgreSQL 12+ (opcional, puede usarse SQLite)
- Python venv para aislamiento de dependencias

### Frontend Específico
- Navegador moderno (Chrome, Firefox, Safari, Edge)

## 📦 Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/IsabellaArrieta/parking-system.git
cd parking-system
```

### 2. Configurar Backend

```bash
# Navegar a la carpeta del backend
cd backend

# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
# En Windows:
venv\Scripts\activate
# En macOS/Linux:
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt
```

### 3. Configurar Frontend

```bash
# Navegar a la carpeta del frontend
cd frontend

# Instalar dependencias
npm install
```

## 🚀 Ejecución

### Backend

```bash
cd backend

# Activar entorno virtual (si no está activo)
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Ejecutar servidor
npm start
# O directamente:
uvicorn app.main:app --reload

# El servidor estará disponible en: http://localhost:8000
# API Docs (Swagger UI): http://localhost:8000/docs
# ReDoc: http://localhost:8000/redoc
```

### Frontend

```bash
cd frontend

# Modo desarrollo con Vite
npm run dev
# El frontend estará disponible en: http://localhost:5173

# Para compilar producción:
npm run build

# Para previsualizar compilación:
npm run preview
```

### Ejecutar Ambos Simultáneamente

En dos terminales diferentes:

**Terminal 1 (Backend):**
```bash
cd backend
venv\Scripts\activate  # Windows
npm start
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

## 🏗️ Arquitectura

### Diagrama General

```
┌─────────────────────────────────────────────────────────────┐
│                    PARKING SYSTEM                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────┐         ┌──────────────────────┐  │
│  │                      │         │                      │  │
│  │   FRONTEND (React)   │◄────────┤   BACKEND (FastAPI)  │  │
│  │                      │  REST   │                      │  │
│  │ - Dashboard Admin    │   API   │ - Rutas HTTP        │  │
│  │ - User Interface     │◄────────│ - Lógica de Negocio │  │
│  │ - Reporting          │  JSON   │ - Autenticación     │  │
│  │                      │         │ - Validaciones      │  │
│  └──────────────────────┘         └──────┬───────────────┘  │
│                                          │                  │
│                                          │ SQLAlchemy       │
│                                          ▼                  │
│                                   ┌──────────────────┐      │
│                                   │                  │      │
│                                   │  Base de Datos   │      │
│                                   │  (SQLite/Postgres)      │
│                                   │                  │      │
│                                   │ - Usuarios       │      │
│                                   │ - Vehículos      │      │
│                                   │ - Tickets        │      │
│                                   │ - Tarifas        │      │
│                                   │ - Pagos          │      │
│                                   │                  │      │
│                                   └──────────────────┘      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Capas de la Arquitectura

#### 1. **Capa de Presentación (Frontend)**
- **Tecnología**: React 19 con Vite
- **Estilizado**: Tailwind CSS + PostCSS
- **Componentes Principales**:
  - Dashboard administrativo
  - Gestión de tarifas
  - Registro de vehículos
  - Información de disponibilidad
  - Sesiones de usuario
  - Reportes y estadísticas

#### 2. **Capa de Aplicación (Backend)**
- **Framework**: FastAPI
- **Puertos**: 8000 (desarrollo), configurable en producción
- **Módulos Principales**:
  - `auth.py`: Autenticación y autorización (JWT)
  - `vehicle.py`: CRUD de vehículos
  - `ticket.py`: Gestión de tickets de entrada/salida
  - `tarifa.py`: Configuración de tarifas
  - `pago.py`: Procesamiento de pagos
  - `cupo.py`: Control de disponibilidad
  - `availability.py`: Estado en tiempo real

#### 3. **Capa de Datos**
- **ORM**: SQLAlchemy
- **Base de Datos**: SQLite (desarrollo) / PostgreSQL (producción)
- **Modelos**:
  - `Usuario`: Administradores y operadores
  - `Vehiculo`: Información de vehículos
  - `Ticket`: Registros de entrada/salida
  - `Tarifa`: Configuración de precios
  - `Pago`: Historial de transacciones
  - `Cupo`: Control de espacios disponibles

#### 4. **Middleware y Configuración**
- CORS habilitado para comunicación frontend-backend
- JWT para autenticación segura
- Validación de datos con Pydantic

## 📁 Estructura del Proyecto

```
parking-system/
│
├── backend/                          # API REST (FastAPI)
│   ├── app/
│   │   ├── main.py                  # Punto de entrada, configuración CORS
│   │   ├── database.py              # Configuración de BD y sesiones
│   │   ├── models.py                # Modelos SQLAlchemy
│   │   ├── schemas.py               # Esquemas Pydantic para validación
│   │   ├── crud.py                  # Operaciones CRUD
│   │   ├── db/                      # Scripts SQL
│   │   │   ├── create_schema.sql    # Esquema inicial
│   │   │   ├── reset_db.sql         # Limpiar BD
│   │   │   └── seed_data.sql        # Datos iniciales
│   │   └── routes/                  # Endpoints por recurso
│   │       ├── auth.py              # Autenticación
│   │       ├── vehicle.py           # Vehículos
│   │       ├── ticket.py            # Tickets
│   │       ├── tarifa.py            # Tarifas
│   │       ├── pago.py              # Pagos
│   │       ├── cupo.py              # Disponibilidad
│   │       └── availability.py      # Estado en tiempo real
│   ├── scripts/
│   │   ├── create_admin.py          # Crear usuario admin
│   │   └── seed_occupied.py         # Datos de prueba
│   ├── requirements.txt             # Dependencias Python
│   └── package.json                 # Scripts npm
│
├── frontend/                         # Aplicación React
│   ├── src/
│   │   ├── main.jsx                 # Punto de entrada
│   │   ├── App.jsx                  # Componente principal
│   │   ├── App.css                  # Estilos globales
│   │   ├── index.css                # Resets y utilidades
│   │   ├── components/              # Componentes React
│   │   │   ├── dashboardadmin.jsx
│   │   │   ├── dashboardadmin_new.jsx
│   │   │   ├── feemanagement.jsx    # Gestión de tarifas
│   │   │   ├── vehicleregistration.jsx
│   │   │   ├── parkingavailability.jsx
│   │   │   ├── tarifas.jsx
│   │   │   ├── registers.jsx
│   │   │   ├── sesiontab.jsx
│   │   │   ├── sidebar_admin.jsx
│   │   │   └── sidebar_user.jsx
│   │   ├── services/
│   │   │   └── apiService.js        # Cliente HTTP para API
│   │   └── assets/                  # Recursos estáticos
│   ├── public/
│   │   └── fonts/                   # Tipografías custom
│   ├── package.json                 # Dependencias npm
│   ├── vite.config.js               # Configuración Vite
│   ├── tailwind.config.js           # Configuración Tailwind CSS
│   ├── postcss.config.js            # Configuración PostCSS
│   └── eslint.config.js             # Reglas ESLint
│
├── LICENSE                          # Licencia del proyecto
├── README.md                        # Este archivo
└── TROUBLESHOOTING.md               # Guía de resolución de problemas

```

## 🔗 API Documentation

Una vez que el backend esté en ejecución, accede a:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Endpoints Principales

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/auth/login` | Autenticación de usuario |
| POST | `/auth/register` | Registro de nuevo usuario |
| GET | `/vehicles` | Listar vehículos |
| POST | `/vehicles` | Registrar vehículo |
| GET | `/tickets` | Listar tickets |
| POST | `/tickets` | Crear ticket (entrada) |
| PUT | `/tickets/{id}` | Actualizar ticket (salida) |
| GET | `/tarifas` | Obtener tarifas configuradas |
| POST | `/tarifas` | Crear nueva tarifa |
| GET | `/cupo` | Consultar disponibilidad |
| POST | `/pago` | Procesar pago |

## ✨ Características

### Para Administradores
- ✅ Dashboard con métricas en tiempo real
- ✅ Gestión de tarifas y precios
- ✅ Reporte de ocupación y pagos
- ✅ Gestión de usuarios y roles
- ✅ Exportación de reportes (PDF)

### Para Usuarios Finales
- ✅ Consulta de disponibilidad de espacios
- ✅ Generación de tickets digitales
- ✅ Procesamiento de pagos
- ✅ Visualización de historial

### Sistema
- ✅ Autenticación segura con JWT
- ✅ Validación de datos en tiempo real
- ✅ Control de concurrencia
- ✅ Logs de auditoría
- ✅ Recuperación ante errores

## 🐛 Troubleshooting

Para problemas comunes, consulta el archivo [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

### Problemas Frecuentes

#### Backend no inicia
```bash
# Verificar que Python está instalado
python --version

# Reinstalar dependencias
pip install --upgrade -r requirements.txt

# Limpiar cache de Python
rmdir /s /q __pycache__
```

#### Frontend no carga
```bash
# Limpiar cache de npm
npm cache clean --force

# Reinstalar node_modules
rmdir /s /q node_modules
npm install
```

#### Problemas de conexión entre frontend y backend
- Verificar que CORS esté habilitado en backend
- Confirmar que frontend apunta a `http://localhost:8000` o URL correcta
- Revisar la consola del navegador para errores

## 📦 Dependencias Principales

### Backend
```
fastapi              # Framework web
uvicorn              # Servidor ASGI
sqlalchemy           # ORM
psycopg2-binary      # Driver PostgreSQL
python-jose          # JWT tokens
passlib              # Hashing de contraseñas
pydantic             # Validación de datos
```

### Frontend
```
react                # Librería UI
vite                 # Build tool
tailwindcss          # Utility-first CSS
recharts             # Gráficos
lucide-react         # Iconos
jspdf                # Exportación PDF
html2canvas          # Captura de DOM
```

## 🔐 Seguridad

- ✅ Contraseñas hasheadas con pbkdf2_sha256
- ✅ Autenticación mediante JWT
- ✅ CORS configurado adecuadamente
- ✅ Validación de entrada con Pydantic
- ✅ Roles y permisos en rutas protegidas

## 📝 Variables de Entorno

### Backend
Crear archivo `.env` en la carpeta `backend/`:
```
DATABASE_URL=sqlite:///./parking.db
SECRET_KEY=tu-clave-secreta-aqui
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### Frontend
Crear archivo `.env` en la carpeta `frontend/`:
```
VITE_API_BASE_URL=http://localhost:8000
```

## 👥 Roles y Permisos

- **Admin**: Acceso completo a todas las funciones
- **Operador**: Gestión de tickets y disponibilidad
- **Usuario**: Consulta de información y pagos

## 📞 Soporte

Para reportar problemas o sugerencias, crea un issue en el repositorio.

---

**Última actualización**: Noviembre 2025  
**Versión**: 1.0.0  
**Licencia**: Ver archivo LICENSE

