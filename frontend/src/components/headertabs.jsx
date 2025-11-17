import React, { useState } from 'react';
import { 
  Car, 
  DollarSign, 
  Info, 
  ParkingCircle, 
  RefreshCw, 
  Clock,
  Bike,
  Sun,
  Plus,
  Calendar
} from 'lucide-react';

// Componente de Carta Reutilizable
const Card = ({ children, className = '' }) => (
  <div 
    className={`bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg ${className}`}
    style={{ borderRight: '10px solid #C7D4FF' }}
  >
    {children}
  </div>
);
// TAB 1: Disponibilidad
const DisponibilidadTab = () => {
  const [lastUpdate, setLastUpdate] = useState('3 minutos');
  
  const handleRefresh = () => {
    setLastUpdate('ahora');
    setTimeout(() => setLastUpdate('1 minuto'), 1000);
  };

  // Datos de niveles
  const niveles = [
    { nivel: 1, espacios: 52 },
    { nivel: 2, espacios: 23 },
    { nivel: 3, espacios: 49 }
  ];

  // Calcular total de espacios
  const totalEspacios = niveles.reduce((acc, nivel) => acc + nivel.espacios, 0);

  // Función para determinar estado y color
  const getEstado = (espacios) => {
    if (espacios === 0) {
      return { texto: 'No Disponible', color: '#C38686' };
    } else if (espacios < 30) {
      return { texto: 'Poco Disponible', color: '#C3AC86' };
    } else {
      return { texto: 'Disponible', color: '#86C3AB' };
    }
  };

  const estadoGeneral = getEstado(totalEspacios);

  return (
    <div className="flex flex-col items-center gap-2 animate-fade-in w-full max-w-6xl mx-auto">
      {/* Carta Principal - Estado General */}
      <Card 
        className="w-full max-w-3xl flex rounded-[80px] items-center gap-8 p-6" 
        style={{ backgroundColor: 'rgba(255,255,255,1)' }}
      >
        {/* Ícono grande con color dinámico */}
        <div 
          className="rounded-full p-8 flex items-center justify-center"
          style={{ backgroundColor: '#2A324B' }}
        >
          <ParkingCircle size={80} style={{ color: estadoGeneral.color }} strokeWidth={2} />
        </div>

        {/* Texto principal */}
        <div className="flex-1 flex flex-col items-start text-left">
          <h2 
            className="text-5xl font-bold mb-2"
            style={{ fontFamily: 'Geist, sans-serif', color: '#2A324B' }}
          >
            Parqueadero {estadoGeneral.texto}
          </h2>
          <div className="flex items-baseline gap-3 justify-start">
            <span 
              className="text-6xl font-bold" 
              style={{ color: '#FF4F79', fontFamily: 'Geist, sans-serif' }}
            >
              {totalEspacios}
            </span>
            <span 
              className="text-2xl font-light" 
              style={{ fontFamily: 'Geist, sans-serif', fontWeight: 300, color: '#767B91' }}
            >
              espacios en total
            </span>
          </div>
        </div>
      </Card>

      {/* Carta de Niveles - Layout Horizontal */}
      <Card 
        className="w-full max-w-3xl rounded-[40px] p-6 shadow-xl"
        style={{ backgroundColor: 'rgba(255, 255, 255, 1)' }}
      >
        <div className="flex justify-around items-center gap-8">
          {niveles.map((nivel) => {
            const estado = getEstado(nivel.espacios);
            
            return (
              <div key={nivel.nivel} className="flex items-center gap-4">
                {/* Ícono del nivel con color dinámico */}
                <div 
                  className="rounded-full p-4 flex items-center justify-center"
                  style={{ backgroundColor: '#2A324B' }}
                >
                  <Car size={52} style={{ color: estado.color }} strokeWidth={2} />
                </div>

                {/* Info del nivel */}
                <div className="text-left">
                  <p 
                    className="text-lg font-semibold" 
                    style={{ fontFamily: 'Geist, sans-serif', fontSize: '30px', color: '#2A324B' }}
                  >
                    Nivel {nivel.nivel}:
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span 
                      className="text-3xl font-bold" 
                      style={{ fontFamily: 'Geist, sans-serif', fontSize: '40px', color: '#2A324B' }}
                    >
                      {nivel.espacios}
                    </span>
                    <span 
                      className="text-sm font-light" 
                      style={{ fontFamily: 'Geist, sans-serif', fontSize: '20px', color: '#767B91' }}
                    >
                      libres
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Botón Refrescar y última actualización */}
      <div className="flex justify-center items-center gap-4 mt-2">
        <button
          onClick={handleRefresh}
          className="flex items-center gap-3 px-8 py-3 rounded-full hover:opacity-90 transition-all hover:scale-105"
          style={{ 
            backgroundColor: '#2A324B',
            color: '#DDE2EC',
            fontFamily: 'Gasoek-One, sans-serif',
            fontSize: '32px',
            boxShadow: '0 4px 12px rgba(42, 50, 75, 0.3)'
          }}
        >
          <RefreshCw size={32} />
          Refrescar
        </button>

        <div 
          className="flex items-center gap-2 px-6 py-3 rounded-full" 
          style={{ backgroundColor: '#2A324B', color: '#DDE2EC' }}
        >
          <Clock size={20} />
          <span style={{ fontFamily: 'Geist, sans-serif', fontWeight: 400, fontSize: '16px' }}>
            Última actualización: <span className="font-semibold text-[#FF4F79]">hace {lastUpdate}</span>
          </span>
        </div>
      </div>
    </div>
  );
};
// TAB 2: Tarifas (Calculadora mejorada)
const TarifasTab = () => {
  const [fechaEntrada, setFechaEntrada] = useState('');
  const [horaEntrada, setHoraEntrada] = useState('');
  const [fechaSalida, setFechaSalida] = useState('');
  const [horaSalida, setHoraSalida] = useState('');
  const [tipoVehiculo, setTipoVehiculo] = useState('carro');
  const [resultado, setResultado] = useState(null);

  const calcularTarifa = () => {
    if (!fechaEntrada || !horaEntrada || !fechaSalida || !horaSalida) {
      alert('Por favor completa todos los campos');
      return;
    }
    
    const entrada = new Date(`${fechaEntrada}T${horaEntrada}`);
    const salida = new Date(`${fechaSalida}T${horaSalida}`);
    
    if (salida <= entrada) {
      alert('La fecha/hora de salida debe ser posterior a la de entrada');
      return;
    }
    
    const diferenciaMs = salida - entrada;
    const horas = Math.ceil(diferenciaMs / (1000 * 60 * 60));
    const dias = Math.floor(horas / 24);
    const horasRestantes = horas % 24;
    
    let total = 0;
    let desglose = [];
    
    // Tarifas según tipo de vehículo
    const tarifas = tipoVehiculo === 'carro' 
      ? { primeraHora: 6000, horaAdicional: 3000, diaCompleto: 25000 }
      : { primeraHora: 3000, horaAdicional: 2000, diaCompleto: 10000 };
    
    // Calcular días completos
    if (dias > 0) {
      total += dias * tarifas.diaCompleto;
      desglose.push(`${dias} día(s) completo(s): $${(dias * tarifas.diaCompleto).toLocaleString('es-CO')}`);
    }
    
    // Calcular horas restantes
    if (horasRestantes > 0) {
      // Primera hora
      total += tarifas.primeraHora;
      desglose.push(`Primera hora: $${tarifas.primeraHora.toLocaleString('es-CO')}`);
      
      // Horas adicionales
      if (horasRestantes > 1) {
        const costoAdicionales = (horasRestantes - 1) * tarifas.horaAdicional;
        total += costoAdicionales;
        desglose.push(`${horasRestantes - 1} hora(s) adicional(es): $${costoAdicionales.toLocaleString('es-CO')}`);
      }
    }
    
    setResultado({ total, desglose, horas, dias });
  };

  return (
    <div className="flex gap-6 justify-center items-center animate-fade-in w-full max-w-7xl mx-auto relative">
      {/* Formulario - Se mueve a la izquierda cuando hay resultado */}
      <div 
        className="transition-all duration-700 ease-in-out"

      >
        <Card>
          <h3 
            className="text-4xl font-semibold text-center mb-6" 
            style={{ fontFamily: 'Geist, sans-serif', color: '#2A324B' }}
          >
            Calculadora de Tarifas
          </h3>

          <div className="space-y-4">
            {/* Tipo de vehículo */}
            <div className="space-y-2">
              <label className="block text-base font-medium" style={{ fontFamily: 'Geist, sans-serif', color: '#2A324B' }}>
                Tipo de vehículo:
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() => setTipoVehiculo('carro')}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-medium transition-all"
                  style={{
                    backgroundColor: tipoVehiculo === 'carro' ? '#FF4F79' : '#E8F4F8',
                    color: tipoVehiculo === 'carro' ? '#DDE2EC' : '#2A324B',
                    fontFamily: 'Geist, sans-serif'
                  }}
                >
                  <Car size={18} />
                  Carro
                </button>
                <button
                  onClick={() => setTipoVehiculo('moto')}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-medium transition-all"
                  style={{
                    backgroundColor: tipoVehiculo === 'moto' ? '#FF4F79' : '#E8F4F8',
                    color: tipoVehiculo === 'moto' ? '#DDE2EC' : '#2A324B',
                    fontFamily: 'Geist, sans-serif'
                  }}
                >
                  <Bike size={18} />
                  Moto
                </button>
              </div>
            </div>

            {/* Entrada */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm" style={{ fontFamily: 'Geist, sans-serif', color: '#2A324B' }}>
                  <Calendar size={18} className="text-teal-500" />
                  Fecha entrada
                </label>
                <input
                  type="date"
                  value={fechaEntrada}
                  onChange={(e) => setFechaEntrada(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200"
                  style={{ 
                    backgroundColor: '#E8F4F8',
                    fontFamily: 'Geist, sans-serif',
                    color: '#2A324B',
                    fontSize: '14px'
                  }}
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm" style={{ fontFamily: 'Geist, sans-serif', color: '#2A324B' }}>
                  <Clock size={18} className="text-teal-500" />
                  Hora entrada
                </label>
                <input
                  type="time"
                  value={horaEntrada}
                  onChange={(e) => setHoraEntrada(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200"
                  style={{ 
                    backgroundColor: '#E8F4F8',
                    fontFamily: 'Geist, sans-serif',
                    color: '#2A324B',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>

            {/* Salida */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm" style={{ fontFamily: 'Geist, sans-serif', color: '#2A324B' }}>
                  <Calendar size={18} style={{ color: '#FF4F79' }} />
                  Fecha salida
                </label>
                <input
                  type="date"
                  value={fechaSalida}
                  onChange={(e) => setFechaSalida(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200"
                  style={{ 
                    backgroundColor: '#E8F4F8',
                    fontFamily: 'Geist, sans-serif',
                    color: '#2A324B',
                    fontSize: '14px'
                  }}
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm" style={{ fontFamily: 'Geist, sans-serif', color: '#2A324B' }}>
                  <Clock size={18} style={{ color: '#FF4F79' }} />
                  Hora salida
                </label>
                <input
                  type="time"
                  value={horaSalida}
                  onChange={(e) => setHoraSalida(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200"
                  style={{ 
                    backgroundColor: '#E8F4F8',
                    fontFamily: 'Geist, sans-serif',
                    color: '#2A324B',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>

            {/* Botón calcular */}
            <button
              onClick={calcularTarifa}
              className="w-full py-3 rounded-2xl hover:opacity-90 transition-opacity mt-4"
              style={{ 
                backgroundColor: '#2A324B',
                color: '#DDE2EC',
                fontFamily: 'Gasoek-One, sans-serif',
                fontSize: '24px'
              }}
            >
              Calcular
            </button>
          </div>
        </Card>
      </div>

      {/* Resultado - Aparece desde la derecha */}
      <div 
        className="transition-all duration-700 ease-in-out"
        style={{ 
          maxWidth: '600px',
          opacity: resultado ? 1 : 0,
          transform: resultado ? 'translateX(0) scale(1)' : 'translateX(100px) scale(0.95)',
          pointerEvents: resultado ? 'auto' : 'none'
        }}
      >
        {resultado && (
          <Card className="h-full">
            <div className="flex flex-col h-full justify-between">
              {/* Título del resultado */}
              <div className="text-center mb-6">
                <h3 
                  className="text-2xl font-semibold mb-4" 
                  style={{ fontFamily: 'Geist, sans-serif', color: '#2A324B' }}
                >
                  Resultado
                </h3>
                <p className="text-base mb-3" style={{ fontFamily: 'Geist, sans-serif', color: '#767B91' }}>
                  Tiempo total: {resultado.dias > 0 && `${resultado.dias} día(s) y `}{resultado.horas % 24} hora(s)
                </p>
                
                {/* Total grande */}
                <div className="py-6 px-4 rounded-2xl" style={{ backgroundColor: '#E8F4F8' }}>
                  <p className="text-sm mb-2" style={{ fontFamily: 'Geist, sans-serif', color: '#767B91' }}>
                    Total a pagar:
                  </p>
                  <p className="text-5xl font-bold" style={{ color: '#FF4F79', fontFamily: 'Geist, sans-serif' }}>
                    ${resultado.total.toLocaleString('es-CO')}
                  </p>
                </div>
              </div>

              {/* Desglose */}
              <div className="space-y-2 pt-4 border-t-2 border-gray-200">
                <p className="text-sm font-semibold mb-3" style={{ fontFamily: 'Geist, sans-serif', color: '#2A324B' }}>
                  Desglose detallado:
                </p>
                {resultado.desglose.map((linea, i) => (
                  <div 
                    key={i} 
                    className="flex items-start gap-2 animate-fade-in"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <span style={{ color: '#FF4F79', fontSize: '16px' }}>•</span>
                    <p className="text-sm" style={{ fontFamily: 'Geist, sans-serif', color: '#2A324B' }}>
                      {linea}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
// TAB 3: Información
const InformacionTab = () => {
  const tarifas = [
    {
      titulo: '1',
      tipo: 'number',
      carro: '6.000',
      moto: '3.000',
      subtitulo: 'Primera hora'
    },
    {
      titulo: '+',
      tipo: 'plus',
      carro: '3.000',
      moto: '2.000',
      subtitulo: 'Horas adicionales'
    },
    {
      titulo: 'sun',
      tipo: 'sun',
      carro: '25.000',
      moto: '10.000',
      subtitulo: 'Tarifa día completo'
    }
  ];

  return (
    <div className="flex flex-col gap-3 items-center animate-fade-in w-full max-w-7xl mx-auto">
      {/* Cartas de Tarifas */}
      <div className="flex gap-6 justify-center items-stretch w-full">
        {tarifas.map((tarifa, index) => (
          <Card 
            key={index} 
            className="flex-1 flex flex-col items-center justify-between p-5"
            style={{ minWidth: '280px', maxWidth: '380px' }}
          >
            {/* Ícono circular arriba */}
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center mb-3"
              style={{ backgroundColor: '#2A324B' }}
            >
              {tarifa.tipo === 'number' && (
                <span className="text-4xl font-bold" style={{ fontFamily: 'Geist, sans-serif', color: '#DDE2EC' }}>
                  {tarifa.titulo}
                </span>
              )}
              {tarifa.tipo === 'plus' && (
                <Plus size={40} style={{ color: '#DDE2EC' }} strokeWidth={3} />
              )}
              {tarifa.tipo === 'sun' && (
                <Sun size={40} style={{ color: '#DDE2EC' }} strokeWidth={2} />
              )}
            </div>

            {/* Subtítulo */}
            <h4 
              className="text-lg font-semibold mb-3 text-center" 
              style={{ fontFamily: 'Geist, sans-serif', color: '#2A324B' }}
            >
              {tarifa.subtitulo}
            </h4>

            {/* Precios - Verticales */}
            <div className="flex flex-col gap-3 w-full">
              {/* Carro */}
              <div className="flex items-center justify-between gap-3 p-2 rounded-xl" style={{ backgroundColor: '#F5F5F5' }}>
                <div className="flex items-center gap-2">
                  <Car size={24} style={{ color: '#2A324B' }} />
                  <span className="text-sm font-medium" style={{ fontFamily: 'Geist, sans-serif', color: '#767B91' }}>
                    Carro
                  </span>
                </div>
                <span 
                  className="text-xl font-bold" 
                  style={{ fontFamily: 'Geist, sans-serif', color: '#2A324B' }}
                >
                  ${tarifa.carro}
                </span>
              </div>

              {/* Moto */}
              <div className="flex items-center justify-between gap-3 p-2 rounded-xl" style={{ backgroundColor: '#F5F5F5' }}>
                <div className="flex items-center gap-2">
                  <Bike size={24} style={{ color: '#2A324B' }} />
                  <span className="text-sm font-medium" style={{ fontFamily: 'Geist, sans-serif', color: '#767B91' }}>
                    Moto
                  </span>
                </div>
                <span 
                  className="text-xl font-bold" 
                  style={{ fontFamily: 'Geist, sans-serif', color: '#2A324B' }}
                >
                  ${tarifa.moto}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Créditos - */}
      <div 
        className="w-full max-w-3xl p-4 mt-9 rounded-2xl text-center"
        style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(10px)',
          border: '2px solid #C7D4FF'
        }}
      >
        <h4 
          className="text-base font-semibold mb-2" 
          style={{ fontFamily: 'Geist, sans-serif', color: '#2A324B' }}
        >
          Proyecto desarrollado por:
        </h4>
        
        <div className="space-y-0.5 mb-2">
          <p 
            className="text-sm font-medium" 
            style={{ fontFamily: 'Geist, sans-serif', color: '#767B91' }}
          >
            Isabella Sofía Arrieta Guardo
          </p>
          <p 
            className="text-sm font-medium" 
            style={{ fontFamily: 'Geist, sans-serif', color: '#767B91' }}
          >
            José Fernando González Ortiz
          </p>
          <p 
            className="text-sm font-medium" 
            style={{ fontFamily: 'Geist, sans-serif', color: '#767B91' }}
          >
            Julio De Jesus Denubila Vergara
          </p>
        </div>

        <p 
          className="text-xs font-light italic" 
          style={{ fontFamily: 'Geist, sans-serif', color: '#2A324B' }}
        >
          Estudiantes de la Universidad Tecnológica de Bolívar
        </p>
      </div>
    </div>
  );
};
// Componente Principal con Tabs
const NorthSpotTabs = ({ activeTab, onTabClick }) => {
  const tabs = [
    { id: 'disponibilidad', label: 'Disponibilidad en tiempo real', icon: Car },
    { id: 'tarifas', label: 'Tarifas', icon: DollarSign },
    { id: 'informacion', label: 'Información', icon: Info }
  ];
 
  return (
    <div
      className="p-2 transition-all duration-500 z-10"
      style={{
      marginTop: activeTab ? '-1.5rem' : '0'  // Sube solo cuando hay tab activo
      }}>
      {/* Botones de navegación */}
      <div className="flex justify-center gap-12 mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
          
          return (
              <button
                key={tab.id}
                onClick={() => onTabClick(tab.id)} // aquí se llama al handler del App
                className="flex items-center gap-4 px-3 py-1.5 rounded-full transition-all hover:scale-105"
                style={{
                  backgroundColor: isActive ? '#FF4F79' : '#767B91',
                  color: '#E1E5EE',
                  fontFamily: 'Geist, sans-serif',
                  fontSize: '28px',
                  fontWeight: '200',
                  boxShadow: isActive ? '0 4px 12px rgba(255, 79, 121, 0.3)' : 'none'
                }}
              >
                <div 
                  className="w-16 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#FF4F79' }}
                >
                  <Icon size={38} style={{ color: '#2A324B' }} />
                </div>
                <span className='-ml-3'>{tab.label}</span>
              </button>
            );
          })}
      </div>

      {/* Contenido de tabs con fade in */}
      <div className="tab-content">
        {activeTab === 'disponibilidad' && <DisponibilidadTab />}
        {activeTab === 'tarifas' && <TarifasTab />}
        {activeTab === 'informacion' && <InformacionTab />}
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default NorthSpotTabs;