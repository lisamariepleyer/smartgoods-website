import React from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    let navigate = useNavigate();

    const handleLogin = () => {
        navigate('/main');
    }

    return (
        <div>
            <h2>Login Page</h2>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button onClick={handleLogin}>Login</button>
            <button>Register</button>
            <p><a href="/forgotpassword">Forgot password?</a></p>
        </div>
    );
}

export default LoginPage;
