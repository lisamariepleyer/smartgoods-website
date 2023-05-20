import React, {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { UserContext } from './UserContext';

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
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />

            <button onClick={handleLogin}>Login</button>
            <button onClick={handleRegistration}>Register</button>

            <br />

            <input type="text" placeholder="UUID" value={inputUUID} onChange={handleChangeInputUUID}/>
            <button onClick={handleSubmitInputUUID}>Submit</button>

            <p><a href="/forgotpassword">Forgot password?</a></p>
            {uuid && <div>{uuid}</div>}
            {serverResponse && <div>{serverResponse}</div>}
        </div>
    );
}

export default LoginPage;
