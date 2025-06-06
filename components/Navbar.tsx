import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../src/context/AuthContext';
import { authService } from '../src/services/AuthService';
import { Role } from '../src/services/IAuthService';
import { FormattedMessage } from 'react-intl';

const Navbar: React.FC = () => {
  //const { changeLanguage, locale } = useContext(LanguageContext);
  const navigate = useNavigate();
  const { user, roles } = useContext(AuthContext);
  return (
    <StyledWrapper>
      <div className="nav">
        <div className="container">
          <div className="btn" onClick={() => navigate('/')}><FormattedMessage id="navbar.home" /></div>
          {user && roles?.includes(Role.USER) && (
            <>
              <div className="btn" onClick={() => navigate('/servicios')}><FormattedMessage id="navbar.services" /></div>
              <div className="btn" onClick={() => navigate('/mis-citas')}><FormattedMessage id="navbar.myAppointments" /></div>
            </>
          )}
          {user && roles?.includes(Role.ADMIN) && (
            <div className="btn" onClick={() => navigate('/gestion-citas')}><FormattedMessage id="navbar.management" /></div>
          )}
          {!user && <div className="btn" onClick={() => navigate('/about')}><FormattedMessage id="navbar.about" /></div>}
          {!user && <div className="btn" onClick={() => navigate('/contacto')}><FormattedMessage id="navbar.contact" /></div>}
          {!user && <div className="btn" onClick={() => navigate('/FAQ')}><FormattedMessage id="navbar.faq" /></div>}
          {!user && <div className="btn login" onClick={() => navigate('/login-registro')}><FormattedMessage id="navbar.loginRegister" /></div>}
          {user && <button onClick={() => authService.signOut()}><FormattedMessage id="navbar.logout" /></button>}
          <svg className="outline" overflow="visible" width="100%" height="60" viewBox="0 0 1200 60" xmlns="http://www.w3.org/2000/svg">
            <rect className="rect" pathLength={100} x={0} y={0} width="100%" height="60" fill="transparent" strokeWidth={5} />
          </svg>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .outline {
    position: absolute;
    inset: 0;
    pointer-events: none;
    width: 100%; /* Asegura que el SVG ocupe todo el ancho */
  }

  .rect {
    stroke-dashoffset: 5;
    stroke-dasharray: 0 0 10 40 10 40;
    transition: 0.5s;
    stroke: #fff;
    width: 100%; /* Asegura que el rect ocupe todo el ancho */
  }

  .nav {
    position: fixed; /* Fija el Navbar en la parte superior */
    top: 0; /* Lo coloca en la parte superior */
    left: 0; /* Lo coloca en el borde izquierdo */
    width: 100%; /* Ocupa todo el ancho de la pantalla */
    height: 60px;
    background: #1976d2; /* Fondo del Navbar */
    z-index: 1000; /* Asegura que esté por encima de otros elementos */
  }

  .container {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 0.5em;
    max-width: 1200px; /* Ancho máximo del contenido */
    margin: 0 auto; /* Centra el contenido */
  }

  .btn {
    padding: 0.5em 1.5em;
    color: #fff;
    cursor: pointer;
    transition: 0.1s;
    position: relative; /* Necesario para el efecto visual */
  }

  .btn:hover {
    background: #fff3;
  }

  .btn:nth-child(1):hover ~ svg .rect {
    stroke-dashoffset: 0;
    stroke-dasharray: 0 2 8 73.3 8 10.7;
  }

  .btn:nth-child(2):hover ~ svg .rect {
    stroke-dashoffset: 0;
    stroke-dasharray: 0 12.6 9.5 49.3 9.5 31.6;
  }

  .btn:nth-child(3):hover ~ svg .rect {
    stroke-dashoffset: 0;
    stroke-dasharray: 0 24.5 8.5 27.5 8.5 55.5;
  }

  .btn:nth-child(4):hover ~ svg .rect {
    stroke-dashoffset: 0;
    stroke-dasharray: 0 34.7 6.9 10.2 6.9 76;
  }

  .btn:nth-child(5):hover ~ svg .rect {
    stroke-dashoffset: 0;
    stroke-dasharray: 0 43.5 6.9 10.2 6.9 76;
  }

  .btn.login {
    background: #fff;
    color: #000;
    font-weight: bold;
    border-radius: 5px;
    padding: 0.5em 1.5em;
  }

  .btn.login:hover {
    background: #e0e0e0;
  }

  .btn:hover ~ .outline .rect {
    stroke-dashoffset: 0;
    stroke-dasharray: 0 0 10 40 10 40;
    transition: 0.5s !important;
  }
`;

export default Navbar;