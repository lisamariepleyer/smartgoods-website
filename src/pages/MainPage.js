import React, { useContext, useState, useEffect } from 'react';

import { fetchRequirements } from "../common/FetchRequirements";
import { UserContext } from '../common/UserContext';

import RequirementsTable from '../components/RequirementsTable';
import { MainHeader } from '../components/Header';

function MainPage() {
    const { uuid } = useContext(UserContext);
    const [requirements, setRequirements] = useState([]);

    useEffect(() => {
        fetchRequirementsFromServer();
    }, []);

    const fetchRequirementsFromServer = async () => {
        try {
            const response = await fetchRequirements(uuid);
            setRequirements(response);
        } catch (error) {
            throw new Error('Request failed');
        }
    };

    return (
        <div>
            <MainHeader onPopupClose={fetchRequirementsFromServer}/>

            <p>Your UUID is: {uuid}</p>
            <RequirementsTable data={requirements} />
        </div>
    );
}

export default MainPage;