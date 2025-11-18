# 🚗 NorthSpot Parking System - Guía de Inicio Rápido

Este documento explica cómo ejecutar la aplicación completamente integrada.

## 📋 Requisitos Previos

- **Node.js** (v16 o superior)
- **Python** (v3.8 o superior)
- **pip** (gestor de paquetes de Python)

## 🚀 Instalación y Ejecución

### 1. Configurar el Backend

```bash
cd backend

# Instalar dependencias de Python
pip install -r requirements.txt

# Ejecutar el servidor FastAPI
uvicorn app.main:app --reload
```

El backend estará disponible en: **http://localhost:8000**

Puedes ver la documentación interactiva en: **http://localhost:8000/docs**

### 2. Configurar el Frontend

En otra terminal:

```bash
cd frontend

# Instalar dependencias de Node
npm install

# Ejecutar el servidor de desarrollo
npm run dev
```

El frontend estará disponible en: **http://localhost:5173** (o el puerto que Vite asigne)

## ✨ Características Implementadas

### Para Usuarios Normales:
- ✅ **Disponibilidad en Tiempo Real**: Ver cupos libres y ocupados
- ✅ **Consulta de Tarifas**: Ver los precios según tipo de vehículo
- ✅ **Interfaz Intuitiva**: Diseño moderno y responsivo

### Para Administradores (Login: "Admin"):
- ✅ **Dashboard Administrativo**: Estadísticas en tiempo real
- ✅ **Gestión de Tarifas**: Crear, editar y eliminar tarifas
- ✅ **Registro de Vehículos**: Registrar nuevos vehículos
- ✅ **Disponibilidad de Cupos**: Monitoreo en tiempo real
- ✅ **Descarga de Reportes**: Exportar dashboard a PDF

## 🔌 Endpoints de la API

### Vehículos
- `POST /api/vehicle/registrar` - Registrar nuevo vehículo
- `GET /api/vehicle/` - Listar todos los vehículos
- `GET /api/vehicle/{placa}` - Obtener vehículo por placa
- `DELETE /api/vehicle/{placa}` - Eliminar vehículo

### Cupos
- `GET /api/cupo/` - Listar todos los cupos
- `PUT /api/cupo/ocupar/{cupo_id}` - Ocupar un cupo
- `PUT /api/cupo/liberar/` - Liberar un cupo

### Tarifas
- `GET /api/tarifa/` - Listar todas las tarifas
- `POST /api/tarifa/crear` - Crear nueva tarifa
- `PUT /api/tarifa/actualizar/{idTarifa}` - Actualizar tarifa
- `DELETE /api/tarifa/eliminar/{idTarifa}` - Eliminar tarifa

### Tickets
- `POST /api/ticket/entrada` - Registrar entrada de vehículo
- `PUT /api/ticket/salida/{ticket_id}` - Registrar salida de vehículo

## 🔄 Flujo de la Aplicación

### Usuario Normal:
1. Accede a la aplicación
2. Ve la disponibilidad de cupos en tiempo real
3. Consulta las tarifas disponibles
4. Lee la política de datos (opcional)

### Administrador:
1. Inicia sesión con usuario "Admin"
2. Accede al dashboard con estadísticas completas
3. Gestiona las tarifas del parqueadero
4. Registra nuevos vehículos
5. Monitorea la ocupación en tiempo real
6. Descarga reportes en PDF

## 🛠️ Archivos Principales Agregados

### Frontend (`src/services/apiService.js`)
Centraliza todas las llamadas a la API con funciones para:
- Registro de vehículos
- Gestión de cupos
- Gestión de tarifas
- Manejo de tickets

### Componentes Creados:
- `parkingavailability.jsx` - Disponibilidad de cupos en tiempo real
- `tarifas.jsx` - Gestión y visualización de tarifas
- `vehicleregistration.jsx` - Registro de vehículos
- `dashboardadmin_new.jsx` - Dashboard mejorado con datos en vivo

## ⚙️ Configuración CORS

El backend está configurado para aceptar solicitudes desde:
- `http://localhost:5173`
- `http://localhost:3000`
- `http://127.0.0.1:5173`

Si necesitas agregar más orígenes, edita `backend/app/main.py` en la sección de CORS.

## 🐛 Solución de Problemas

### Error de CORS:
- Asegúrate de que el backend esté corriendo en `http://localhost:8000`
- Verifica que el frontend esté en uno de los orígenes permitidos en main.py

### Base de datos vacía:
- El backend crea automáticamente la BD en la primera ejecución
- Los datos se cargan desde `db/seed_data.sql`

### Dependencias no encontradas:
- Backend: `pip install -r requirements.txt`
- Frontend: `npm install`

## 📞 Soporte

Para más información sobre cada endpoint, consulta la documentación interactiva:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

---

**¡La aplicación está lista para usar!** 🎉
