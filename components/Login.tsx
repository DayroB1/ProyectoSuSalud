import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../src/services/AuthService';
import logger from '../src/services/logging';
import { FormattedMessage } from 'react-intl';

const Login: React.FC = () => {
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

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await authService.signIn(email, password);
      //console.log("Usuario autenticado:", userCredential.user);
      logger.info(`Usuario autenticado: ${userCredential.user.email}`);
      setSuccess('Has iniciado sesión correctamente');
      setTimeout(() => navigate('/'), 1000);
    } catch (error: any) {
      //console.error("Error al iniciar sesión:", error);
      logger.error(`Error al iniciar sesión: ${error.message}`);
      setError(error.message);
    }
  };
 
  return (
    <form onSubmit={handleLogin} className="style-form">
      <h2><FormattedMessage id="global.login1" /></h2>
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
                <button style={buttonStyle} type="submit"><FormattedMessage id="global.ingresar" /></button>
                <button style={backButtonStyle} type="button" onClick={() => navigate(-1)}><FormattedMessage id="global.volver1" /></button>
            </div>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </form>
  );
};

export default Login;