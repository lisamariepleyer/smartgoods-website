import React, { useContext, useState } from 'react';
import Modal from '../popups/Modal';
import { Button } from '../components/Button';
import { UserContext } from "../common/UserContext";

function CreateProjectForm({ isOpen, onClose, onUpdateProjects }) {
    const { currentUser } = useContext(UserContext);
    const [projectName, setProjectName] = useState('');

    const handleProjectNameChange = (event) => {
        setProjectName(event.target.value);
    }

    const handleSaveProject = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v2/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: currentUser.username, projectName: projectName }),
            });

            const responseData = await response.json();

            if (response.ok) {
                console.log(responseData);
                onUpdateProjects();
                onClose();
            } else {
                console.error('Failed to save the project:', responseData);
            }
        } catch (error) {
            console.error('Failed to save the project:', error);
        }
    };

    return (
        <Modal open={isOpen} onClose={onClose} popupName={'Create Project'}>
            <input
                className="input-field"
                type="text"
                value={projectName}
                placeholder={'Project Name'}
                onChange={handleProjectNameChange}
            />
            <br />
            <br />
            <Button onClick={handleSaveProject} disabled={!projectName.trim()}>Save</Button>
        </Modal>
    );
}

export default CreateProjectForm;
