import { useState } from "react";
import ModalFinal from "./Modal";
import { FormattedMessage } from "react-intl";

const Card: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>    
      <div>
        <button onClick={() => setIsModalOpen(true)}>
        <FormattedMessage id="global.info"  />
        </button>
      </div>
      <ModalFinal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Card;