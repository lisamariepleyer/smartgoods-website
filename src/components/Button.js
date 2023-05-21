import React from 'react';
import './Components.css';

const Button = ({ children, onClick }) => {
    return (
        <button className="button-rectangle" onClick={onClick}>
            {children}
        </button>
    );
};

const FancyButton = ({ children, onClick }) => {
    return (
        <button className="button-fancy" onClick={onClick}>
            {children}
        </button>
    );
};

const RoundButton = ({ children, onClick }) => {
    return (
        <button className="button-round" onClick={onClick}>
            {children}
        </button>
    );
};

export { Button, FancyButton, RoundButton };
