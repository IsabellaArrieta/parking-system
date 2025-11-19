import { useState, useEffect } from "react";
import { cupoAPI } from "../services/apiService";

export default function ParkingAvailability() {
  const [cupos, setCupos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("todos");

  useEffect(() => {
    fetchCupos();
    // Actualizar cada 5 segundos
    const interval = setInterval(fetchCupos, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchCupos = async () => {
    try {
      setLoading(true);
      const data = await cupoAPI.getAll();
      setCupos(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching cupos:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredCupos = cupos.filter((cupo) => {
    if (filter === "libres") return cupo.estado === "libre";
    if (filter === "ocupados") return cupo.estado === "ocupado";
    return true;
  });

  const availableCount = cupos.filter((c) => c.estado === "libre").length;
  const occupiedCount = cupos.filter((c) => c.estado === "ocupado").length;

  if (loading && cupos.length === 0) return <div>Cargando disponibilidad...</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Disponibilidad en Tiempo Real</h2>

      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 p-4 rounded">
          <p className="text-sm text-gray-600">Disponibles</p>
          <p className="text-3xl font-bold text-green-600">{availableCount}</p>
        </div>
        <div className="bg-red-50 p-4 rounded">
          <p className="text-sm text-gray-600">Ocupados</p>
          <p className="text-3xl font-bold text-red-600">{occupiedCount}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded">
          <p className="text-sm text-gray-600">Total</p>
          <p className="text-3xl font-bold text-blue-600">{cupos.length}</p>
        </div>
      </div>

      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setFilter("todos")}
          className={`px-4 py-2 rounded ${
            filter === "todos"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Todos
        </button>
        <button
          onClick={() => setFilter("libres")}
          className={`px-4 py-2 rounded ${
            filter === "libres"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Libres
        </button>
        <button
          onClick={() => setFilter("ocupados")}
          className={`px-4 py-2 rounded ${
            filter === "ocupados"
              ? "bg-red-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Ocupados
        </button>
        <button
          onClick={fetchCupos}
          className="ml-auto px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Actualizar
        </button>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {filteredCupos.map((cupo) => (
          <div
            key={cupo.idCupo}
            className={`p-4 rounded-lg text-center font-semibold ${
              cupo.estado === "libre"
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            <div className="text-sm text-gray-600">Piso {cupo.piso}</div>
            <div className="text-lg font-bold">Cupo {cupo.idCupo}</div>
            <div className="text-xs">{cupo.zona}</div>
            <div className={`text-sm mt-1 ${
              cupo.estado === "libre" ? "text-green-700" : "text-red-700"
            }`}>
              {cupo.estado === "libre" ? "LIBRE" : "OCUPADO"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
