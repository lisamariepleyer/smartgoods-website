import React, {useContext} from 'react';
import { UserContext } from './UserContext';

function MainPage() {
    const { uuid } = useContext(UserContext);
    return (
        <div>
            <h2>Main Page</h2>
            <p>Your UUID is {uuid}</p>
        </div>
    );
}

export default MainPage;
