import React, { useContext, useState, useEffect } from 'react';
import CreateRequirementForm from './CreateRequirementForm';
import { UserContext } from './UserContext';
import RequirementsTable from './RequirementsTable';

function MainPage() {
    const { uuid } = useContext(UserContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [requirements, setRequirements] = useState([]);

    useEffect(() => {
        fetchRequirements();
    }, []);

    const handleCreateRequirement = () => {
        setIsModalOpen(true);
    }

    const handleModalClose = () => {
        setIsModalOpen(false);
    }

    const fetchRequirements = async () => {

        try {

            const response = await fetch('http://localhost:8080/requirement/list/all/' + uuid);

            if (response.ok) {
                const responseData = await response.json();
                setRequirements(responseData);
            } else {
                throw new Error('Request failed');
            }

        } catch (error) {

            console.error(error);

        }
    };

    return (
        <div>
            <h2>Main Page</h2>
            <p>Your UUID is: {uuid}</p>

            <RequirementsTable data={requirements} />

            <button onClick={handleCreateRequirement}>Create Requirement</button>
            <CreateRequirementForm isOpen={isModalOpen} onClose={handleModalClose} />
        </div>
    );
}

export default MainPage;