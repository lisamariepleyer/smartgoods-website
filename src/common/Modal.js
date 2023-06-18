import React from 'react';
import { RoundButton } from '../components/Button';

function Modal({ open, onClose, popupName, children }) {
    if (!open) return null;

    return (
        <div style = {{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', padding: '50px', zIndex: 1000, borderStyle: "solid", borderWidth: 1 }}>
            <header className="header-container">
                <h2>{popupName}</h2> <RoundButton onClick={onClose}>X</RoundButton>
            </header>
            {children}
        </div>
    )
}

export default Modal;