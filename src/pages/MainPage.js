import React, { useContext, useState, useEffect } from 'react';

import { UserContext } from '../common/UserContext';
import RequirementsTable from '../components/RequirementsTable';
import { MainHeader } from '../components/Header';
import {fetchRequirements} from "../common/FetchRequirements";

function MainPage() {
    const { uuid } = useContext(UserContext);
    const [requirements, setRequirements] = useState([]);

    useEffect(() => {
        const fetchRequirementsFromServer = async () => {
            try {
                const response = await fetchRequirements(uuid);
                setRequirements(response);
            } catch (error) {
                throw new Error('Request failed');
            }
        };

        fetchRequirementsFromServer();
    }, [uuid]);

    return (
        <div>
            <MainHeader />
            <p>Your UUID is: {uuid}</p>

            <RequirementsTable data={requirements} />
        </div>
    );
}

export default MainPage;