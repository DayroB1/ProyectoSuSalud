import { JSX } from "react";
import { Dialog, DialogPanel, DialogTitle, Description } from "@headlessui/react";
import { FormattedMessage } from "react-intl";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 50,
};

const panelStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  padding: '24px',
  borderRadius: '12px',
  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
  maxWidth: '500px',
  width: '90%',
  maxHeight: '90vh',
  overflowY: 'auto',
  textAlign: 'left',
};

const titleStyle: React.CSSProperties = {
  fontSize: '1.25rem',
  fontWeight: '600',
  color: '#1f2937',
  marginBottom: '12px',
};

const descriptionStyle: React.CSSProperties = {
  marginTop: '8px',
  color: '#4b5563',
};

const detailsStyle: React.CSSProperties = {
  marginTop: '16px',
  fontSize: '0.875rem',
  color: '#374151',
};

const buttonContainerStyle: React.CSSProperties = {
  marginTop: '24px',
  display: 'flex',
  justifyContent: 'flex-end',
};

const buttonStyle: React.CSSProperties = {
  paddingLeft: '16px',
  paddingRight: '16px',
  paddingTop: '8px',
  paddingBottom: '8px',
  backgroundColor: '#2563eb',
  color: 'white',
  borderRadius: '6px',
  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  cursor: 'pointer',
};

function ModalFinal(props: ModalProps): JSX.Element {
  return (
     <Dialog open={props.isOpen} onClose={props.onClose} style={overlayStyle}>
      <DialogPanel style={panelStyle}>
        <DialogTitle style={titleStyle}>
          <FormattedMessage id="app.modal.title"  />
        </DialogTitle>
       <Description style={descriptionStyle}>
          <FormattedMessage id="app.modal.description"  />
        </Description>
        <p style={detailsStyle}>
          <FormattedMessage id="app.modal.details"  />
        </p>
        <div style={buttonContainerStyle}>
          <button 
            onClick={props.onClose} 
            style={buttonStyle}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#1d4ed8')} // Efecto hover
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')} // Restaura color original
          ><FormattedMessage id="app.modal.confirm"  />
          </button>
        </div>
      </DialogPanel>
    </Dialog>
  );
}

export default ModalFinal;