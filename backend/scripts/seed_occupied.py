"""
Script to seed parking DB with occupied spots, vehicles and tickets for testing.
Creates X vehicles with random plate patterns and assigns them to first Y spots.

Run from backend folder:
    python scripts/seed_occupied.py [num_vehicles] [num_floors]

Example:
    python scripts/seed_occupied.py 80 3  # Creates 80 vehicles spread across 3 floors
"""
import sqlite3
import os
import random
from datetime import datetime, timedelta
import sys

def generate_plates(count):
    """Generate random realistic vehicle plate patterns."""
    plates = []
    for i in range(count):
        # Pattern: ABC-001, ABC-002, ... XYZ-999
        prefix = ''.join(random.choices('ABCDEFGHIJKLMNOPQRSTUVWXYZ', k=3))
        number = str(i + 1).zfill(3)
        plates.append(f"{prefix}-{number}")
    return plates

def seed_occupied(num_vehicles=80, num_floors=3):
    """
    Populate DB with occupied cupos, vehicles and tickets.
    - Creates num_vehicles vehicles
    - Assigns to first num_vehicles cupos (across num_floors floors)
    - Creates active tickets for each
    """
    DB_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "parking.db")
    
    if not os.path.exists(DB_PATH):
        print(f"❌ Database not found at {DB_PATH}")
        return False
    
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    
    # Verify tables exist
    for table in ["cupos", "vehiculos", "tickets", "tarifas"]:
        cur.execute(f"SELECT name FROM sqlite_master WHERE type='table' AND name='{table}'")
        if not cur.fetchone():
            print(f"❌ Table '{table}' does not exist")
            conn.close()
            return False
    
    # Get first tarifa (assume carro with id 1)
    cur.execute("SELECT idTarifa FROM tarifas LIMIT 1")
    tarifa_row = cur.fetchone()
    if not tarifa_row:
        print("❌ No tarifas found. Run seed_data.sql first.")
        conn.close()
        return False
    tarifa_id = tarifa_row[0]
    
    # Get available cupos (limit to num_vehicles)
    cur.execute("SELECT idCupo, piso FROM cupos ORDER BY idCupo LIMIT ?", (num_vehicles,))
    cupos_available = cur.fetchall()
    
    if len(cupos_available) < num_vehicles:
        print(f"⚠ Only {len(cupos_available)} cupos available, using all")
        num_vehicles = len(cupos_available)
    
    # Generate vehicle plates
    plates = generate_plates(num_vehicles)
    
    # Track counts
    vehicles_inserted = 0
    vehicles_skipped = 0
    tickets_created = 0
    cupos_updated = 0
    
    # Insert vehicles and create tickets
    for i, (cupo_id, piso) in enumerate(cupos_available):
        placa = plates[i]
        vehicle_type = random.choice(["carro", "moto", "camioneta"])
        
        # Check if vehicle exists
        cur.execute("SELECT placa FROM vehiculos WHERE placa = ?", (placa,))
        if cur.fetchone():
            vehicles_skipped += 1
        else:
            # Create minimal cliente for vehicle
            cur.execute("INSERT INTO clientes (nombre) VALUES (?)", (f"Cliente {i+1}",))
            cliente_id = cur.lastrowid
            
            # Insert vehicle
            cur.execute(
                "INSERT INTO vehiculos (placa, tipo, cliente_id) VALUES (?, ?, ?)",
                (placa, vehicle_type, cliente_id)
            )
            vehicles_inserted += 1
        
        # Create active ticket for this vehicle (if not already exists)
        cur.execute(
            "SELECT idTicket FROM tickets WHERE vehiculo_placa = ? AND estado = 'activo'",
            (placa,)
        )
        if not cur.fetchone():
            # Random entry time between 1-8 hours ago
            hours_ago = random.randint(1, 8)
            hora_entrada = (datetime.utcnow() - timedelta(hours=hours_ago)).isoformat()
            
            cur.execute(
                "INSERT INTO tickets (horaEntrada, estado, vehiculo_placa, idCupo, tarifa_id) VALUES (?, ?, ?, ?, ?)",
                (hora_entrada, "activo", placa, cupo_id, tarifa_id)
            )
            tickets_created += 1
        
        # Mark cupo as occupied
        cur.execute("UPDATE cupos SET estado = 'ocupado' WHERE idCupo = ?", (cupo_id,))
        cupos_updated += 1
    
    conn.commit()
    conn.close()
    
    print(f"""
✓ Seeding complete!
  - Vehículos insertados: {vehicles_inserted}
  - Vehículos saltados (ya existían): {vehicles_skipped}
  - Tickets creados: {tickets_created}
  - Cupos marcados como ocupados: {cupos_updated}
    """)
    return True

if __name__ == "__main__":
    num_veh = int(sys.argv[1]) if len(sys.argv) > 1 else 80
    num_floors = int(sys.argv[2]) if len(sys.argv) > 2 else 3
    
    print(f"Seeding {num_veh} vehicles across {num_floors} floors...")
    if seed_occupied(num_veh, num_floors):
        print("✓ Done! Restart backend to see changes in /api/cupo/")
    else:
        print("❌ Seeding failed")
        sys.exit(1)
