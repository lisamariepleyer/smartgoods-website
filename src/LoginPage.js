import React, {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { UserContext } from './UserContext';
import { Button, FancyButton, RoundButton } from './components/Button';

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
            <h2>Login Page</h2>
            <hr className="divider" />

            <input className="input-field" type="email" placeholder="E-Mail" /><br />
            <input className="input-field" type="password" placeholder="Password" /><br />

            <Button onClick={handleLogin}>Login</Button><br />
            <FancyButton onClick={handleRegistration}>Register</FancyButton><br />

            <hr className="short-divider" />

            <input className="input-field" type="text" placeholder="UUID" value={inputUUID} onChange={handleChangeInputUUID}/>
            <Button onClick={handleSubmitInputUUID}>Submit</Button>

            <hr className="short-divider" />

            <p><a href="/forgotpassword">Forgot password?</a></p>
            {uuid && <div>{uuid}</div>}
            {serverResponse && <div>{serverResponse}</div>}
        </div>
    );
}

export default LoginPage;
