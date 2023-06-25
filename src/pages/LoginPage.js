import React, {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../common/UserContext';

import { Button, FancyButton } from '../components/Button';
import { LoginHeader } from '../components/Header';

function LoginPage() {
    let navigate = useNavigate();
    const { currentUser, setCurrentUser } = useContext(UserContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

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

            if (username !== responseData.username) {
                setServerResponse(responseData.info);
                console.error('Login failed:', responseData.info);
            } else {
                const firstName = responseData.firstName;
                const lastName = responseData.lastName;

                setCurrentUser({ username, firstName, lastName });
                navigate('/main');
            }

        } catch (error) {

            setServerResponse('Ooops! Something went wrong. Please try again.');
            console.error('Log in failed:', error);

        }
    }

    const handleRegistration = async () => {

        try {

            const response = await fetch('http://localhost:8080/api/v2/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    firstName: firstName,
                    lastName: lastName,
                    password: password
                })
            });

            const responseData = await response.json();

            if (username !== responseData.username) {
                setServerResponse(responseData.info);
                console.error('Registration failed:', responseData.info);
            } else {
                setIsRegistering(false);
                setCurrentUser({ username, firstName, lastName });
                navigate('/main');
            }

        } catch (error) {

            setServerResponse('Ooops! Something went wrong. Please try again.');
            console.error('Registration failed:', error);

        }

    }

    const handleRegistrationButtonClicked = () => {
        setIsRegistering(!isRegistering);
    }

    const handleUsernameInput = (event) => {
        setUsername(event.target.value);
    };

    const handleFirstNameInput = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastNameInput = (event) => {
        setLastName(event.target.value);
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
                {serverResponse && <warning>{serverResponse}</warning>}
            </div>

            { isRegistering ? (
                <div className="login-container">
                    <input className="input-field" type="username" placeholder="Username" onChange={handleUsernameInput}/>
                    <input className="input-field" type="firstName" placeholder="First Name" onChange={handleFirstNameInput}/>
                    <input className="input-field" type="lastName" placeholder="Last Name" onChange={handleLastNameInput}/>
                    <input className="input-field" type="password" placeholder="Password" onChange={handlePasswordInput}/>

                    <FancyButton onClick={handleRegistration}>Register</FancyButton>
                </div>
            ) : (
                <div className="login-container">
                    <p><a href="/forgotpassword">Forgot password?</a></p>
                    <FancyButton onClick={handleRegistrationButtonClicked}>Register</FancyButton>
                </div>
            ) }
        </div>
    );
}

export default LoginPage;
