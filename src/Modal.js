import React from 'react';

function Modal({ open, onClose, children }) {
    if (!open) return null;

    return (
        <div style = {{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', padding: '50px', zIndex: 1000 }}>
            {children}
        </div>
    )
}

export default Modal;