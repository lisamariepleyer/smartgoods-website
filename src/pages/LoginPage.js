import React, {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';

import { v4 as uuidv4 } from 'uuid';
import { UserContext } from '../common/UserContext';

import { Button, FancyButton } from '../components/Button';
import { LoginHeader } from '../components/Header';

function LoginPage() {
    let navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [serverResponse, setServerResponse] = useState(null);

    const handleLogin = async () => {

        try {
            const response = await fetch('http://localhost:8080/api/v2/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });

            const responseData = await response.json();

            if (username != responseData.username) {
                setServerResponse(responseData.info);
            } else {
                setServerResponse('Logging in ...');
                //navigate('/main');
            }

        } catch (error) {
            setServerResponse(error);
            console.error('Log in failed:', error);
        }
    }

    const handleRegistration = async () => {

        const response = await fetch(`http://localhost:8080/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ uuid: uuidv4() })
        });

        const responseData = await response.json();

        setServerResponse(responseData.message);
    }

    const handleRegistrationButtonClicked = () => {
        setIsRegistering(true);
    }

    const handleUsernameInput = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordInput = (event) => {
        setPassword(event.target.value);
    };

    return (
        <div>
            <LoginHeader />

            <div className="login-container">
                <input className="input-field" type="username" placeholder="Username" onChange={handleUsernameInput}/>
                <input className="input-field" type="password" placeholder="Password" onChange={handlePasswordInput}/>

                <Button onClick={handleLogin}>Login</Button>
            </div>

            { isRegistering ? (
                <div className="login-container">
                    <p><a href="/forgotpassword">Forgot password?</a></p>
                    <FancyButton onClick={handleRegistrationButtonClicked}>Registering</FancyButton>
                </div>
            ) : (
                <div className="login-container">
                    <p><a href="/forgotpassword">Forgot password?</a></p>
                    <FancyButton onClick={handleRegistrationButtonClicked}>Register</FancyButton>
                </div>
            ) }

            {serverResponse && <div>{serverResponse}</div>}
        </div>
    );
}

export default LoginPage;
