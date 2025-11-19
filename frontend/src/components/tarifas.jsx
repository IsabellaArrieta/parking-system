import { useState, useEffect } from "react";
import { tarifaAPI } from "../services/apiService";

export default function TarifasComponent() {
  const [tarifas, setTarifas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    tipoVehiculo: "",
    valorHora: "",
    valorFraccion: "",
    valorMaximo: "",
  });

  useEffect(() => {
    fetchTarifas();
  }, []);

  const fetchTarifas = async () => {
    try {
      setLoading(true);
      const data = await tarifaAPI.getAll();
      setTarifas(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching tarifas:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await tarifaAPI.update(
          editingId,
          formData.tipoVehiculo,
          formData.valorHora,
          formData.valorFraccion,
          formData.valorMaximo
        );
      } else {
        await tarifaAPI.create(
          formData.tipoVehiculo,
          formData.valorHora,
          formData.valorFraccion,
          formData.valorMaximo
        );
      }
      fetchTarifas();
      setFormData({
        tipoVehiculo: "",
        valorHora: "",
        valorFraccion: "",
        valorMaximo: "",
      });
      setShowForm(false);
      setEditingId(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (tarifa) => {
    setFormData({
      tipoVehiculo: tarifa.tipoVehiculo,
      valorHora: tarifa.valorHora,
      valorFraccion: tarifa.valorFraccion,
      valorMaximo: tarifa.valorMaximo,
    });
    setEditingId(tarifa.idTarifa);
    setShowForm(true);
  };

  const handleDelete = async (idTarifa) => {
    if (window.confirm("¿Deseas eliminar esta tarifa?")) {
      try {
        await tarifaAPI.delete(idTarifa);
        fetchTarifas();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      tipoVehiculo: "",
      valorHora: "",
      valorFraccion: "",
      valorMaximo: "",
    });
  };

  if (loading) return <div className="p-6">Cargando tarifas...</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Gestión de NNTarifas</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {showForm ? "Cancelar" : "Nueva Tarifa"}
      </button>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 p-4 bg-gray-50 rounded border border-gray-200"
        >
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              name="tipoVehiculo"
              placeholder="Tipo de Vehículo (ej: Auto, Moto)"
              value={formData.tipoVehiculo}
              onChange={handleInputChange}
              required
              className="p-2 border rounded"
            />
            <input
              type="number"
              name="valorHora"
              placeholder="Valor Hora"
              step="0.01"
              value={formData.valorHora}
              onChange={handleInputChange}
              required
              className="p-2 border rounded"
            />
            <input
              type="number"
              name="valorFraccion"
              placeholder="Valor Fracción"
              step="0.01"
              value={formData.valorFraccion}
              onChange={handleInputChange}
              required
              className="p-2 border rounded"
            />
            <input
              type="number"
              name="valorMaximo"
              placeholder="Valor Máximo"
              step="0.01"
              value={formData.valorMaximo}
              onChange={handleInputChange}
              required
              className="p-2 border rounded"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              {editingId ? "Actualizar" : "Crear"}
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
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-3 text-left">
                Tipo de Vehículo
              </th>
              <th className="border border-gray-300 p-3 text-left">Valor/Hora</th>
              <th className="border border-gray-300 p-3 text-left">
                Valor/Fracción
              </th>
              <th className="border border-gray-300 p-3 text-left">Valor Máximo</th>
              <th className="border border-gray-300 p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tarifas.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No hay tarifas configuradas
                </td>
              </tr>
            ) : (
              tarifas.map((tarifa) => (
                <tr key={tarifa.idTarifa} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-3">
                    {tarifa.tipoVehiculo}
                  </td>
                  <td className="border border-gray-300 p-3">
                    ${tarifa.valorHora.toFixed(2)}
                  </td>
                  <td className="border border-gray-300 p-3">
                    ${tarifa.valorFraccion.toFixed(2)}
                  </td>
                  <td className="border border-gray-300 p-3">
                    ${tarifa.valorMaximo.toFixed(2)}
                  </td>
                  <td className="border border-gray-300 p-3 text-center">
                    <button
                      onClick={() => handleEdit(tarifa)}
                      className="px-3 py-1 bg-blue-500 text-white rounded mr-2 hover:bg-blue-600"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(tarifa.idTarifa)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
