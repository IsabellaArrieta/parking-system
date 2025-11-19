import { BookOpen, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import logoImage from "./assets/logo.png";
import titleImage from "./assets/title.png";
import HamburgerButton from "./components/menubutton";
import Sidebar from "./components/sidebar_user";
import SidebarAdmin from "./components/sidebar_admin";
import NorthSpotTabs from "./components/headertabs";
import PoliticaDatos from "./components/datainfo";
import LoginModal from "./components/sesiontab";
import DashboardAdmin from "./components/dashboardadmin";
import GestionTarifas from './components/feemanagement';
import Registros from './components/registers';
import ParkingAvailability from './components/parkingavailability';
import TarifasComponent from './components/tarifas';
import VehicleRegistration from './components/vehicleregistration';
import TarifasAdmin from './components/tarifas_admin';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(null);
  const currentYear = new Date().getFullYear();
  const [showPolitica, setShowPolitica] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userName, setUserName] = useState(null);
  const [userRole, setUserRole] = useState(null);

  // Leer rol de localStorage al cargar
  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role) {
      setUserRole(role);
    }
  }, []);

  const handleTabClick = (tabId) => {
    setShowPolitica(false);
    setActiveTab(tabId);
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    setActiveTab(null);
    setShowPolitica(false);
  };

  const handleLogin = (name) => {
    setUserName(name);
    const role = localStorage.getItem('role');
    setUserRole(role);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setUserName(null);
    setUserRole(null);
    setActiveTab(null);
    setShowPolitica(false);
    setIsMenuOpen(false);
    localStorage.removeItem('access_token');
    localStorage.removeItem('role');
  };

  const handlePoliticaClick = () => {
    setShowPolitica(!showPolitica);
    setActiveTab(null);
    setIsMenuOpen(false);
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case "disponibilidad":
        return "Disponibilidad en tiempo real";
      case "tarifas":
        return "Tarifas";
      case "informacion":
        return "Información";
      case "dashboards":
        return "Dashboard Administrativo";
      case "registros":
        return "";
      case "gestion-tarifas":
        return "Gestión de Tarifas";
      case "disponibilidad-admin":
        return "Disponibilidad de Cupos";
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
      case "dashboards":
        return "Visualiza estadísticas y métricas del parqueadero en tiempo real";
      case "registros":
        return "";
      case "gestion-tarifas":
        return "";
      default:
        return "";
    }
  };

  const isAdmin = userRole === "admin";

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
        
        <div 
          className="flex items-center gap-4"
          style={{ 
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'nowrap'
          }}
        >
          {userName && (
            <div 
              className="px-4 py-2 rounded-full font-gasoek text-lg" 
              style={{ 
                color: "#FF4F79",
                whiteSpace: 'nowrap',
                display: 'inline-block'
              }}
            >
              {userName}
            </div>
          )}
          
          <div style={{ display: 'inline-block' }}>
            <HamburgerButton 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              isOpen={isMenuOpen} 
            />
          </div>
        </div>
        
        {isAdmin ? (
          <SidebarAdmin
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            onTabClick={handleTabClick}
            activeTab={activeTab}
            onPoliticaClick={handlePoliticaClick}
            showPolitica={showPolitica}
            onLogout={handleLogout}
            userName={userName}
          />
        ) : (
          <Sidebar
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            onTabClick={handleTabClick}
            activeTab={activeTab}
            onPoliticaClick={handlePoliticaClick}
            showPolitica={showPolitica}
            onLoginClick={() => setShowLoginModal(true)}
          />
        )}
      </header>

      <main className="flex-1 flex flex-col items-center justify-start px-4 pt-32 z-0 overflow-y-auto">
        <div className="mb-2 text-center w-full">
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
                  className="font-geist text-[#2A324B] text-3xl font-light -mt-6 md:-mt-10 drop-shadow-lg"
                  style={{ fontSize: "74.11px" }}
                >
                  NorthSpot: Conduce. Llega. Listo.
                </p>
              </div>
            </>
          )}

          {activeTab && !showPolitica && activeTab !== 'dashboards' && (
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
                        word === "tiempo" || 
                        word === "estacionamiento" || 
                        word === "estadísticas" ||
                        word === "métricas" ||
                        word === "historial" ||
                        word === "precios" ||
                        word === "promociones" ||
                        word === "real"
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
        {!showPolitica && activeTab !== 'dashboards' && activeTab !== 'registros' && activeTab !== 'gestion-tarifas' && activeTab !== 'disponibilidad-admin' && (
          <NorthSpotTabs activeTab={activeTab} onTabClick={handleTabClick} />
        )}
        </div>

        {/* Dashboard Admin */}
        {activeTab === 'dashboards' && !showPolitica && (
          <DashboardAdmin onNavigate={handleTabClick} />
        )}

        {/* Disponibilidad de Cupos - Admin */}
        {activeTab === 'disponibilidad-admin' && !showPolitica && (
          <ParkingAvailability />
        )}

        {/* Disponibilidad de Cupos - Usuario */}
        {activeTab === 'disponibilidad' && !showPolitica && (
          <ParkingAvailability />
        )}

        {/* Gestión de Tarifas - Admin */}
        {activeTab === 'gestion-tarifas' && !showPolitica && (
            <TarifasAdmin />
        )}

        {/* Registro de Vehículos - Admin */}
        {activeTab === 'registros' && !showPolitica && (
          <Registros/>
        )}

        {showPolitica && <PoliticaDatos />}
        
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
        />
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