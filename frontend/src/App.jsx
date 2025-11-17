import { BookOpen, Clock } from "lucide-react";
import { useState } from "react";
import logoImage from "./assets/logo.png";
import titleImage from "./assets/title.png";
import HamburgerButton from "./components/menubutton";
import Sidebar from "./components/sidebar_user";
import NorthSpotTabs from "./components/headertabs";
import PoliticaDatos from "./components/datainfo";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(null);
  const currentYear = new Date().getFullYear();
  const [showPolitica, setShowPolitica] = useState(false);

  const handleTabClick = (tabId) => {
    setShowPolitica(false); 
    setActiveTab(tabId); 
    setIsMenuOpen(false); 
  };

  const handleLogoClick = () => {
    setActiveTab(null);
    setShowPolitica(false);
  };

  const handlePoliticaClick = () => {
    setShowPolitica(!showPolitica);
    setActiveTab(null);
    setIsMenuOpen(false);
  };

  // Obtener el título del tab activo
  const getTabTitle = () => {
    switch (activeTab) {
      case "disponibilidad":
        return "Disponibilidad en tiempo real";
      case "tarifas":
        return "Tarifas";
      case "informacion":
        return "Información";
      default:
        return "";
    }
  };

  const getTabSubtitle = () => {
    switch (activeTab) {
      case "disponibilidad":
        return "Encuentra tu espacio sin perder tiempo";
      case "tarifas":
        return "Calcula el valor estimado de tu estadía";
      case "informacion":
        return "Conoce el costo de tu estacionamiento";
      default:
        return "";
    }
  };

  return (
    <div
      className="h-screen bg-cover bg-center bg-no-repeat flex flex-col transition-all duration-1000"
      style={{
        backgroundImage: activeTab
          ? `url(/src/assets/background2.png)`
          : `url(/src/assets/background1.png)`,
      }}
    >
      <header className="fixed top-0 left-0 right-0 flex justify-between items-center p-4 md:p-6 z-50">
        <button onClick={handleLogoClick} className="cursor-pointer">
          <img
            src={logoImage}
            alt="NorthSpot Logo"
            className="w-24 h-24 object-contain hover:scale-105 transition-transform"
          />
        </button>
        <div>
          <HamburgerButton
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            isOpen={isMenuOpen}
          />
          <Sidebar
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            onTabClick={handleTabClick}
            activeTab={activeTab}
            onPoliticaClick={handlePoliticaClick}
            showPolitica={showPolitica}
          />
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-start px-4 pt-32 z-0">
        <div className="mb-2 text-center w-full">
          {/* Hero original - fade out cuando hay tab activo o política */}
          {!activeTab && !showPolitica && (
            <>
              <div className="transition-all duration-700">
                <img
                  src={titleImage}
                  alt="NorthSpot"
                  className="w-[1250px] max-w-full mx-auto -mt-6 md:-mt-10"
                />
              </div>
              <div className="transition-opacity duration-500">
                <p
                  className="font-geist text-gray-800 text-3xl font-light -mt-6 md:-mt-10 drop-shadow-lg"
                  style={{ fontSize: "74.11px" }}
                >
                  NorthSpot: Conduce. Llega. Listo.
                </p>
              </div>
            </>
          )}

          {/* Título cuando hay tab activo */}
          {activeTab && !showPolitica && (
            <div
              className="animate-fade-in mb-8"
              style={{
                opacity: activeTab ? 1 : 0,
                transition: "opacity 0.5s ease-in-out",
              }}
            >
              <h1
                className="font-gasoek text-7xl md:text-7xl mb-4"
                style={{
                  color: "#2A324B",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                {getTabTitle()}
              </h1>
              <p
                className="font-geist text-2xl md:text-5xl"
                style={{
                  color: "#2A324B",
                  fontWeight: 300,
                }}
              >
                {getTabSubtitle()
                  .split(" ")
                  .map((word, index) => (
                    <span
                      key={index}
                      className={
                        word === "tiempo" || word === "estacionamiento"
                          ? "text-[#FF4F79]"
                          : ""
                      }
                    >
                      {word + " "}
                    </span>
                  ))}
              </p>
            </div>
          )}

          {/* Título cuando está la política activa */}
          {showPolitica && (
            <div className="animate-fade-in-smooth mb-2">
              <div
                className="transition-all duration-700"
                style={{
                  transform: "translateY(-40px) scale(0.9)",
                }}
              >
                <img
                  src={titleImage}
                  alt="NorthSpot"
                  className="w-[1250px] max-w-full mx-auto -mt-6 md:-mt-10 mb-2"
                />
              </div>
              <h1
                className="font-geist text-4xl md:text-6xl mb-3 -mt-20"
                style={{
                  color: "#2A324B",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                Política de Tratamiento de Datos Personales
              </h1>
              <div
                className="inline-flex items-center me-[100vh] gap-2 px-4 py-2 rounded-full"
                style={{
                  backgroundColor: "#2A324B",
                  boxShadow: "0 4px 12px rgba(42, 50, 75, 0.3)",
                }}
              >
                <Clock size={16} style={{ color: "#DDE2EC" }} />
                <span
                  className="text-sm font-medium"
                  style={{ color: "#DDE2EC", fontFamily: "Geist, sans-serif" }}
                >
                  Última actualización:{" "}
                  <span style={{ color: "#FF4F79" }}>2025</span>
                </span>
              </div>
            </div>
          )}

          {/* Componente de Tabs - Siempre visible cuando no hay política */}
          {!showPolitica && (
            <NorthSpotTabs activeTab={activeTab} onTabClick={handleTabClick} />
          )}
        </div>
        
        {/* Contenido de Política */}
        {showPolitica && <PoliticaDatos />}
      </main>

      <footer className="absolute bottom-0 left-0 right-0 flex flex-col md:flex-row justify-between items-center px-6 py-4 text-sm z-10">
        <div className="flex items-center gap-2 mb-2 md:mb-0">
          <div className="w-6 h-6 flex items-center justify-center">
            <BookOpen size={32} className="text-[#FF4F79]" />
          </div>
          <a
            onClick={(e) => {
              e.preventDefault();
              handlePoliticaClick();
            }}
            href="#"
            className="text-[#FF4F79] text-lg md:text-xl transition-colors font-geist font-black underline cursor-pointer"
          >
            Política de datos
          </a>
        </div>
        <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 text-center text-[#DDE2EC]">
          <p className="font-geist font-extralight">
            © {currentYear} NorthSpot. Propiedad del{" "}
            <span className="font-extralight text-[#FF4F79]">
              Centro Comercial Plaza Norte
            </span>
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default App;