import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function LoginPage() {
    let navigate = useNavigate();
    const [uuid, setUuid] = useState(null);
    const [serverResponse, setServerResponse] = useState(null);

    const handleLogin = () => {
        navigate('/main');
    }

    const handleRegistration = async () => {
        const newUuid = uuidv4();
        setUuid(newUuid);

        const response = await fetch(`http://localhost:8080/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ uuid: newUuid })
        });

        const responseData = await response.json();

        setServerResponse(responseData.message);
    }

    return (
        <div>
            <h2>Login Page</h2>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleRegistration}>Register</button>
            <p><a href="/forgotpassword">Forgot password?</a></p>
            {uuid && <div>{uuid}</div>}
            {serverResponse && <div>{serverResponse}</div>}
        </div>
    );
}

export default LoginPage;
