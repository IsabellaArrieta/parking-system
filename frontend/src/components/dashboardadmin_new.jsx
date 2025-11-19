import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Download, Settings, FileText, CheckCircle, Clock, RefreshCw } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { cupoAPI, tarifaAPI } from '../services/apiService';

const DashboardAdmin = ({ onNavigate }) => {
  const [metricsData, setMetricsData] = useState({
    disponibilidad: { libres: 0, total: 0, porcentaje: 0 },
    ingresos: { hoy: 0, actualizacion: "Cargando..." },
    vehiculosIngresados: { cantidad: 0, periodo: "Entradas hoy" },
    vehiculosSalidos: { cantidad: 0, periodo: "Salidas hoy" }
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 10000); // Actualizar cada 10 segundos
    return () => clearInterval(interval);
  }, []);

  const fetchMetrics = async () => {
    try {
      const cupos = await cupoAPI.getAll();
      const libres = cupos.filter(c => c.estado === "libre").length;
      const total = cupos.length;
      
      setMetricsData({
        disponibilidad: { 
          libres, 
          total, 
          porcentaje: total > 0 ? ((libres / total) * 100).toFixed(1) : 0 
        },
        ingresos: { 
          hoy: Math.floor(Math.random() * 5000000), 
          actualizacion: new Date().toLocaleTimeString() 
        },
        vehiculosIngresados: { cantidad: Math.floor(Math.random() * 500), periodo: "Entradas hoy" },
        vehiculosSalidos: { cantidad: Math.floor(Math.random() * 500), periodo: "Salidas hoy" }
      });
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching metrics:", err);
    } finally {
      setLoading(false);
    }
  };

  const ocupacionData = [
    { hora: '6h', ocupacion: 45 }, { hora: '7h', ocupacion: 120 },
    { hora: '8h', ocupacion: 180 }, { hora: '9h', ocupacion: 240 },
    { hora: '10h', ocupacion: 280 }, { hora: '11h', ocupacion: 310 },
    { hora: '12h', ocupacion: 340 }, { hora: '13h', ocupacion: 335 },
    { hora: '14h', ocupacion: 315 }, { hora: '15h', ocupacion: 290 },
    { hora: '16h', ocupacion: 270 }, { hora: '17h', ocupacion: 250 },
    { hora: '18h', ocupacion: 220 }, { hora: '19h', ocupacion: 180 },
    { hora: '20h', ocupacion: 140 }, { hora: '21h', ocupacion: 100 },
    { hora: '22h', ocupacion: 70 }
  ];

  const pieData = [
    { name: 'Libres', value: metricsData.disponibilidad.libres },
    { name: 'Ocupados', value: metricsData.disponibilidad.total - metricsData.disponibilidad.libres }
  ];

  const COLORS = ['#00C853', '#FF1744'];

  const resumenOperativo = [
    { placa: 'ABC-123', horaSalida: '14:30', duracion: '2h 15min', monto: '$8,500', estado: 'Pagado' },
    { placa: 'XYZ-789', horaSalida: '15:45', duracion: '1h 30min', monto: '$6,000', estado: 'Pagado' },
    { placa: 'DEF-456', horaSalida: '16:20', duracion: '3h 45min', monto: '$12,000', estado: 'Pagado' },
    { placa: 'GHI-012', horaSalida: '17:10', duracion: '4h 20min', monto: '$14,500', estado: 'Pagado' },
    { placa: 'JKL-345', horaSalida: '18:00', duracion: '2h 00min', monto: '$7,500', estado: 'Pendiente' }
  ];

  const exportarPDF = async () => {
    const dashboard = document.getElementById('dashboard-content');
    try {
      const canvas = await html2canvas(dashboard, {
        scale: 2, backgroundColor: '#B9E6FF', logging: false
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Dashboard_NorthSpot_${new Date().toLocaleDateString()}.pdf`);
    } catch (error) {
      console.error('Error al generar PDF:', error);
    }
  };

  if (loading && metricsData.disponibilidad.total === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-8 text-center">
        <p className="text-lg">Cargando dashboard...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-2 -mt-15">
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          Error: {error}
        </div>
      )}

      <div id="dashboard-content" className="space-y-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-gasoek text-6xl mb-1" style={{ color: '#2A324B' }}>
              Dashboard Administrativo
            </h1>
            <p className="font-geist text-xl" style={{ color: '#2A324B' }}>
              Estado general del parqueadero en tiempo real
            </p>
          </div>
          <button
            onClick={fetchMetrics}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <RefreshCw size={20} />
            Actualizar
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-3xl p-6 shadow-lg" style={{ backgroundColor: '#DDE2EC' }}>
            <p className="font-geist text-sm mb-2" style={{ color: '#767B91' }}>Disponibilidad actual</p>
            <p className="font-gasoek text-4xl mb-1" style={{ color: '#FF4F79' }}>
              {metricsData.disponibilidad.libres}/{metricsData.disponibilidad.total}
            </p>
            <p className="font-geist text-xs" style={{ color: '#767B91' }}>Espacios libres ({metricsData.disponibilidad.porcentaje}%)</p>
            <div className="mt-3 px-3 py-1 rounded-full inline-block text-xs font-geist"
              style={{ backgroundColor: '#2A324B', color: '#B9E6FF' }}>
              Actualizado en vivo
            </div>
          </div>

          <div className="rounded-3xl p-6 shadow-lg" style={{ backgroundColor: '#DDE2EC' }}>
            <p className="font-geist text-sm mb-2" style={{ color: '#767B91' }}>Ingresos del día</p>
            <p className="font-gasoek text-4xl mb-1" style={{ color: '#FF4F79' }}>
              ${metricsData.ingresos.hoy.toLocaleString()}
            </p>
            <p className="font-geist text-xs" style={{ color: '#767B91' }}>Ingresos hoy</p>
            <div className="mt-3 px-3 py-1 rounded-full inline-block text-xs font-geist"
              style={{ backgroundColor: '#2A324B', color: '#B9E6FF' }}>
              {metricsData.ingresos.actualizacion}
            </div>
          </div>

          <div className="rounded-3xl p-6 shadow-lg" style={{ backgroundColor: '#DDE2EC' }}>
            <p className="font-geist text-sm mb-2" style={{ color: '#767B91' }}>Vehículos ingresados</p>
            <p className="font-gasoek text-4xl mb-1" style={{ color: '#FF4F79' }}>
              {metricsData.vehiculosIngresados.cantidad}
            </p>
            <p className="font-geist text-xs" style={{ color: '#767B91' }}>
              {metricsData.vehiculosIngresados.periodo}
            </p>
            <div className="mt-3 px-3 py-1 rounded-full inline-block text-xs font-geist"
              style={{ backgroundColor: '#2A324B', color: '#B9E6FF' }}>
              Corte acumulado
            </div>
          </div>

          <div className="rounded-3xl p-6 shadow-lg" style={{ backgroundColor: '#DDE2EC' }}>
            <p className="font-geist text-sm mb-2" style={{ color: '#767B91' }}>Vehículos salidos</p>
            <p className="font-gasoek text-4xl mb-1" style={{ color: '#FF4F79' }}>
              {metricsData.vehiculosSalidos.cantidad}
            </p>
            <p className="font-geist text-xs" style={{ color: '#767B91' }}>
              {metricsData.vehiculosSalidos.periodo}
            </p>
            <div className="mt-3 px-3 py-1 rounded-full inline-block text-xs font-geist"
              style={{ backgroundColor: '#2A324B', color: '#B9E6FF' }}>
              Corte acumulado
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="rounded-3xl p-6 shadow-lg" style={{ backgroundColor: '#DDE2EC' }}>
            <h3 className="font-gasoek text-2xl mb-4" style={{ color: '#2A324B' }}>
              Ocupación del Parqueadero
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-3xl p-6 shadow-lg lg:col-span-2" style={{ backgroundColor: '#DDE2EC' }}>
            <h3 className="font-gasoek text-2xl mb-4" style={{ color: '#2A324B' }}>
              Ocupación por Hora
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ocupacionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hora" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="ocupacion" fill="#FF4F79" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl p-6 shadow-lg" style={{ backgroundColor: '#DDE2EC' }}>
          <h3 className="font-gasoek text-2xl mb-4" style={{ color: '#2A324B' }}>
            Resumen Operativo - Últimas Salidas
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead style={{ backgroundColor: '#2A324B', color: '#B9E6FF' }}>
                <tr>
                  <th className="p-3 text-left">Placa</th>
                  <th className="p-3 text-left">Hora Salida</th>
                  <th className="p-3 text-left">Duración</th>
                  <th className="p-3 text-left">Monto</th>
                  <th className="p-3 text-left">Estado</th>
                </tr>
              </thead>
              <tbody>
                {resumenOperativo.map((item, idx) => (
                  <tr key={idx} className="border-b border-gray-300 hover:bg-white/50">
                    <td className="p-3 font-semibold">{item.placa}</td>
                    <td className="p-3">{item.horaSalida}</td>
                    <td className="p-3">{item.duracion}</td>
                    <td className="p-3 font-semibold">{item.monto}</td>
                    <td className="p-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.estado === 'Pagado' 
                          ? 'bg-green-200 text-green-800' 
                          : 'bg-yellow-200 text-yellow-800'
                      }`}>
                        {item.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={exportarPDF}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white"
            style={{ backgroundColor: '#2A324B' }}
          >
            <Download size={20} />
            Descargar PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
