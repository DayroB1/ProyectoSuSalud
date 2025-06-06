import { Route, Routes } from "react-router-dom";
import App from "../src/App";
//import About from "./About";
//import Contacto from "./Contacto";
//import FAQ from "./FAQ";
//import Login from "./Login";
//import Register from "./Register";
//import Services from "./Services";
import {LogReg} from "./Log-Reg";
//import GestionCitas from "./GestionCitas";
//import MisCitas from "./MisCitas";
import { Suspense } from "react";
//import { AuthContext } from "../src/context/AuthContext";
//import { Role } from "../src/services/IAuthService";
import React from "react";
import { LanguageContext } from "../src/context/LanguageContext";
import { IntlProvider } from "react-intl";
import ProtectedRoute from "../src/routes/ProtectedRoute";
import AdminRoute from "../src/routes/AdminRoute";

const About = React.lazy(() => import("./About"));
const Contacto = React.lazy(() => import("./Contacto"));
const FAQ = React.lazy(() => import("./FAQ"));
const Login = React.lazy(() => import("./Login"));
const Register = React.lazy(() => import("./Register"));
const Services = React.lazy(() => import("./Services"));
const GestionCitas = React.lazy(() => import("./GestionCitas"));
const MisCitas = React.lazy(() => import("./MisCitas"));


export const Root = () => {
  //const { roles } = useContext(AuthContext);
  const { locale, messages } = React.useContext(LanguageContext);
  
  return (
    <>
      <IntlProvider locale={locale} messages={messages}>
      <Suspense fallback={<div style={{padding: 40, textAlign: "center"}}>Cargando página...</div>}>
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contacto" element={<Contacto/>} />
        <Route path="/FAQ" element={<FAQ/>} />
        <Route path="/Login-Registro" element={<LogReg/>} />
        <Route path="/registro" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/servicios" element={<ProtectedRoute><Services/></ProtectedRoute>} />
        <Route path="/mis-citas" element={<ProtectedRoute><MisCitas/></ProtectedRoute>} />
        <Route path="/gestion-citas" element={<AdminRoute><GestionCitas/></AdminRoute>} /> 
      </Routes>
      </Suspense>
      </IntlProvider>
    </>
  );
};