import React from 'react';
import { LayoutDashboard, FileText, DollarSign, LogOut, BookOpen } from 'lucide-react';
import logoImage from "../assets/logo.png";

const SidebarAdmin = ({ isOpen, onClose, onTabClick, activeTab, onPoliticaClick, showPolitica, onLogout, userName }) => { 
  const menuItems = [
    { icon: <LayoutDashboard size={40} />, text: 'Dashboards', tabId: 'dashboards' },
    { icon: <FileText size={40} />, text: 'Registros', tabId: 'registros' },
    { icon: <DollarSign size={40} />, text: 'Gestión de tarifas', tabId: 'gestion-tarifas', hasBorder: true },
    { icon: <LogOut size={40} />, text: 'Cerrar sesión', tabId: null, isLogout: true, hasBorder: true }, 
    { icon: <BookOpen size={40} />, text: 'Política de datos', tabId: 'politica' }
  ];

  const handleItemClick = (item) => {
    if (item.isLogout) { 
      onLogout();
      onClose();
    } else if (item.tabId === 'politica') {
      onPoliticaClick(); 
      onClose(); 
    } else if (item.tabId) {
      onTabClick(item.tabId);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          isOpen ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 right-0 h-full w-[500px] z-40
          transition-transform duration-700 ease-[cubic-bezier(0.175, 0.885, 0.320, 1.275)]
          ${isOpen ? "translate-x-0" : "translate-x-[110%]"}
          rounded-[50px] shadow-xl
        `}
        style={{ backgroundColor: "#2A324B" }}
      >
        {/* Header del Admin - Logo y Username */}
        <div className="pt-14 px-28 flex items-center justify-end gap-3">
          <span 
            className="text-lg font-gasoek"
            style={{ color: "#DDE2EC" }}
          >
            ({userName})
          </span>

        </div>

        {/* Menu */}
        <nav className="pt-12 px-8">
          <ul className="space-y-4">
            {menuItems.map((item, index) => {
              const isActive = activeTab === item.tabId || (item.tabId === 'politica' && showPolitica); 
              
              return (
                <li
                  key={index}
                  className={`
                    transform transition-all duration-500 
                    ${isOpen ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}
                  `}
                  style={{
                    transitionDelay: isOpen ? `${index * 120}ms` : "0ms",
                  }}
                >
                  <button
                    onClick={() => handleItemClick(item)}
                    className={`
                      flex items-center justify-end w-full
                      gap-6 py-4 group text-right cursor-pointer 
                    `}
                    style={{ 
                      color: isActive ? "#FF4F79" : "#B9E6FF"
                    }}
                  >
                    <span className={`transition-colors duration-300 ${item.tabId || item.isLogout ? 'group-hover:text-[#FF4F79]' : ''}`}>
                      {item.icon}
                    </span>
                    
                    <span className={`text-4xl font-bold transition-colors duration-300 ${item.tabId || item.isLogout ? 'group-hover:text-[#FF4F79]' : ''}`}>
                      {item.text}
                    </span>
                  </button>

                  {/* Línea divisoria */}
                  {item.hasBorder && (
                    <div
                      className="h-0.5 w-full my-4"
                      style={{ backgroundColor: "#FF4F79" }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default SidebarAdmin;