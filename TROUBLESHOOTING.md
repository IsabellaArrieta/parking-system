# 🔧 TROUBLESHOOTING - Solución de Problemas

## Error: "CORS Policy: No 'Access-Control-Allow-Origin' header"

**Causa**: El backend no está corriendo o CORS no está configurado.

**Solución**:
1. Asegúrate de que el backend está en `http://localhost:8000`
2. Verifica que el archivo `backend/app/main.py` tenga el middleware CORS
3. Reinicia el backend

```python
# Debe estar en main.py:
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## Error: "Address already in use: ('0.0.0.0', 8000)"

**Causa**: El puerto 8000 ya está siendo usado.

**Soluciones**:
1. Mata el proceso usando el puerto:
```powershell
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

2. O usa un puerto diferente:
```bash
uvicorn app.main:app --reload --port 8001
```
Y actualiza `apiService.js` a `http://localhost:8001`

---

## Error: "Address already in use: ('0.0.0.0', 5173)"

**Causa**: El puerto 5173 ya está siendo usado por Vite.

**Solución**:
```bash
npm run dev -- --port 5174
```

---

## Error: "Module not found: 'fastapi'" o "No module named 'sqlalchemy'"

**Causa**: Las dependencias de Python no están instaladas.

**Solución**:
```bash
cd backend
pip install -r requirements.txt
```

---

## Error: "Cannot find module 'recharts'" o "Cannot find module 'lucide-react'"

**Causa**: Las dependencias de Node.js no están instaladas.

**Solución**:
```bash
cd frontend
npm install
```

---

## Error: "database.db not found" o "No such table: vehiculo"

**Causa**: La base de datos no se ha creado correctamente.

**Soluciones**:
1. Elimina el archivo `parking.db` si existe:
```bash
cd backend
rm parking.db  # En Linux/Mac
del parking.db  # En Windows
```

2. Reinicia el backend - creará la BD automáticamente

3. Si sigue fallando, verifica que los archivos SQL existen:
   - `backend/app/db/create_schema.sql`
   - `backend/app/db/seed_data.sql`

---

## Error: "502 Bad Gateway" o "Connection refused"

**Causa**: El backend no está corriendo.

**Solución**:
1. Verifica que ejecutaste: `uvicorn app.main:app --reload`
2. Asegúrate de estar en la carpeta correcta: `cd backend`
3. Revisa que no hay errores en el output de la terminal

---

## Las tarifas/cupos no se actualizan

**Causa**: El frontend no está haciendo las peticiones correctamente.

**Solución**:
1. Abre DevTools (F12) → Console
2. Busca errores en rojo
3. Revisa que la URL en `apiService.js` es correcta:
   ```javascript
   const API_BASE_URL = "http://localhost:8000/api";
   ```

---

## Error: "Unexpected token '<'" en la consola

**Causa**: El frontend está sirviendo HTML en lugar de JSON desde el backend.

**Solución**:
1. Asegúrate de que `API_BASE_URL` apunta al backend correcto
2. Verifica que el backend está corriendo en puerto 8000
3. Revisa la URL del endpoint en `apiService.js`

---

## El formulario de registro no funciona

**Causa**: Error en la validación o en la petición API.

**Solución**:
1. Abre DevTools → Network
2. Haz clic en "Registrar Vehículo"
3. Mira la petición POST en la pestaña Network
4. Revisa el status (200 = OK, 400 = Bad Request)
5. Si es 400, lee el error del backend

---

## La base de datos tiene datos de prueba incorrectos

**Causa**: El archivo `seed_data.sql` tiene datos incorrectos.

**Solución**:
1. Edita `backend/app/db/seed_data.sql`
2. Cambia los datos de prueba
3. Elimina `parking.db`
4. Reinicia el backend

---

## El frontend dice "Cargando..." pero no carga

**Causa**: La petición a la API está fallando silenciosamente.

**Solución**:
1. Abre DevTools → Console
2. Busca mensajes de error
3. Verifica que el backend está corriendo
4. Comprueba CORS

---

## Error: "Python not found" o "python is not recognized"

**Causa**: Python no está en el PATH del sistema.

**Soluciones**:
1. Instala Python desde python.org
2. Durante la instalación, marca "Add Python to PATH"
3. Reinicia tu terminal
4. Verifica con: `python --version`

---

## Error: "npm not found" o "npm is not recognized"

**Causa**: Node.js no está instalado.

**Soluciones**:
1. Instala Node.js desde nodejs.org
2. Reinicia tu terminal
3. Verifica con: `npm --version`

---

## Dashboard muestra datos de ejemplo en lugar de datos reales

**Causa**: El componente tiene datos hardcodeados por defecto.

**Solución**:
1. Verifica que la función `fetchMetrics()` se ejecuta
2. Abre DevTools → Network
3. Busca la petición a `/api/cupo/`
4. Si no existe, es que no se está haciendo la petición

---

## "Vehículo registrado correctamente" pero no aparece en la lista

**Causa**: La lista no se está refrescando automáticamente.

**Solución**:
1. Haz clic en el botón "Actualizar"
2. O recarga la página (F5)
3. Verifica que el vehículo se guardó en el backend

---

## ¿Necesitas más ayuda?

1. Revisa los logs en las terminales del backend y frontend
2. Abre DevTools (F12) del navegador
3. Revisa la documentación: http://localhost:8000/docs
4. Verifica que todos los servicios están corriendo

---

**Consejo**: Mantén ambas terminales (backend y frontend) visibles para ver errores en tiempo real.
