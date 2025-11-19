import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, X } from "lucide-react";
import title2 from "../assets/title2.png";
const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    setError("");
    // Llamar al endpoint de autenticación
    fetch("http://localhost:8000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.detail || "Credenciales incorrectas");
        }
        return res.json();
      })
      .then((data) => {
        // Guardar token en localStorage (temporal)
        localStorage.setItem("access_token", data.access_token);
        // Guardar rol y nombre para UI
        if (data.rol) localStorage.setItem("role", data.rol);
        const displayName = data.nombre || email;
        onLogin(displayName);
        onClose();
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        setError(err.message || "Credenciales incorrectas");
      });
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      >
        {/* Modal Card */}
        <div
          className="relative w-[420px] rounded-[50px] shadow-2xl animate-scale-in"
          style={{ backgroundColor: "#2A324B" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Botón cerrar */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-all"
            style={{ color: "#DDE2EC" }}
          >
            <X size={24} />
          </button>

          {/* Contenido */}
          <div className="p-12">
            {/* Logo y Título */}
            <div className="text-center mb-8">
              <img
                src={title2}
                alt="NorthSpot"
                className="w-lg h-24 object-contain hover:scale-105 transition-transform"
              />
              <h2
                className="text-3xl font-bold mb-2"
                style={{
                  fontFamily: "Geist, sans-serif",
                  color: "#B9E6FF",
                }}
              >
                Iniciar sesión
              </h2>
            </div>

            {/* Formulario */}
            <div className="space-y-6">
              {/* Campo Correo */}
                <form
                onSubmit={(e) => {
                    e.preventDefault(); 
                    handleSubmit();
                    
                }}
                onClick={(e) => e.stopPropagation()}
                >
                <div className="space-y-2">
                  <label
                    className="block text-sm font-medium"
                    style={{
                      fontFamily: "Geist, sans-serif",
                      color: "#DDE2EC",
                    }}
                  >
                    Correo
                  </label>
                  <div className="relative">
                    <div
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full p-2"
                      style={{ backgroundColor: "#FF4F79" }}
                    >
                      <Mail size={20} style={{ color: "#2A324B" }} />
                    </div>

                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Example@gmail.com"
                      className="w-full pl-16 pr-4 py-3 rounded-full border-none outline-none text-base"
                      style={{
                        backgroundColor: "#DDE2EC",
                        color: "#2A324B",
                        fontFamily: "Geist, sans-serif",
                      }}
                    />
                  </div>
                </div>

                {/* Campo Contraseña */}
                <div className="space-y-2">
                  <label
                    className="block text-sm font-medium"
                    style={{
                      fontFamily: "Geist, sans-serif",
                      color: "#DDE2EC",
                    }}
                  >
                    Contraseña
                  </label>

                  <div className="relative">
                    <div
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full p-2"
                      style={{ backgroundColor: "#FF4F79" }}
                    >
                      <Lock size={20} style={{ color: "#2A324B" }} />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••••••"
                      required
                      className="w-full pl-16 pr-14 py-3 rounded-full border-none outline-none text-base"
                      style={{
                        backgroundColor: "#DDE2EC",
                        color: "#2A324B",
                        fontFamily: "Geist, sans-serif",
                      }}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full hover:bg-gray-200 transition-all"
                      style={{ color: "#767B91" }}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                {/* Mensaje de error */}
                {error && (
                  <div
                    className="text-center text-sm py-2 rounded-full"
                    style={{
                      color: "#FF4F79",
                      fontFamily: "Geist, sans-serif",
                    }}
                  >
                    {error}
                  </div>
                )}
                {/* Botón Iniciar Sesión */}
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full py-4 rounded-full text-4xl hover:opacity-90 transition-all hover:scale-105 mt-8"
                  style={{
                    backgroundColor: "#FF4F79",
                    color: "#DDE2EC",
                    fontFamily: "Gasoek-One, sans-serif",
                    boxShadow: "0 4px 12px rgba(255, 79, 121, 0.4)",
                  }}
                >
                  Iniciar sesión
                </button>

                {/* Enlace inferior */}
                <div className="text-center mt-4">
                  <p
                    className="text-sm"
                    style={{
                      fontFamily: "Geist, sans-serif",
                      color: "#767B91",
                    }}
                  >
                    ¿Problemas iniciando sesión?{" "}
                    <a
                      href="#"
                      className="font-semibold hover:underline"
                      style={{ color: "#FF4F79" }}
                    >
                      Contáctanos
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default LoginModal;
