// API Service - Centraliza todas las llamadas a la API del backend
const API_BASE_URL = "http://localhost:8000/api";

// ==================== VEHÍCULOS ====================
export const vehicleAPI = {
  register: async (placa, tipo) => {
    const response = await fetch(
      `${API_BASE_URL}/vehicle/registrar?placa=${placa}&tipo=${tipo}`,
      { method: "POST" }
    );
    if (!response.ok) throw new Error("Error al registrar vehículo");
    return response.json();
  },

  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/vehicle/`);
    if (!response.ok) throw new Error("Error al obtener vehículos");
    return response.json();
  },

  getByPlaca: async (placa) => {
    const response = await fetch(`${API_BASE_URL}/vehicle/${placa}`);
    if (!response.ok) throw new Error("Vehículo no encontrado");
    return response.json();
  },

  delete: async (placa) => {
    const response = await fetch(`${API_BASE_URL}/vehicle/${placa}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Error al eliminar vehículo");
    return response.json();
  },
};

// ==================== CUPOS ====================
export const cupoAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/cupo/`);
    if (!response.ok) throw new Error("Error al obtener cupos");
    return response.json();
  },

  occupySpot: async (cupoId, vehiculoPlaca) => {
    const response = await fetch(
      `${API_BASE_URL}/cupo/ocupar/${cupoId}?vehiculo_placa=${vehiculoPlaca}`,
      { method: "PUT" }
    );
    if (!response.ok) throw new Error("Error al ocupar cupo");
    return response.json();
  },

  releaseSpot: async (vehiculoPlaca) => {
    const response = await fetch(
      `${API_BASE_URL}/cupo/liberar/?vehiculo_placa=${vehiculoPlaca}`,
      { method: "PUT" }
    );
    if (!response.ok) throw new Error("Error al liberar cupo");
    return response.json();
  },
};

// ==================== TARIFAS ====================
export const tarifaAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/tarifa/`);
    if (!response.ok) throw new Error("Error al obtener tarifas");
    return response.json();
  },

  create: async (tipoVehiculo, valorHora, valorFraccion, valorMaximo) => {
    const response = await fetch(
      `${API_BASE_URL}/tarifa/crear?tipoVehiculo=${tipoVehiculo}&valorHora=${valorHora}&valorFraccion=${valorFraccion}&valorMaximo=${valorMaximo}`,
      { method: "POST" }
    );
    if (!response.ok) throw new Error("Error al crear tarifa");
    return response.json();
  },

  update: async (idTarifa, tipoVehiculo, valorHora, valorFraccion, valorMaximo) => {
    const params = new URLSearchParams();
    if (tipoVehiculo) params.append("tipoVehiculo", tipoVehiculo);
    if (valorHora) params.append("valorHora", valorHora);
    if (valorFraccion) params.append("valorFraccion", valorFraccion);
    if (valorMaximo) params.append("valorMaximo", valorMaximo);

    const response = await fetch(
      `${API_BASE_URL}/tarifa/actualizar/${idTarifa}?${params}`,
      { method: "PUT" }
    );
    if (!response.ok) throw new Error("Error al actualizar tarifa");
    return response.json();
  },

  delete: async (idTarifa) => {
    const response = await fetch(`${API_BASE_URL}/tarifa/eliminar/${idTarifa}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Error al eliminar tarifa");
    return response.json();
  },
};

// ==================== TICKETS ====================
export const ticketAPI = {
  registerEntry: async (vehiculoPlaca, tarifaId) => {
    const response = await fetch(
      `${API_BASE_URL}/ticket/entrada?vehiculo_placa=${vehiculoPlaca}&tarifa_id=${tarifaId}`,
      { method: "POST" }
    );
    if (!response.ok) throw new Error("Error al registrar entrada");
    return response.json();
  },

  registerExit: async (ticketId) => {
    const response = await fetch(
      `${API_BASE_URL}/ticket/salida/${ticketId}`,
      { method: "PUT" }
    );
    if (!response.ok) throw new Error("Error al registrar salida");
    return response.json();
  },
};

// ==================== PAGOS ====================
export const pagoAPI = {
  // Aquí irían los endpoints de pagos cuando estén disponibles
};
