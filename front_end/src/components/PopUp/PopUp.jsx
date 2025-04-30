import React from 'react';
import { useNavigate } from 'react-router-dom';

const Popup = ({children }) => {
    const nav = useNavigate(); 
    return (
        <div style={overlayStyle}>
            <div style={popupStyle}>
                <button style={closeButtonStyle} onClick={() => {nav(-1)}}>×</button>
                {children}
            </div>
        </div>
    );
};

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000
};

const popupStyle = {
  background: 'white',
  padding: '20px',
  borderRadius: '12px',
  position: 'relative',
  minWidth: '800px',
  maxWidth: '90%',
  maxHeight: "90%"
};

const closeButtonStyle = {
  position: 'absolute',
  top: '0px',
  right: '0px',
  background: 'none',
  border: 'none',
  fontSize: '28px',
  cursor: 'pointer'
};

export default Popup;
