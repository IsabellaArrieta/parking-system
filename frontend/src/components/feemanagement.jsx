import { useState } from "react";
import { Edit2, Save, X, Clock, SunMoon, Bike, Car } from "lucide-react";

export default function GestionTarifas() {
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);

  const [tarifas, setTarifas] = useState({
    minuto: { moto: 50, carro: 100 },
    hora: { moto: 3000, carro: 6000 },
    quince: { moto: 750, carro: 1500 },
    dia: { moto: 10000, carro: 25000 },
  });

  const [tarifasTemp, setTarifasTemp] = useState({ ...tarifas });

  const filtros = [
    { icon:<Clock size={24} /> ,id: "minuto", label: "Minuto" },
    { icon:<Clock size={24} />, id: "hora", label: "Hora" },
    { icon:<Clock size={24} />, id: "quince", label: "15 Minutos" },
    { icon:<SunMoon size={24} />, id: "dia", label: "Día Completo" },
    { icon:<Bike size={24} />, id: "moto", label: "Moto" },
    { icon:<Car size={24} />, id: "carro", label: "Carro" },
  ];

  const getTarifasFiltradas = () => {
    if (!filtroActivo) return tarifas;

    if (filtroActivo === "moto" || filtroActivo === "carro") {
      return {
        minuto: { [filtroActivo]: tarifas.minuto[filtroActivo] },
        hora: { [filtroActivo]: tarifas.hora[filtroActivo] },
        quince: { [filtroActivo]: tarifas.quince[filtroActivo] },
        dia: { [filtroActivo]: tarifas.dia[filtroActivo] },
      };
    }

    return {
      [filtroActivo]: tarifas[filtroActivo],
    };
  };

  const handleIniciarEdicion = () => {
    setTarifasTemp({ ...tarifas });
    setModoEdicion(true);
  };

  const handleGuardarCambios = () => {
    setTarifas({ ...tarifasTemp });
    setModoEdicion(false);
  };

  const handleCancelarEdicion = () => {
    setTarifasTemp({ ...tarifas });
    setModoEdicion(false);
  };

  const handleCambioTarifa = (periodo, tipo, valor) => {
    const valorNumerico = parseInt(valor) || 0;
    setTarifasTemp((prev) => ({
      ...prev,
      [periodo]: {
        ...prev[periodo],
        [tipo]: valorNumerico,
      },
    }));
  };

  const tarifasFiltradas = getTarifasFiltradas();

  return (
    <div className="min-h-screen flex items-center justify-center p-8 -mt-50 transition-colors duration-700">
      <div
        className="w-full max-w-6xl animate-fade-in-up"
        style={{ animationDelay: "0.1s" }}
      >
        <div className="text-center mb-8">
          <h1
            className="font-gasoek  animate-fade-in transform transition-all duration-700 text-6xl mb-1"
            style={{ color: "#2A324B" }}
          >
            Gestión de Tarifas
          </h1>
          <p className="text-xl animate-fade-in transition-all duration-300 foint-geist text-[2A324B] font-light">
            Administra los <span style={{ color: "#FF4F79" }}>precios</span> y{" "}
            <span style={{ color: "#FF4F79" }}>promociones</span>
          </p>
        </div>
        {/* Tarjeta principal */}
        <div
          className="rounded-3xl p-8 shadow-lg animate-scale-in transition-all duration-500 hover:shadow-2xl"
          style={{ backgroundColor: "#DDE2EC" }}
        >
            {/* Filtros */}
            <div
            className="mb-8 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
            >
            <h2 className="text-2xl transition-colors duration-300 font-gasoek mb-4 text-[#2A324B]">
                Filtros
            </h2>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setFiltroActivo(null)}
                className={`px-6 py-3 rounded-full transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 hover:shadow-xl flex items-center gap-2 ${
                  filtroActivo === null ? "shadow-lg animate-pulse-soft" : ""
                }`}
                style={{
                  fontFamily: "Geist",
                  fontWeight: 600,
                  backgroundColor:
                    filtroActivo === null ? "#FF4F79" : "#2A324B",
                  color: filtroActivo === null ? "#DDE2EC" : "#B9E6FF",
                }}
              >
                Todos
              </button>
              {filtros.map((filtro) => (
                <button
                  key={filtro.id}
                  onClick={() => setFiltroActivo(filtro.id)}
                  className={`px-6 py-3 rounded-full transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 hover:shadow-xl flex items-center gap-2 animate-fade-in-right ${
                    filtroActivo === filtro.id
                      ? "shadow-lg animate-pulse-soft"
                      : ""
                  }`}
                  style={{
                    fontFamily: "Geist",
                    fontWeight: 600,
                    backgroundColor:
                      filtroActivo === filtro.id ? "#FF4F79" : "#2A324B",
                    color: filtroActivo === filtro.id ? "#DDE2EC" : "#B9E6FF",
                  }}
                >
                    <span className={`transition-colors duration-300`}>
                      {filtro.icon}
                    </span>
                  {filtro.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tabla de tarifas */}
          <div className="mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-2xl mb-4 font-gasoek text-[#2A324B]">
              Tarifas Actuales
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ backgroundColor: "#2A324B" }}>
                    <th
                      className="px-6 py-4 text-left text-sm rounded-tl-xl"
                      style={{ fontFamily: "Geist", color: "#B9E6FF" }}
                    >
                      Período
                    </th>
                    <th
                      className="px-6 py-4 text-left text-sm"
                      style={{ fontFamily: "Geist", color: "#B9E6FF" }}
                    >
                      Moto
                    </th>
                    <th
                      className="px-6 py-4 text-left text-sm rounded-tr-xl"
                      style={{ fontFamily: "Geist", color: "#B9E6FF" }}
                    >
                      Carro
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(tarifasFiltradas).map(
                    ([periodo, valores]) => {
                      const nombrePeriodo =
                        {
                          minuto: "Por Minuto",
                          hora: "Por Hora",
                          quince: "15 Minutos",
                          dia: "Día Completo",
                        }[periodo] || periodo;
                      return (
                        <tr
                          key={periodo}
                          className="border-b"
                          style={{ borderColor: "#767B91" }}
                        >
                          <td
                            className="px-6 py-4 text-sm font-semibold"
                            style={{ fontFamily: "Geist", color: "#2A324B" }}
                          >
                            {nombrePeriodo}
                          </td>
                          {valores.moto !== undefined && (
                            <td className="px-6 py-4">
                              {modoEdicion ? (
                                <input
                                  type="number"
                                  value={tarifasTemp[periodo].moto}
                                  onChange={(e) =>
                                    handleCambioTarifa(
                                      periodo,
                                      "moto",
                                      e.target.value
                                    )
                                  }
                                  className="px-4 py-2 rounded-lg border-2 w-full"
                                  style={{
                                    fontFamily: "Geist",
                                    backgroundColor: "#B9E6FF",
                                    borderColor: "#2A324B",
                                    color: "#2A324B",
                                    fontWeight: 600,
                                  }}
                                />
                              ) : (
                                <span
                                  className="text-sm font-semibold"
                                  style={{
                                    fontFamily: "Geist",
                                    color: "#FF4F79",
                                  }}
                                >
                                  ${valores.moto.toLocaleString()}
                                </span>
                              )}
                            </td>
                          )}
                          {valores.carro !== undefined && (
                            <td className="px-6 py-4">
                              {modoEdicion ? (
                                <input
                                  type="number"
                                  value={tarifasTemp[periodo].carro}
                                  onChange={(e) =>
                                    handleCambioTarifa(
                                      periodo,
                                      "carro",
                                      e.target.value
                                    )
                                  }
                                  className="px-4 py-2 rounded-lg border-2 w-full"
                                  style={{
                                    fontFamily: "Geist",
                                    backgroundColor: "#B9E6FF",
                                    borderColor: "#2A324B",
                                    color: "#2A324B",
                                    fontWeight: 600,
                                  }}
                                />
                              ) : (
                                <span
                                  className="text-sm font-semibold"
                                  style={{
                                    fontFamily: "Geist",
                                    color: "#FF4F79",
                                  }}
                                >
                                  ${valores.carro.toLocaleString()}
                                </span>
                              )}
                            </td>
                          )}
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-4 justify-end">
            {!modoEdicion ? (
              <button
                onClick={handleIniciarEdicion}
                className="group flex items-center gap-3 px-8 py-4 rounded-full shadow-lg hover:scale-105 transition-all duration-300 font-gasoek"
                style={{
                  fontSize: "1.5rem",
                  backgroundColor: "#2A324B",
                  color: "#B9E6FF",
                }}
              >
                <Edit2
                  size={28}
                  className="group-hover:rotate-12 transition-transform duration-300"
                />
                Editar Tarifas
              </button>
            ) : (
              <>
                <button
                  onClick={handleCancelarEdicion}
                  className="group flex items-center gap-3 px-8 py-4 rounded-full shadow-lg hover:scale-105 transition-all duration-300 font-gasoek"
                  style={{
                    fontSize: "1.5rem",
                    backgroundColor: "#767B91",
                    color: "#DDE2EC",
                  }}
                >
                  <X
                    size={28}
                    className="group-hover:rotate-90 transition-transform duration-300"
                  />
                  Cancelar
                </button>
                <button
                  onClick={handleGuardarCambios}
                  className="group flex items-center gap-3 px-8 py-4 rounded-full shadow-lg hover:scale-105 transition-all duration-300 font-gasoek"
                  style={{
                    fontSize: "1.5rem",
                    backgroundColor: "#FF4F79",
                    color: "#DDE2EC",
                  }}
                >
                  <Save
                    size={28}
                    className="group-hover:scale-110 transition-transform duration-300"
                  />
                  Guardar Cambios
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
