import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../src/app/store";
import { deleteCita, fetchCitas, updateCitaEstado } from "../src/features/citas/citaSlice";
import { EstadoCita } from "../src/features/citas/citasTypes";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";

const GestionCitas = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { citas, status } = useSelector((state: RootState) => state.citas);
  const navigate = useNavigate();

  const backButtonStyle = {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#9e9a99', 
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    };

  useEffect(() => {
    dispatch(fetchCitas());
  }, [dispatch]);

   const handleDelete = (id: string) => {
    if (window.confirm("¿Estás seguro de quitar esta cita de la lista?")) {
      dispatch(deleteCita(id));
    }
  };

  const handleAprobarCita = (id: string) => {
    dispatch(updateCitaEstado({ id, estado: EstadoCita.APROBADA }));
  };

  const handleRechazarCita = (id: string) => {
    dispatch(updateCitaEstado({ id, estado: EstadoCita.RECHAZADA }));
  };

  if (status === "loading") return <div>Cargando citas...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>SU SALUD</h1>
      <h1>Gestión de Citas</h1>
      
      <div style={{ marginTop: "20px" }}>
        {citas.map((cita) => (
          <div 
            key={cita.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "15px",
              backgroundColor: 
                cita.estado === EstadoCita.APROBADA ? "#a3e6b0" :
                cita.estado === EstadoCita.PENDIENTE ? "#e3b019" :
                cita.estado === EstadoCita.RECHAZADA ? "#db592e" : "#fff8e1"
            }}
          >
            <h3>{cita.servicio}</h3>
            <p>Paciente: {cita.paciente}</p>
            <p>Fecha: {cita.fecha} a las {cita.hora}</p>
            <p>Estado: {cita.estado}</p>
            {cita.notas && <p>Notas: {cita.notas}</p>}

            {(cita.estado === EstadoCita.APROBADA || cita.estado === EstadoCita.RECHAZADA) && (
              <button
                style={{
                  background: "#e53935",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  padding: "6px 12px",
                  marginTop: "8px",
                  cursor: "pointer"
                }}
                onClick={() => handleDelete(cita.id!)}
              >
                <FormattedMessage id="global.quitar" />
              </button>
            )}

            {cita.estado === EstadoCita.PENDIENTE && (
              <div style={{ marginTop: "10px" }}>
                <button 
                  onClick={() => handleAprobarCita(cita.id!)}
                  style={{
                    backgroundColor: "#4caf50",
                    color: "white",
                    marginRight: "10px",
                    padding: "5px 10px",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                >
                  <FormattedMessage id="global.aprobar" />
                </button>
                <button 
                  onClick={() => handleRechazarCita(cita.id!)}
                  style={{
                    backgroundColor: "#f44336",
                    color: "white",
                    padding: "5px 10px",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                >
                  <FormattedMessage id="global.rechazar" />
                </button>
              </div>
            )}
          </div>
        ))} 
      </div>

      
      <button style={backButtonStyle} className="btn" onClick={() => navigate(-1)}><FormattedMessage id="global.volver1" /></button>
    </div>
    
  );
};

export default GestionCitas;