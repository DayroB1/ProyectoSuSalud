import React from 'react';

interface CardHomeProps {
  imageUrl: string;
  description: string;
}

const CardHome: React.FC<CardHomeProps> = ({ imageUrl, description }) => {
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
      <div style={{ display: 'flex', flexDirection: 'column', width: '400px' }}>
        <img src={imageUrl} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
        <div style={{ padding: '16px' }}>
          <p>{description}</p>
        </div>
      </div>
      <div style={{ borderLeft: '1px solid #ccc', width: '1px' }}></div>
    </div>
  );
};

export default CardHome;