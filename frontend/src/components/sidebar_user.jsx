import React from 'react';
import { Car, Info, DollarSign, User, BookOpen } from 'lucide-react';

const Sidebar = ({ isOpen, onClose, onTabClick, activeTab, onPoliticaClick, showPolitica }) => { // ← Añade showPolitica
  const menuItems = [
    { icon: <Car size={40} />, text: 'Disponibilidad', tabId: 'disponibilidad' },
    { icon: <Info size={40} />, text: 'Información', tabId: 'informacion' },
    { icon: <DollarSign size={40} />, text: 'Tarifas', tabId: 'tarifas', hasBorder: true },
    { icon: <User size={40} />, text: 'Iniciar sesión', tabId: null, hasBorder: true },
    { icon: <BookOpen size={40} />, text: 'Política de datos', tabId: 'politica' }
  ];

  const handleItemClick = (tabId) => {
    if (tabId === 'politica') {
      onPoliticaClick(); 
      onClose(); 
    } else if (tabId) {
      onTabClick(tabId);
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
        {/* Menu */}
        <nav className="pt-36 px-8">
          <ul className="space-y-4">
            {menuItems.map((item, index) => {
              const isActive = activeTab === item.tabId || (item.tabId === 'politica' && showPolitica); // ← Ahora funciona
              
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
                    onClick={() => handleItemClick(item.tabId)}
                    disabled={!item.tabId}
                    className={`
                      flex items-center justify-end w-full
                      gap-6 py-4 group text-right
                      ${!item.tabId ? 'cursor-default' : 'cursor-pointer'}
                    `}
                    style={{ 
                      color: isActive ? "#FF4F79" : "#B9E6FF"
                    }}
                  >
                    <span className={`transition-colors duration-300 ${item.tabId ? 'group-hover:text-[#FF4F79]' : ''}`}>
                      {item.icon}
                    </span>
                    
                    <span className={`text-4xl font-bold transition-colors duration-300 ${item.tabId ? 'group-hover:text-[#FF4F79]' : ''}`}>
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

export default Sidebar;