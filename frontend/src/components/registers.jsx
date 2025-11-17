import React, { useState, useMemo } from 'react';
import { Search, Calendar, ArrowUpDown, RefreshCw, Download, Filter, ChevronLeft, ChevronRight, ArrowUp, ArrowDown } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


const Registros = ({ onNavigate }) => {
  const [searchPlaca, setSearchPlaca] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [ordenamiento, setOrdenamiento] = useState('desc'); // 'asc' o 'desc'
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const itemsPerPage = 8;

  // Datos de ejemplo - en producción vendrían de una API
  const registrosData = [
    { id: 1, hora: '08:15:23', placa: 'ABC-123', nivel: 'P1', tipo: 'Entrada', metodo: 'Lectura automática', tiempo: '-', valor: '-', estado: 'Activo' },
    { id: 2, hora: '08:30:45', placa: 'XYZ-789', nivel: 'P2', tipo: 'Entrada', metodo: 'Lectura automática', tiempo: '-', valor: '-', estado: 'Activo' },
    { id: 3, hora: '09:20:12', placa: 'DEF-456', nivel: 'P1', tipo: 'Entrada', metodo: 'Manual', tiempo: '-', valor: '-', estado: 'Activo' },
    { id: 4, hora: '10:45:30', placa: 'ABC-123', nivel: 'P1', tipo: 'Salida', metodo: 'Lectura automática', tiempo: '2h 30min', valor: '$9,500', estado: 'Pagado' },
    { id: 5, hora: '11:15:50', placa: 'GHI-012', nivel: 'P3', tipo: 'Entrada', metodo: 'Lectura automática', tiempo: '-', valor: '-', estado: 'Activo' },
    { id: 6, hora: '12:00:00', placa: 'JKL-345', nivel: 'P2', tipo: 'Entrada', metodo: 'Lectura automática', tiempo: '-', valor: '-', estado: 'Activo' },
    { id: 7, hora: '12:30:20', placa: 'XYZ-789', nivel: 'P2', tipo: 'Salida', metodo: 'Lectura automática', tiempo: '4h 00min', valor: '$13,000', estado: 'Pagado' },
    { id: 8, hora: '13:45:10', placa: 'MNO-678', nivel: 'P1', tipo: 'Entrada', metodo: 'Manual', tiempo: '-', valor: '-', estado: 'Activo' },
    { id: 9, hora: '14:20:35', placa: 'PQR-901', nivel: 'P3', tipo: 'Entrada', metodo: 'Lectura automática', tiempo: '-', valor: '-', estado: 'Activo' },
    { id: 10, hora: '15:10:48', placa: 'DEF-456', nivel: 'P1', tipo: 'Salida', metodo: 'Manual', tiempo: '5h 50min', valor: '$17,500', estado: 'Pagado' },
    { id: 11, hora: '15:45:22', placa: 'STU-234', nivel: 'P2', tipo: 'Entrada', metodo: 'Lectura automática', tiempo: '-', valor: '-', estado: 'Activo' },
    { id: 12, hora: '16:30:15', placa: 'VWX-567', nivel: 'P1', tipo: 'Entrada', metodo: 'Lectura automática', tiempo: '-', valor: '-', estado: 'Activo' },
    { id: 13, hora: '17:15:40', placa: 'GHI-012', nivel: 'P3', tipo: 'Salida', metodo: 'Lectura automática', tiempo: '6h 00min', valor: '$18,000', estado: 'Pagado' },
    { id: 14, hora: '18:00:05', placa: 'YZA-890', nivel: 'P2', tipo: 'Entrada', metodo: 'Manual', tiempo: '-', valor: '-', estado: 'Activo' },
    { id: 15, hora: '18:45:30', placa: 'JKL-345', nivel: 'P2', tipo: 'Salida', metodo: 'Lectura automática', tiempo: '6h 45min', valor: '$19,500', estado: 'Pendiente' },
    { id: 16, hora: '19:20:12', placa: 'BCD-123', nivel: 'P1', tipo: 'Entrada', metodo: 'Lectura automática', tiempo: '-', valor: '-', estado: 'Activo' },
    { id: 17, hora: '19:50:45', placa: 'MNO-678', nivel: 'P1', tipo: 'Salida', metodo: 'Manual', tiempo: '6h 05min', valor: '$18,250', estado: 'Pagado' },
    { id: 18, hora: '20:15:30', placa: 'EFG-456', nivel: 'P3', tipo: 'Entrada', metodo: 'Lectura automática', tiempo: '-', valor: '-', estado: 'Activo' },
    { id: 19, hora: '20:45:18', placa: 'PQR-901', nivel: 'P3', tipo: 'Salida', metodo: 'Lectura automática', tiempo: '6h 25min', valor: '$18,750', estado: 'Pagado' },
    { id: 20, hora: '21:10:50', placa: 'HIJ-789', nivel: 'P2', tipo: 'Entrada', metodo: 'Manual', tiempo: '-', valor: '-', estado: 'Activo' },
  ];

  // Filtrar y ordenar registros
  const registrosFiltrados = useMemo(() => {
    let filtered = [...registrosData];

    // Filtro por placa
    if (searchPlaca) {
      filtered = filtered.filter(r => 
        r.placa.toLowerCase().includes(searchPlaca.toLowerCase())
      );
    }

    // Ordenamiento por hora
    filtered.sort((a, b) => {
      const timeA = a.hora.split(':').reduce((acc, time) => (60 * acc) + +time, 0);
      const timeB = b.hora.split(':').reduce((acc, time) => (60 * acc) + +time, 0);
      return ordenamiento === 'asc' ? timeA - timeB : timeB - timeA;
    });

    return filtered;
  }, [searchPlaca, fechaInicio, fechaFin, ordenamiento]);

  // Paginación
  const totalPages = Math.ceil(registrosFiltrados.length / itemsPerPage);
  const registrosPaginados = registrosFiltrados.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const handleExport = () => {
  const doc = new jsPDF();

  // Título
  doc.setFontSize(18);
  doc.setTextColor(42, 50, 75);
  doc.text('Registros de Parqueadero - NorthSpot', 14, 20);

  doc.setFontSize(10);
  doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 28);
  doc.text(`Total de registros: ${registrosFiltrados.length}`, 14, 34);

  // Tabla
  const tableData = registrosFiltrados.map(r => [
    r.hora,
    r.placa,
    r.nivel,
    r.tipo,
    r.metodo,
    r.tiempo,
    r.valor,
    r.estado
  ]);

  autoTable(doc, {   // <-- nota el uso de autoTable(doc, {...})
    startY: 40,
    head: [['Hora', 'Placa', 'Nivel', 'Tipo', 'Método', 'Tiempo', 'Valor', 'Estado']],
    body: tableData,
    theme: 'striped',
    headStyles: { fillColor: [42, 50, 75], textColor: [185, 230, 255] },
    alternateRowStyles: { fillColor: [221, 226, 236] },
    styles: { fontSize: 8 }
  });

  doc.save(`Registros_NorthSpot_${new Date().toLocaleDateString()}.pdf`);
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

            <button
              onClick={handleExport}
              className="group flex items-center gap-2 px-4 py-2 rounded-full font-geist text-xs font-medium shadow-md hover:scale-105 transition-all duration-300"
              style={{ backgroundColor: '#FF4F79', color: '#DDE2EC' }}
            >
              <Download size={14} className="group-hover:translate-y-1 transition-transform duration-300" />
              Exportar PDF
            </button>
          </div>
        </div>

        {/* Tabla de registros */}
        <div className="rounded-3xl shadow-lg overflow-hidden transition-all duration-500" style={{ backgroundColor: '#DDE2EC' }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: '#2A324B' }}>
                  <th className="px-4 py-4 text-left font-geist text-sm" style={{ color: '#B9E6FF' }}>Hora</th>
                  <th className="px-4 py-4 text-left font-geist text-sm" style={{ color: '#B9E6FF' }}>Placa</th>
                  <th className="px-4 py-4 text-left font-geist text-sm" style={{ color: '#B9E6FF' }}>Nivel</th>
                  <th className="px-4 py-4 text-left font-geist text-sm" style={{ color: '#B9E6FF' }}>Tipo</th>
                  <th className="px-4 py-4 text-left font-geist text-sm" style={{ color: '#B9E6FF' }}>Método</th>
                  <th className="px-4 py-4 text-left font-geist text-sm" style={{ color: '#B9E6FF' }}>Tiempo</th>
                  <th className="px-4 py-4 text-left font-geist text-sm" style={{ color: '#B9E6FF' }}>Valor</th>
                  <th className="px-4 py-4 text-left font-geist text-sm" style={{ color: '#B9E6FF' }}>Estado</th>
                </tr>
              </thead>
              <tbody>
                {registrosPaginados.map((registro, index) => (
                  <tr 
                    key={registro.id}
                    className="border-b transition-all duration-300 hover:bg-opacity-50"
                    style={{ 
                      borderColor: '#767B91',
                      backgroundColor: index % 2 === 0 ? 'transparent' : 'rgba(118, 123, 145, 0.1)'
                    }}
                  >
                    <td className="px-4 py-4 font-geist text-sm font-semibold" style={{ color: '#2A324B' }}>
                      {registro.hora}
                    </td>
                    <td className="px-4 py-4 font-gasoek text-sm" style={{ color: '#FF4F79' }}>
                      {registro.placa}
                    </td>
                    <td className="px-4 py-4 font-geist text-sm" style={{ color: '#767B91' }}>
                      {registro.nivel}
                    </td>
                    <td className="px-4 py-4">
                      <span 
                        className="px-3 py-1 rounded-full font-geist text-xs font-medium"
                        style={{ 
                          backgroundColor: registro.tipo === 'Entrada' ? '#B9E6FF' : '#FF4F79',
                          color: registro.tipo === 'Entrada' ? '#2A324B' : '#DDE2EC'
                        }}
                      >
                        {registro.tipo}
                      </span>
                    </td>
                    <td className="px-4 py-4 font-geist text-sm" style={{ color: '#767B91' }}>
                      {registro.metodo}
                    </td>
                    <td className="px-4 py-4 font-geist text-sm" style={{ color: '#767B91' }}>
                      {registro.tiempo}
                    </td>
                    <td className="px-4 py-4 font-geist text-sm font-semibold" style={{ color: '#2A324B' }}>
                      {registro.valor}
                    </td>
                    <td className="px-4 py-4">
                      <span 
                        className="px-3 py-1 rounded-full font-geist text-xs font-medium"
                        style={getEstadoBadgeStyle(registro.estado)}
                      >
                        {registro.estado}
                      </span>
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