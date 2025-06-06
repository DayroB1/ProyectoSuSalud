import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../src/app/store";
import { fetchCitasByUser } from "../src/features/citas/citaSlice";
import { AuthContext } from "../src/context/AuthContext";
import { EstadoCita } from "../src/features/citas/citasTypes";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";

const MisCitas = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { citas, status } = useSelector((state: RootState) => state.citas);
    const { user } = useContext(AuthContext);
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
      if (user?.uid) {
        dispatch(fetchCitasByUser(user.uid));
      }
    }, [dispatch, user?.uid]);
  
    if (status === "loading") return <div><FormattedMessage id="myAppointments.loading" /></div>;
  
    return (
      <div style={{ padding: "20px" }}>
        <h1>SU SALUD</h1>
        <h1><FormattedMessage id="myAppointments.title" /></h1>
        
        {citas.length === 0 ? (
          <p><FormattedMessage id="myAppointments.noAppointments" /></p>
        ) : (
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
                <p>Fecha: {cita.fecha} a las {cita.hora}</p>
                <p>Estado: {cita.estado}</p>
                {cita.notas && <p>Notas: {cita.notas}</p>}
              </div>
            ))}
          </div>
        )}
        <button style={backButtonStyle} onClick={() => navigate(-1)}><FormattedMessage id="global.volver1" /></button>
      </div>
    );
  };
  
  export default MisCitas;