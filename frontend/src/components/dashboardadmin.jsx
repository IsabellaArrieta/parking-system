import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download, Settings, FileText, CheckCircle, Clock } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const DashboardAdmin = ({ onNavigate }) => {
  const metricsData = {
    disponibilidad: { libres: 124, total: 350, porcentaje: 35.4 },
    ingresos: { hoy: 1250000, actualizacion: "Corte 00:00 - 23:59" },
    vehiculosIngresados: { cantidad: 412, periodo: "Entradas hoy" },
    vehiculosSalidos: { cantidad: 398, periodo: "Salidas hoy" }
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

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-2 -mt-15">
      <div id="dashboard-content" className="space-y-6">
        <div className="text-center mb-8">
          <h1 className="font-gasoek text-6xl mb-1" style={{ color: '#2A324B' }}>
            Dashboard Administrativo
          </h1>
          <p className="font-geist text-xl" style={{ color: '#2A324B' }}>
            Estado general del parqueadero en tiempo real
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-3xl p-6 shadow-lg" style={{ backgroundColor: '#DDE2EC' }}>
            <p className="font-geist text-sm mb-2" style={{ color: '#767B91' }}>Disponibilidad actual</p>
            <p className="font-gasoek text-4xl mb-1" style={{ color: '#FF4F79' }}>
              {metricsData.disponibilidad.libres}/{metricsData.disponibilidad.total}
            </p>
            <p className="font-geist text-xs" style={{ color: '#767B91' }}>Espacios libres</p>
            <div className="mt-3 px-3 py-1 rounded-full inline-block text-xs font-geist"
              style={{ backgroundColor: '#2A324B', color: '#B9E6FF' }}>
              Actualizado hace 3 min/5seg
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
              Corte acumulado del día
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
              Corte acumulado del día
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-3xl p-6 shadow-lg" style={{ backgroundColor: '#DDE2EC' }}>
            <h2 className="font-gasoek text-2xl mb-4" style={{ color: '#2A324B' }}>
              Ocupación del Día
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ocupacionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#767B91" opacity={0.3} />
                <XAxis dataKey="hora" stroke="#767B91" style={{ fontFamily: 'Geist', fontSize: '12px' }} />
                <YAxis stroke="#767B91" style={{ fontFamily: 'Geist', fontSize: '12px' }} />
                <Tooltip contentStyle={{ backgroundColor: '#2A324B', border: 'none', borderRadius: '12px', fontFamily: 'Geist', color: '#B9E6FF' }} />
                <Bar dataKey="ocupacion" fill="#B9E6FF" radius={[8, 8, 0, 0]} activeBar={{ fill: '#FF4F79' }} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-3xl p-6 shadow-lg" style={{ backgroundColor: '#DDE2EC' }}>
            <h2 className="font-gasoek text-2xl mb-4" style={{ color: '#2A324B' }}>Resumen Operativo</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ backgroundColor: '#2A324B' }}>
                    <th className="px-4 py-3 text-left font-geist text-sm rounded-tl-xl" style={{ color: '#B9E6FF' }}>Placa</th>
                    <th className="px-4 py-3 text-left font-geist text-sm" style={{ color: '#B9E6FF' }}>Hora Salida</th>
                    <th className="px-4 py-3 text-left font-geist text-sm" style={{ color: '#B9E6FF' }}>Duración</th>
                    <th className="px-4 py-3 text-left font-geist text-sm" style={{ color: '#B9E6FF' }}>Monto</th>
                    <th className="px-4 py-3 text-left font-geist text-sm rounded-tr-xl" style={{ color: '#B9E6FF' }}>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {resumenOperativo.map((item, index) => (
                    <tr key={index} className="border-b" style={{ borderColor: '#767B91' }}>
                      <td className="px-4 py-3 font-geist text-sm font-semibold" style={{ color: '#2A324B' }}>{item.placa}</td>
                      <td className="px-4 py-3 font-geist text-sm" style={{ color: '#767B91' }}>{item.horaSalida}</td>
                      <td className="px-4 py-3 font-geist text-sm" style={{ color: '#767B91' }}>{item.duracion}</td>
                      <td className="px-4 py-3 font-geist text-sm font-semibold" style={{ color: '#2A324B' }}>{item.monto}</td>
                      <td className="px-4 py-3">
                        <span className="px-3 py-1 rounded-full font-geist text-xs font-medium inline-flex items-center gap-1"
                          style={{ backgroundColor: item.estado === 'Pagado' ? '#B9E6FF' : '#FF4F79', color: item.estado === 'Pagado' ? '#2A324B' : '#DDE2EC' }}>
                          {item.estado === 'Pagado' ? <CheckCircle size={14} /> : <Clock size={14} />}
                          {item.estado}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-center mt-8">
        <button onClick={() => onNavigate('gestion-tarifas')}
          className="group flex items-center gap-3 px-8 py-4 rounded-full font-gasoek text-2xl shadow-lg hover:scale-105 transition-all duration-300"
          style={{ backgroundColor: '#2A324B', color: '#B9E6FF' }}>
          <Settings size={32} className="group-hover:rotate-90 transition-transform duration-300" />
          Gestionar Tarifas
        </button>

        <button onClick={exportarPDF}
          className="group flex items-center gap-3 px-8 py-4 rounded-full font-gasoek text-2xl shadow-lg hover:scale-105 transition-all duration-300"
          style={{ backgroundColor: '#FF4F79', color: '#DDE2EC' }}>
          <Download size={32} className="group-hover:translate-y-1 transition-transform duration-300" />
          Exportar Resumen
        </button>

        <button onClick={() => onNavigate('registros')}
          className="group flex items-center gap-3 px-8 py-4 rounded-full font-gasoek text-2xl shadow-lg hover:scale-105 transition-all duration-300"
          style={{ backgroundColor: '#2A324B', color: '#B9E6FF' }}>
          <FileText size={32} className="group-hover:scale-110 transition-transform duration-300" />
          Ver Registros
        </button>
      </div>
    </div>
  );
};

export default DashboardAdmin;