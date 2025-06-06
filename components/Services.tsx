import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../src/app/store";
import { fetchServicios } from "../src/features/citas/citaSlice";
import CitaForm from "./CitaForm";
import { Servicio } from "../src/features/citas/citasTypes";
import { AuthContext } from "../src/context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import Card from "./Card";

function Services() {
    const dispatch = useDispatch<AppDispatch>();
    const { servicios, status } = useSelector((state: RootState) => state.citas);
    const [selectedService, setSelectedService] = useState<Servicio | null>(null);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const backButtonStyle = {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#9e9a99', // Example color for back button: red
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    };
  
    useEffect(() => {
      dispatch(fetchServicios());
    }, [dispatch]);
  
    if (status === "loading") {
      return <div><FormattedMessage id="services.loading" /></div>;
    }
  
    if (status === "failed") {
      return <div><FormattedMessage id="services.errorLoading" /></div>;
    }
  
    return (
      <div style={{ padding: "20px" }}>
        <h1>SU SALUD</h1>
        <h2><FormattedMessage id="services.selectServicePrompt" /></h2>
        <Card/><br/>
        
        {servicios.length === 0 ? (
          <p><FormattedMessage id="services.noServicesAvailable" /></p>
        ) : (
          <>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
              {servicios.map((servicio) => (
                <div 
                  key={servicio.id}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "15px",
                    width: "300px",
                    cursor: "pointer",
                    backgroundColor: selectedService?.id === servicio.id ? "#cc7070" : "gray"
                  }}
                  onClick={() => setSelectedService(servicio)}
                >
                  <h3>{servicio.nombre}</h3>

                  <img src={`/images/${servicio.imagen}`} alt="Servicio"
                    style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginRight: "10px",
                    border: "2px solid #1976d2"
                  }}
                  />
                  <p>{servicio.descripcion}</p>
                </div>
              ))}
            </div>
  
            {selectedService && user && (
              <div style={{ marginTop: "40px" }}>
                <CitaForm 
                  servicio={selectedService} 
                  pacienteId={user.uid} 
                  pacienteEmail={user.email || ""} 
                />
              </div>
            )}
          </>
        )}<br/><br/>
        <button style={backButtonStyle} onClick={() => navigate(-1)}><FormattedMessage id="global.volver1" /></button>
      </div>
      
    );
  }
  
  export default Services;