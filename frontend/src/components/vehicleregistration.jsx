import { useState } from "react";
import { vehicleAPI } from "../services/apiService";
import { Plus, Trash2, RefreshCw } from "lucide-react";

export default function VehicleRegistration() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    placa: "",
    tipo: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.toUpperCase(),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await vehicleAPI.register(formData.placa, formData.tipo);
      setFormData({ placa: "", tipo: "" });
      setShowForm(false);
      setError(null);
      fetchVehicles();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const data = await vehicleAPI.getAll();
      setVehicles(data || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (placa) => {
    if (window.confirm(`¿Deseas eliminar el vehículo ${placa}?`)) {
      try {
        await vehicleAPI.delete(placa);
        fetchVehicles();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormData({ placa: "", tipo: "" });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Registro de Vehículos</h2>
        <div className="flex gap-2">
          <button
            onClick={fetchVehicles}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50"
          >
            <RefreshCw size={20} />
            Actualizar
          </button>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <Plus size={20} />
            {showForm ? "Cancelar" : "Registrar Vehículo"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 p-4 bg-gray-50 rounded border border-gray-200 space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Placa</label>
              <input
                type="text"
                name="placa"
                placeholder="Ej: ABC-123"
                value={formData.placa}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded uppercase placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Tipo de Vehículo</label>
              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded"
              >
                <option value="">Selecciona un tipo</option>
                <option value="Auto">Auto</option>
                <option value="Moto">Moto</option>
                <option value="Camioneta">Camioneta</option>
                <option value="Bicicleta">Bicicleta</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "Registrando..." : "Registrar"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto">
        {vehicles.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No hay vehículos registrados
          </div>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 p-3 text-left">Placa</th>
                <th className="border border-gray-300 p-3 text-left">Tipo</th>
                <th className="border border-gray-300 p-3 text-left">Cliente ID</th>
                <th className="border border-gray-300 p-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle.placa} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">
                    {vehicle.placa}
                  </td>
                  <td className="border border-gray-300 p-3">{vehicle.tipo}</td>
                  <td className="border border-gray-300 p-3 text-center">
                    {vehicle.cliente_id}
                  </td>
                  <td className="border border-gray-300 p-3 text-center">
                    <button
                      onClick={() => handleDelete(vehicle.placa)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 inline-flex items-center gap-1"
                    >
                      <Trash2 size={16} />
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="mt-4 text-sm text-gray-600">
        Total de vehículos: <strong>{vehicles.length}</strong>
      </div>
    </div>
  );
}
