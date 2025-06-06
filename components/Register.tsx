import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../src/services/AuthService";
import { FirebaseDatabaseService } from "../src/firebase/FirebaseDatabaseService";
import React from "react"; 
import logger from "../src/services/logging";
import { FormattedMessage } from "react-intl";

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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

  const buttonStyle = {
        padding: '15px 40px', 
        margin: '0 30px',    
        fontSize: '18px',    
        backgroundColor: '#4CAF50', 
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
    };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await authService.signUp(email, password);
      const userService = new FirebaseDatabaseService();
      await userService.setUserRoles(userCredential.user.uid, { email: userCredential.user.email, roles: { admin: false } });
      logger.info(`Usuario registrado: ${userCredential.user.email}`);
      setSuccess('Registro exitoso. Redirigiendo al home...');
      setTimeout(() => navigate('/'), 2000);
    } catch (error: any) {
      //console.error("Error al registrarse:", error);
      logger.error(`Error al registrarse: ${error.message}`);
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleRegister} className="style-form">
      <h2><FormattedMessage id="global.registrarse1" /></h2>
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="login-input"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="login-input"
      />
      <div className="login-button-group">
      <button style={buttonStyle} type="submit"><FormattedMessage id="global.registrarse1" /></button>
      <button style={backButtonStyle} type="button" className="btn" onClick={() => navigate(-1)}><FormattedMessage id="global.volver1" /></button>
    </div>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </form>
  );
};

export default Register;