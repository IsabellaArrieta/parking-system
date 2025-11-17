import React from 'react';
import { 
  Shield, 
  User, 
  Database, 
  Target, 
  Lock, 
  Key,
  FileText,
  Clock,
  Globe,
  Baby,
  Cookie,
  Archive,
  Calendar
} from 'lucide-react';

const PoliticaDatos = () => {
  const secciones = [
    {
      titulo: "1. Introducción",
      icono: <Shield size={24} />,
      contenido: (
        <>
          <p>La presente Política de Tratamiento de Datos Personales se adopta en cumplimiento de la Ley 1581 de 2012, el Decreto Reglamentario 1377 de 2013, la Sentencia C-748 de 2011, y demás normas que regulan la protección de datos personales en Colombia.</p>
          <p className="mt-3">Tiene como finalidad establecer los lineamientos mediante los cuales el Centro Comercial Plaza Norte (en adelante, "el Centro Comercial") realiza la recolección, almacenamiento, uso, circulación, supresión y, en general, el tratamiento de los datos personales obtenidos a través del sistema de parqueaderos NorthSpot.</p>
          <p className="mt-3">El Centro Comercial garantiza que el tratamiento de los datos personales se realizará bajo criterios de legalidad, finalidad, libertad, veracidad, transparencia, acceso, seguridad y confidencialidad, en estricto respeto de los derechos fundamentales del titular.</p>
        </>
      )
    },
    {
      titulo: "2. Responsable del Tratamiento",
      icono: <User size={24} />,
      contenido: (
        <>
          <p><strong>Centro Comercial Plaza Norte</strong></p>
          <p>Sistema de Parqueaderos: <span style={{ color: '#FF4F79' }}>NorthSpot</span></p>
          <p>Dirección: Barranquilla, Colombia</p>
          <p>Correo electrónico: datos@plazanorte.com.co</p>
          <p className="mt-3">El Centro Comercial Plaza Norte es la entidad responsable del tratamiento de los datos personales recolectados en el marco del funcionamiento del sistema de parqueaderos NorthSpot.</p>
        </>
      )
    },
    {
      titulo: "3. Datos personales objeto de tratamiento",
      icono: <Database size={24} />,
      contenido: (
        <>
          <p>NorthSpot recolecta únicamente los datos necesarios, pertinentes y no excesivos, propios del funcionamiento del parqueadero.</p>
          <p className="mt-3 font-semibold">3.1 Datos recolectados automáticamente:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Placa del vehículo</li>
            <li>Fecha y hora de entrada</li>
            <li>Fecha y hora de salida</li>
            <li>Nivel o zona de parqueo</li>
            <li>Tiempo total de permanencia</li>
            <li>Valor calculado a pagar</li>
          </ul>
          <p className="mt-3 font-semibold">3.2 Datos derivados:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Duración estimada o proyectada del servicio</li>
            <li>Registros en sistemas internos (transacciones, ocupación, métricas operativas)</li>
          </ul>
          <div className="mt-3 p-3 rounded-lg" style={{ backgroundColor: '#E8F4F8' }}>
            <p className="font-semibold" style={{ color: '#FF4F79' }}>Importante:</p>
            <ul className="list-disc ml-6 mt-1 space-y-1 text-sm">
              <li>No se recolectan datos sensibles (huellas, fotos del rostro, biometría, salud, orientación política, etc.)</li>
              <li>No se recolecta información financiera del usuario salvo el valor pagado por el servicio del parqueadero</li>
              <li>No se solicita nombre, identificación, correo, teléfono ni otros datos personales</li>
            </ul>
          </div>
        </>
      )
    },
    {
      titulo: "4. Finalidades del tratamiento",
      icono: <Target size={24} />,
      contenido: (
        <>
          <p>Los datos obtenidos son utilizados exclusivamente para las siguientes finalidades:</p>
          <div className="mt-3 space-y-3">
            <div>
              <p className="font-semibold" style={{ color: '#2A324B' }}>Operativas:</p>
              <ul className="list-disc ml-6 mt-1 space-y-1 text-sm">
                <li>Registrar la entrada y salida de vehículos</li>
                <li>Calcular el tiempo de permanencia y la tarifa correspondiente</li>
                <li>Controlar la disponibilidad y ocupación en tiempo real</li>
                <li>Emitir comprobantes operativos, facturación y reportes internos</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold" style={{ color: '#2A324B' }}>Administrativas:</p>
              <ul className="list-disc ml-6 mt-1 space-y-1 text-sm">
                <li>Generar métricas de ocupación, flujo vehicular e ingresos</li>
                <li>Identificar patrones de uso para mejorar el servicio</li>
                <li>Administrar el panel interno para uso exclusivo del personal autorizado</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold" style={{ color: '#2A324B' }}>Legales:</p>
              <ul className="list-disc ml-6 mt-1 space-y-1 text-sm">
                <li>Atender requerimientos de autoridades competentes</li>
                <li>Cumplir obligaciones contables, tributarias y de seguridad del establecimiento</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold" style={{ color: '#2A324B' }}>Seguridad:</p>
              <ul className="list-disc ml-6 mt-1 space-y-1 text-sm">
                <li>Prevenir fraudes internos o externos</li>
                <li>Soportar investigaciones por daños, incidentes o reclamaciones</li>
              </ul>
            </div>
          </div>
          <div className="mt-3 p-3 rounded-lg" style={{ backgroundColor: '#E8F4F8' }}>
            <p className="font-semibold">Exclusiones:</p>
            <ul className="list-disc ml-6 mt-1 space-y-1 text-sm">
              <li>No se usan datos para publicidad</li>
              <li>No se comercializa la información</li>
              <li>No se realiza perfilamiento o análisis predictivo del usuario</li>
            </ul>
          </div>
        </>
      )
    },
    {
      titulo: "5. Principios aplicados",
      icono: <FileText size={24} />,
      contenido: (
        <>
          <p>El tratamiento de datos se rige por los siguientes principios:</p>
          <ul className="mt-3 space-y-2">
            <li><strong>Legalidad:</strong> El tratamiento se realiza conforme a la ley</li>
            <li><strong>Finalidad:</strong> Los datos se usan solo para los fines indicados</li>
            <li><strong>Libertad:</strong> Solo se tratan datos autorizados por el titular o la ley</li>
            <li><strong>Veracidad:</strong> La información debe ser completa, veraz y actualizada</li>
            <li><strong>Transparencia:</strong> El titular puede solicitar información sobre el tratamiento</li>
            <li><strong>Acceso y circulación restringida:</strong> Solo personal autorizado tiene acceso</li>
            <li><strong>Seguridad:</strong> Uso de medidas técnicas, humanas y administrativas</li>
            <li><strong>Confidencialidad:</strong> Los datos no se divulgan sin autorización</li>
          </ul>
        </>
      )
    },
    {
      titulo: "6. Derechos del titular (ARCO)",
      icono: <Key size={24} />,
      contenido: (
        <>
          <p>De conformidad con la Ley 1581 de 2012, el titular tiene derecho a:</p>
          <div className="mt-3 space-y-2">
            <div className="p-2 rounded-lg" style={{ backgroundColor: '#F5F5F5' }}>
              <p className="font-semibold" style={{ color: '#FF4F79' }}>✓ Acceso</p>
              <p className="text-sm mt-1">Conocer los datos personales que han sido recolectados</p>
            </div>
            <div className="p-2 rounded-lg" style={{ backgroundColor: '#F5F5F5' }}>
              <p className="font-semibold" style={{ color: '#FF4F79' }}>✓ Rectificación</p>
              <p className="text-sm mt-1">Actualizar o corregir datos incorrectos, inexactos o incompletos</p>
            </div>
            <div className="p-2 rounded-lg" style={{ backgroundColor: '#F5F5F5' }}>
              <p className="font-semibold" style={{ color: '#FF4F79' }}>✓ Cancelación o supresión</p>
              <p className="text-sm mt-1">Solicitar la eliminación de los datos cuando legalmente proceda</p>
            </div>
            <div className="p-2 rounded-lg" style={{ backgroundColor: '#F5F5F5' }}>
              <p className="font-semibold" style={{ color: '#FF4F79' }}>✓ Oposición</p>
              <p className="text-sm mt-1">Negarse al tratamiento en casos legalmente permitidos</p>
            </div>
            <div className="p-2 rounded-lg" style={{ backgroundColor: '#F5F5F5' }}>
              <p className="font-semibold" style={{ color: '#FF4F79' }}>✓ Revocar la autorización</p>
              <p className="text-sm mt-1">Cuando no exista deber legal o contractual que obligue su conservación</p>
            </div>
          </div>
          <p className="mt-3">Para ejercer estos derechos, el titular puede comunicarse a:</p>
          <p className="font-semibold" style={{ color: '#FF4F79' }}>📩 datos@plazanorte.com.co</p>
        </>
      )
    },
    {
      titulo: "7. Procedimiento para ejercer derechos",
      icono: <FileText size={24} />,
      contenido: (
        <>
          <p>El titular debe enviar una solicitud indicando:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Nombre (si aplica)</li>
            <li>Placa del vehículo</li>
            <li>Descripción del caso</li>
            <li>Documentos de soporte</li>
          </ul>
          <p className="mt-3">El Centro Comercial responderá:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li><strong>Consultas:</strong> máximo 10 días hábiles</li>
            <li><strong>Reclamos:</strong> máximo 15 días hábiles</li>
          </ul>
          <p className="mt-3">En caso de no resolver la situación, el titular puede acudir a la Superintendencia de Industria y Comercio (SIC).</p>
        </>
      )
    },
    {
      titulo: "8. Medidas de seguridad",
      icono: <Lock size={24} />,
      contenido: (
        <>
          <p>El Centro Comercial adopta medidas para proteger los datos:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Cifrado de comunicaciones (HTTPS)</li>
            <li>Control de acceso por roles</li>
            <li>Registros de auditoría interna</li>
            <li>Copias de seguridad</li>
            <li>Políticas de contraseñas en el panel administrativo</li>
            <li>Eliminación automatizada de datos según su ciclo de vida</li>
          </ul>
          <p className="mt-3 text-sm" style={{ color: '#767B91' }}>Ningún sistema es infalible; sin embargo, se aplican medidas razonables conforme a estándares de la industria.</p>
        </>
      )
    },
    {
      titulo: "9. Transferencia y transmisión de datos",
      icono: <Globe size={24} />,
      contenido: (
        <>
          <p>Los datos personales pueden ser:</p>
          <div className="mt-3 space-y-2">
            <div>
              <p className="font-semibold">Transmitidos</p>
              <p className="text-sm">A proveedores tecnológicos que presten servicios al Centro Comercial, siempre bajo acuerdos de confidencialidad.</p>
            </div>
            <div>
              <p className="font-semibold">Transferidos</p>
              <p className="text-sm">A autoridades judiciales, administrativas o de control, cuando exista obligación legal.</p>
            </div>
          </div>
          <p className="mt-3 font-semibold" style={{ color: '#FF4F79' }}>No se realizan transferencias internacionales de datos.</p>
        </>
      )
    },
    {
      titulo: "10. Información de menores de edad",
      icono: <Baby size={24} />,
      contenido: (
        <p>NorthSpot no recolecta información personal de menores de edad, dada la naturaleza del servicio de parqueaderos.</p>
      )
    },
    {
      titulo: "11. Uso de cookies y almacenamiento local",
      icono: <Cookie size={24} />,
      contenido: (
        <>
          <p>El sistema puede utilizar:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Cookies estrictamente necesarias</li>
            <li>LocalStorage para preferencias de visualización</li>
          </ul>
          <p className="mt-3">No se registra información personal en cookies. No se realizan técnicas de análisis avanzado, tracking cross-site ni publicidad comportamental.</p>
        </>
      )
    },
    {
      titulo: "12. Conservación de los datos",
      icono: <Archive size={24} />,
      contenido: (
        <>
          <p>Los datos recolectados se conservarán de acuerdo con estas reglas:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li><strong>12 meses:</strong> información operativa del parqueadero</li>
            <li><strong>Hasta 5 años:</strong> información contable o tributaria</li>
            <li><strong>Conservación adicional:</strong> solo cuando exista obligación legal o proceso activo</li>
          </ul>
          <p className="mt-3">Posteriormente, serán eliminados o anonimizados.</p>
        </>
      )
    },
    {
      titulo: "13. Vigencia y modificaciones",
      icono: <Calendar size={24} />,
      contenido: (
        <>
          <p>Esta política entra en vigencia desde su publicación.</p>
          <p className="mt-2">El Centro Comercial podrá modificarla en cualquier momento.</p>
          <p className="mt-2">Los cambios serán informados en la misma página web del sistema NorthSpot.</p>
        </>
      )
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto animate-fade-in">
      <div 
        className="rounded-3xl shadow-2xl overflow-hidden"
        style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '3px solid #C7D4FF',
          maxHeight: '45vh'
        }}
      >

        {/* Contenido con scroll personalizado */}
        <div 
          className="p-8 overflow-y-auto custom-scrollbar"
          style={{ maxHeight: 'calc(70vh - 120px)' }}
        >
          <div className="space-y-6">
            {secciones.map((seccion, index) => (
              <div 
                key={index}
                className="p-5 rounded-2xl"
                style={{ 
                  backgroundColor: '#F5F8FA',
                  border: '2px solid #C7D4FF'
                }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div 
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: '#2A324B', color: '#FF4F79' }}
                  >
                    {seccion.icono}
                  </div>
                  <h3 
                    className="text-xl font-bold flex-1"
                    style={{ fontFamily: 'Geist, sans-serif', color: '#2A324B' }}
                  >
                    {seccion.titulo}
                  </h3>
                </div>
                <div 
                  className="text-sm leading-relaxed"
                  style={{ fontFamily: 'Geist, sans-serif', color: '#767B91' }}
                >
                  {seccion.contenido}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #E8F4F8;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #FF4F79 0%, #B9E6FF 100%);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #FF4F79 0%, #767B91 100%);
        }

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
};

export default PoliticaDatos;