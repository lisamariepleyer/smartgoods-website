import React, { useContext, useState, useEffect } from 'react';

import { fetchRequirements } from "../common/FetchRequirements";
import { UserContext } from '../common/UserContext';

import RequirementsTable from '../components/RequirementsTable';
import { MainHeader } from '../components/Header';

function MainPage() {
    const { currentUser } = useContext(UserContext);
    const [requirements, setRequirements] = useState([]);
    const dev = true;

    useEffect(() => {
        if (currentUser) {
            fetchRequirementsFromServer();
        }
    }, [currentUser]);

    const fetchRequirementsFromServer = async () => {
        try {
            const response = await fetchRequirements(currentUser);
            setRequirements(response);
        } catch (error) {
            throw new Error('Request failed');
        }
    };

    return (
        <div>
            { dev ? (
                <div>
                    <p>Your username is: {currentUser}</p>
                </div>
            ) : (
                <div>
                    <MainHeader onPopupClose={fetchRequirementsFromServer}/>

                    <p>Your UUID is: {currentUser}</p>
                    <RequirementsTable data={requirements} updateRequirements={fetchRequirementsFromServer}/>
                </div>
            ) }
        </div>
    );
}

export default MainPage;