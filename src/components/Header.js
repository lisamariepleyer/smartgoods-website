import React from 'react';
import logoImage from '../img/smartgoods_logo.png';

const LoginHeader = () => {
    return (
        <header className="container">
            <h1>Smart Goods</h1>
            <img src={logoImage} alt="Logo" style={{ width: '150px', height: 'auto' }} />
        </header>
    );
};

export { LoginHeader };