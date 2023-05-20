import React, { useContext, useState, useEffect } from 'react';
import CreateRequirementForm from './CreateRequirementForm';
import { UserContext } from './UserContext';
import RequirementsTable from './RequirementsTable';

function MainPage() {
    const { uuid } = useContext(UserContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [requirements, setRequirements] = useState([]);
    const [inputUUID, setInputUUID] = useState('');

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

            const response = await fetch('http://localhost:8080/requirement/list/all/' + inputUUID);

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

    const handleInputUUID = (event) => {
        setInputUUID(event.target.value);
        event.preventDefault();
        console.log('UUID input:', inputUUID);
        fetchRequirements();
    }

    return (
        <div>
            <h2>Main Page</h2>
            <input type="text" placeholder="UUID" value={inputUUID} onChange={handleInputUUID} />
            <button onClick={handleInputUUID}>Submit</button>
            <p>Your UUID is: {inputUUID}</p>

            <RequirementsTable data={requirements} />

            <button onClick={handleCreateRequirement}>Create Requirement</button>
            <CreateRequirementForm isOpen={isModalOpen} onClose={handleModalClose} />
        </div>
    );
}

export default MainPage;