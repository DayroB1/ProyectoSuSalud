import CardHome from '../components/CardHome'
import './App.css'
import Navbar from '../components/Navbar';
import { useContext, useEffect } from 'react';
import logger from './services/logging';
import { LanguageContext } from './context/LanguageContext';
import { FormattedMessage } from 'react-intl';

function App() {
  const { changeLanguage, locale } = useContext(LanguageContext);

  //throw new Error("¡Este es un error de prueba para ErrorBoundary!");
  useEffect(() => {
    logger.info('Página de inicio cargada correctamente');
  }, []);

  return (
    <> 
      <div>
        <Navbar/>
      </div><br/><br/>
      <div style={{textAlign: "end"}}>
      <select
          value={locale}
          onChange={(e) => changeLanguage(e.target.value)}
          style={{borderRadius: "6px", blockSize:"45px", borderColor:"white", background:"#e6dacc", color:"black"}}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </select><br/>
        </div>
      <h1>SU SALUD</h1>
      <h3><FormattedMessage id="app.label.descripcion"/></h3>
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', gap: '20px' }}> 
        <CardHome imageUrl={'images/img1.webp'} description={<FormattedMessage id="app.card1.description"/> as any} />
        <CardHome imageUrl={'images/img2.png'} description={<FormattedMessage id="app.card2.description"/> as any} />
        <CardHome imageUrl={'images/img3.jpg'} description={<FormattedMessage id="app.card3.description"/> as any} />
        </div>
      </div>
      
      <section style={{ background: "#f5f5f5", padding: "32px 0", margin: "32px 0" }}>
        <h2 style={{ textAlign: "center", color: "#1976d2" }}><FormattedMessage id="app.section.testimonials"/></h2>
        <div style={{ display: "flex", justifyContent: "center", gap: "40px", marginTop: "24px" }}>
          <blockquote style={{ maxWidth: "300px", fontStyle: "italic", color: "#333", position: "relative" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
        <img
          src="/images/quica.jpg"
          alt="Ana M."
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            objectFit: "cover",
            marginRight: "10px",
            border: "2px solid #1976d2"
          }}
        />
        <span style={{ fontWeight: "bold", color: "#1976d2" }}>Ana M.</span>
      </div>
      <FormattedMessage id="app.testimonial1.text"/>
    </blockquote>
    <blockquote style={{ maxWidth: "300px", fontStyle: "italic", color: "#333", position: "relative" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
        <img
          src="/images/paco.jpg"
          alt="Carlos G."
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            objectFit: "cover",
            marginRight: "10px",
            border: "2px solid #1976d2"
          }}
        />
        <span style={{ fontWeight: "bold", color: "#1976d2" }}>Carlos G.</span>
      </div>
      <FormattedMessage id="app.testimonial2.text"/>
    </blockquote>
        </div>
      </section>
      <section style={{ textAlign: "center", margin: "32px 0" }}>
        <h2 style={{ color: "#1976d2" }}><FormattedMessage id="app.cta.title"/></h2>
        <p><FormattedMessage id="app.cta.text"/></p>
        <a href="/login-registro" style={{
          display: "inline-block",
          background: "#1976d2",
          color: "#fff",
          padding: "12px 28px",
          borderRadius: "6px",
          textDecoration: "none",
          fontWeight: "bold",
          marginTop: "16px"
        }}>
          <FormattedMessage id="app.cta.button"/>
        </a>
      </section>
      

    </>
  )
}

export default App
