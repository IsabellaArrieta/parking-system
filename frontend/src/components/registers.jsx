import React, { useState, useMemo, useEffect } from 'react';
import { Search, Calendar, ArrowUpDown, RefreshCw, Download, Filter, ChevronLeft, ChevronRight, ArrowUp, ArrowDown, Plus, Trash2 } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { vehicleAPI } from '../services/apiService';


const Registros = ({ onNavigate }) => {
  const [searchPlaca, setSearchPlaca] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [ordenamiento, setOrdenamiento] = useState('desc'); // 'asc' o 'desc'
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const itemsPerPage = 8;

  // Vehicles state (replaces static registros)
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ placa: '', tipo: '' });

  // Filtrar y ordenar vehículos
  const registrosFiltrados = useMemo(() => {
    let filtered = [...vehicles];

    if (searchPlaca) {
      filtered = filtered.filter(r => r.placa && r.placa.toLowerCase().includes(searchPlaca.toLowerCase()));
    }

    // Ordenar por placa por defecto
    filtered.sort((a, b) => {
      const aKey = (a.placa || '').toLowerCase();
      const bKey = (b.placa || '').toLowerCase();
      return ordenamiento === 'asc' ? aKey.localeCompare(bKey) : bKey.localeCompare(aKey);
    });

    return filtered;
  }, [searchPlaca, fechaInicio, fechaFin, ordenamiento, vehicles]);

  // Paginación
  const totalPages = Math.max(1, Math.ceil(registrosFiltrados.length / itemsPerPage));
  const registrosPaginados = registrosFiltrados.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  // Vehicle API interactions
  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const data = await vehicleAPI.getAll();
      setVehicles(data || []);
      setError(null);
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'placa' ? value.toUpperCase() : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await vehicleAPI.register(formData.placa, formData.tipo);
      setFormData({ placa: '', tipo: '' });
      setShowForm(false);
      setError(null);
      await fetchVehicles();
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (placa) => {
    if (!window.confirm(`¿Deseas eliminar el vehículo ${placa}?`)) return;
    try {
      await vehicleAPI.delete(placa);
      await fetchVehicles();
    } catch (err) {
      setError(err.message || String(err));
    }
  };

  const handleExport = () => {
    const doc = new jsPDF();

    // Título
    doc.setFontSize(18);
    doc.setTextColor(42, 50, 75);
    doc.text('Vehículos Registrados - NorthSpot', 14, 20);

    doc.setFontSize(10);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 28);
    doc.text(`Total de vehículos: ${registrosFiltrados.length}`, 14, 34);

    // Tabla
    const tableData = registrosFiltrados.map(r => [r.placa, r.tipo, r.cliente_id || '-']);

    autoTable(doc, {
      startY: 40,
      head: [['Placa', 'Tipo', 'Cliente ID']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [42, 50, 75], textColor: [185, 230, 255] },
      alternateRowStyles: { fillColor: [221, 226, 236] },
      styles: { fontSize: 8 }
    });

    doc.save(`Vehiculos_NorthSpot_${new Date().toLocaleDateString()}.pdf`);
  };


  const toggleOrdenamiento = () => {
    setOrdenamiento(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const getEstadoBadgeStyle = (estado) => {
    switch(estado) {
      case 'Pagado':
        return { backgroundColor: '#B9E6FF', color: '#2A324B' };
      case 'Pendiente':
        return { backgroundColor: '#FF4F79', color: '#DDE2EC' };
      case 'Activo':
        return { backgroundColor: '#2A324B', color: '#B9E6FF' };
      default:
        return { backgroundColor: '#767B91', color: '#DDE2EC' };
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-2 -mt-20">
      <div className="space-y-3">
        {/* Header */}
        <div className="text-center mb-2">
          <h1 className="font-gasoek text-5xl mb-0" style={{ color: '#2A324B' }}>
            Registros de Parqueadero
          </h1>
          <p className="font-geist text-lg" style={{ color: '#2A324B' }}>
            Consulta el <span style={{ color: '#FF4F79' }}>historial</span> de entradas y salidas del sistema
          </p>
        </div>

        {/* Filtros */}
        <div className="rounded-3xl p-4 shadow-lg transition-all duration-300" style={{ backgroundColor: '#DDE2EC' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
            {/* Búsqueda por placa */}
            <div>
              <label className="font-geist text-xs mb-1 block" style={{ color: '#767B91' }}>
                Buscar por placa
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" size={16} style={{ color: '#767B91' }} />
                <input
                  type="text"
                  placeholder="ABC-123"
                  value={searchPlaca}
                  onChange={(e) => setSearchPlaca(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-2xl font-geist text-xs outline-none transition-all duration-300"
                  style={{ 
                    backgroundColor: '#fff',
                    color: '#2A324B',
                    border: '2px solid transparent'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#FF4F79'}
                  onBlur={(e) => e.target.style.borderColor = 'transparent'}
                />
              </div>
            </div>

            {/* Fecha inicio */}
            <div>
              <label className="font-geist text-xs mb-1 block" style={{ color: '#767B91' }}>
                Fecha inicio
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2" size={16} style={{ color: '#767B91' }} />
                <input
                  type="date"
                  value={fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-2xl font-geist text-xs outline-none transition-all duration-300"
                  style={{ 
                    backgroundColor: '#fff',
                    color: '#2A324B',
                    border: '2px solid transparent'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#FF4F79'}
                  onBlur={(e) => e.target.style.borderColor = 'transparent'}
                />
              </div>
            </div>

            {/* Fecha fin */}
            <div>
              <label className="font-geist text-xs mb-1 block" style={{ color: '#767B91' }}>
                Fecha fin
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2" size={16} style={{ color: '#767B91' }} />
                <input
                  type="date"
                  value={fechaFin}
                  onChange={(e) => setFechaFin(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-2xl font-geist text-xs outline-none transition-all duration-300"
                  style={{ 
                    backgroundColor: '#fff',
                    color: '#2A324B',
                    border: '2px solid transparent'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#FF4F79'}
                  onBlur={(e) => e.target.style.borderColor = 'transparent'}
                />
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-wrap gap-2 justify-end">
            <button
              onClick={toggleOrdenamiento}
              className="group flex items-center gap-2 px-4 py-2 rounded-full font-geist text-xs font-medium shadow-md hover:scale-105 transition-all duration-300"
              style={{ backgroundColor: '#2A324B', color: '#B9E6FF' }}
            >
              {ordenamiento === 'asc' ? (
                <ArrowUp size={14} className="group-hover:translate-y-[-2px] transition-transform duration-300" />
              ) : (
                <ArrowDown size={14} className="group-hover:translate-y-[2px] transition-transform duration-300" />
              )}
              Ordenar {ordenamiento === 'asc' ? 'Ascendente' : 'Descendente'}
            </button>

            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="group flex items-center gap-2 px-4 py-2 rounded-full font-geist text-xs font-medium shadow-md hover:scale-105 transition-all duration-300 disabled:opacity-50"
              style={{ backgroundColor: '#B9E6FF', color: '#2A324B' }}
            >
              <RefreshCw 
                size={14} 
                className={`transition-transform duration-300 ${isRefreshing ? 'animate-spin' : 'group-hover:rotate-180'}`}
              />
              Refrescar
            </button>

            <button onClick={() => setShowForm(!showForm)} className="group flex items-center gap-2 px-4 py-2 rounded-full font-geist text-xs font-medium shadow-md hover:scale-105 transition-all duration-300" style={{ backgroundColor: '#2A324B', color: '#B9E6FF' }}>
              <Plus size={14} /> {showForm ? 'Cancelar' : 'Registrar vehículo'}
            </button>
            <button onClick={handleExport} className="group flex items-center gap-2 px-4 py-2 rounded-full font-geist text-xs font-medium shadow-md hover:scale-105 transition-all duration-300" style={{ backgroundColor: '#FF4F79', color: '#DDE2EC' }}>
              <Download size={14} className="group-hover:translate-y-1 transition-transform duration-300" />
              Exportar PDF
            </button>
          </div>
        </div>

        {/* Formulario de registro (toggle) */}
        {showForm && (
          <form onSubmit={handleSubmit} className="mb-6 p-4 bg-white rounded border border-gray-200">
            {error && <div className="mb-3 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Placa</label>
                <input type="text" name="placa" value={formData.placa} onChange={handleInputChange} required className="w-full p-2 border rounded uppercase" placeholder="ABC-123" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Tipo</label>
                <select name="tipo" value={formData.tipo} onChange={handleInputChange} required className="w-full p-2 border rounded">
                  <option value="">Selecciona un tipo</option>
                  <option value="Auto">Auto</option>
                  <option value="Moto">Moto</option>
                  <option value="Camioneta">Camioneta</option>
                  <option value="Bicicleta">Bicicleta</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2">
              <button type="submit" disabled={loading} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50">{loading ? 'Registrando...' : 'Registrar'}</button>
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">Cancelar</button>
            </div>
          </form>
        )}

        {/* Tabla de registros */}
        <div className="rounded-3xl shadow-lg overflow-hidden transition-all duration-500" style={{ backgroundColor: '#DDE2EC' }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: '#2A324B' }}>
                  <th className="px-4 py-4 text-left font-geist text-sm" style={{ color: '#B9E6FF' }}>Placa</th>
                  <th className="px-4 py-4 text-left font-geist text-sm" style={{ color: '#B9E6FF' }}>Tipo</th>
                  <th className="px-4 py-4 text-left font-geist text-sm" style={{ color: '#B9E6FF' }}>Cliente ID</th>
                  <th className="px-4 py-4 text-right font-geist text-sm" style={{ color: '#B9E6FF' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {registrosPaginados.map((registro, index) => (
                  <tr key={registro.placa || index} className="border-b transition-all duration-300 hover:bg-opacity-50" style={{ borderColor: '#767B91', backgroundColor: index % 2 === 0 ? 'transparent' : 'rgba(118, 123, 145, 0.1)' }}>
                    <td className="px-4 py-4 font-geist text-sm font-semibold" style={{ color: '#2A324B' }}>
                      {registro.placa}
                    </td>
                    <td className="px-4 py-4 font-gasoek text-sm" style={{ color: '#FF4F79' }}>
                      {registro.tipo}
                    </td>
                    <td className="px-4 py-4 font-geist text-sm" style={{ color: '#767B91' }}>
                      {registro.cliente_id || '-'}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button onClick={() => handleDelete(registro.placa)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 inline-flex items-center gap-1">
                          <Trash2 size={14} /> Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginación */}
          <div className="flex items-center justify-between px-6 py-4" style={{ backgroundColor: '#fff' }}>
            <p className="font-geist text-sm" style={{ color: '#767B91' }}>
              Mostrando {(currentPage - 1) * itemsPerPage + 1} a {Math.min(currentPage * itemsPerPage, registrosFiltrados.length)} de {registrosFiltrados.length} registros
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-full transition-all duration-300 hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#2A324B', color: '#B9E6FF' }}
              >
                <ChevronLeft size={20} />
              </button>
              <span className="font-geist text-sm font-medium px-4" style={{ color: '#2A324B' }}>
                Página {currentPage} de {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-full transition-all duration-300 hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#2A324B', color: '#B9E6FF' }}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Gasoek+One&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&display=swap');
        
        .font-gasoek {
          font-family: 'Gasoek One', sans-serif;
        }
        
        .font-geist {
          font-family: 'Geist', sans-serif;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: opacity(0.5);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Registros;