import React, {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';

import { v4 as uuidv4 } from 'uuid';
import { UserContext } from '../common/UserContext';

import { Button, FancyButton } from '../components/Button';
import { LoginHeader } from '../components/Header';

function LoginPage() {
    let navigate = useNavigate();
    const { uuid, setUuid } = useContext(UserContext);
    const [serverResponse, setServerResponse] = useState(null);
    const [inputUUID, setInputUUID] = useState('');

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

    const handleChangeInputUUID = (event) => {
        setInputUUID(event.target.value);
    }

    const handleSubmitInputUUID = (event) => {
        event.preventDefault();
        console.log('UUID input:', inputUUID);
        setUuid(inputUUID);
        navigate('/main')
    }

    return (
        <div>
            <LoginHeader />

            <div className="login-container">
                <input className="input-field" type="email" placeholder="E-Mail" />
                <input className="input-field" type="password" placeholder="Password" />

                <Button onClick={handleLogin}>Login</Button>
                <FancyButton onClick={handleRegistration}>Register</FancyButton>
            </div>

            <div className="login-container">
                <input className="input-field" type="text" placeholder="UUID" value={inputUUID} onChange={handleChangeInputUUID}/>
                <Button onClick={handleSubmitInputUUID}>Submit</Button>
                <p><a href="/forgotpassword">Forgot password?</a></p>
            </div>

            {uuid && <div>{uuid}</div>}
            {serverResponse && <div>{serverResponse}</div>}
        </div>
    );
}

export default LoginPage;
