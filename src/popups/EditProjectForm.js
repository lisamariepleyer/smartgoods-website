import React, {useContext, useEffect, useState} from 'react';
import { UserContext } from '../common/UserContext';
import Modal from './Modal';
import {Button, FancyButton} from "../components/Button";

function EditProjectForm({ isOpen, onClose, projectName, updateRequirements }) {
    const { currentUser } = useContext(UserContext);

    const [updatedProjectName, setUpdatedProjectName] = useState('');

    const handleSaveProject = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v2/projects/${currentUser.username}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ oldProjectName: projectName, newProjectName: updatedProjectName }),
            });

            const responseData = await response.json();

            updateRequirements();
            onClose();

        } catch (error) {
            console.error('Failed to update project name:', error);
        }
    }

    useEffect(() => {
        setUpdatedProjectName(projectName);
    }, [projectName]);

    const handleInputChange = (event) => {
        setUpdatedProjectName(event.target.value);
    };

    return (
        <Modal open={isOpen} onClose={onClose} popupName="Edit Project">
            <label>
                <input className="input-field" type="text" value={updatedProjectName} onChange={handleInputChange}/>
            </label>
            <br />
            <br />
            <Button onClick={handleSaveProject} disabled={!updatedProjectName.trim()}>Save</Button>
        </Modal>
    );

}

export default EditProjectForm;