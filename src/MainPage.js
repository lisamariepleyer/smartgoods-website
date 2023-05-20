import React, { useContext, useState } from 'react';
import CreateRequirementForm from './CreateRequirementForm';
import { UserContext } from './UserContext';

function MainPage() {
    const { uuid } = useContext(UserContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCreateRequirement = () => {
        setIsModalOpen(true);
    }

    const handleModalClose = () => {
        setIsModalOpen(false);
    }

    return (
        <div>
            <h2>Main Page</h2>
            <p>Your UUID is {uuid}</p>
            <button onClick={handleCreateRequirement}>Create Requirement</button>
            <CreateRequirementForm isOpen={isModalOpen} onClose={handleModalClose} />
        </div>
    );
}

export default MainPage;