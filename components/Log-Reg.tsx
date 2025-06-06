import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";

export const LogReg: React.FC = () => {
    const navigate = useNavigate();
    const buttonStyle = {
        padding: '15px 40px', 
        margin: '0 30px',    
        fontSize: '18px',    
        backgroundColor: '#4f87f0',
        color: 'white',      
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
    };

    const backButtonStyle = {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#9e9a99', 
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    };
return (
    <div>
        <h1><FormattedMessage id="logreg.title" /></h1>
        <h2><FormattedMessage id="logreg.subtitle" /></h2><br/><br/>

        <button onClick={() => navigate('/login')} style={buttonStyle}><FormattedMessage id="global.login" /></button> <FormattedMessage id="logreg.orSeparator" />
        <button onClick={() => navigate('/registro')} style={buttonStyle}><FormattedMessage id="global.registrarse" /></button>
        
        <br/><br/><br/><br/>

        <button className="btn" onClick={() => navigate(-1)} style={backButtonStyle}><FormattedMessage id="global.volver2" /></button>
    </div>
)
}