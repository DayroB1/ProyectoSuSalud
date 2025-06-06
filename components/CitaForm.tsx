import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../src/app/store";
import { addCita } from "../src/features/citas/citaSlice";
import { Servicio } from "../src/features/citas/citasTypes";
import logger from "../src/services/logging";

interface CitaFormProps {
  servicio: Servicio;
  pacienteId: string;
  pacienteEmail: string;
}

const CitaForm: React.FC<CitaFormProps> = ({ servicio, pacienteId, pacienteEmail }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [notas, setNotas] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Rango de horas permitido
  const minHora = "09:00";
  const maxHora = "18:00";

  // Fecha de hoy en formato YYYY-MM-DD
  const today = new Date()
  today.setDate(today.getDate() + 1);
  const minDate = today.toISOString().split('T')[0]; 


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fecha || !hora) {
      logger.warn("Intento de enviar el formulario sin fecha u hora seleccionada.");
      setError("Por favor complete todos los campos obligatorios");
      return;
    }

    dispatch(
      addCita({
        servicio: servicio.nombre,
        fecha,
        hora,
        paciente: pacienteEmail,
        pacienteId,
        notas,
      })
    );

    setIsSubmitted(true);
    setError("");
  };

  if (isSubmitted) {
    return (
      <div style={{ 
        padding: "20px", 
        backgroundColor: "#19b4e3", 
        borderRadius: "8px",
        textAlign: "center"
      }}>
        <h3>¡Cita solicitada con éxito!</h3>
        <p>Su cita para {servicio.nombre} está pendiente de aprobación.</p>
        <p>Fecha: {fecha} a las {hora}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      maxWidth: "500px",
      margin: "0 auto"
    }}>
      <h3>Solicitar cita: {servicio.nombre}</h3>
      
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Fecha:</label>
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          style={{ width: "100%", padding: "8px" }}
          min={minDate}
          required
        />
      </div>
      
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Hora:</label>
        <input
          type="time"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
          style={{ width: "100%", padding: "8px" }}
          min={minHora}
          max={maxHora}
          required
        />
        <small style={{ color: "#888" }}>
          Horario disponible: {minHora} - {maxHora}
        </small>
      </div>
      
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Notas adicionales:</label>
        <textarea
          value={notas}
          onChange={(e) => setNotas(e.target.value)}
          style={{ width: "100%", padding: "8px", minHeight: "80px" }}
        />
      </div>
      
      {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}
      
      <button 
        type="submit"
        style={{
          backgroundColor: "#1976d2",
          color: "white",
          padding: "10px 15px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        Solicitar Cita
      </button>
    </form>
  );
};

export default CitaForm;