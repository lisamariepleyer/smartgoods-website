import React from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function LoginPage() {
    let navigate = useNavigate();
    let uuid = 'null';

    const handleLogin = () => {
        navigate('/main');
    }

    const handleRegistration = () => {
        uuid = uuidv4();
    }

    return (
        <div>
            <h2>Login Page</h2>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleRegistration}>Register</button>
            <p><a href="/forgotpassword">Forgot password?</a></p>
            <div>{uuid}</div>
        </div>
    );
}

export default LoginPage;
