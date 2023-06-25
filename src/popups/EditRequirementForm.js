import React, {useContext, useEffect, useState} from 'react';
import { UserContext } from '../common/UserContext';
import Modal from './Modal';
import {Button, FancyButton} from "../components/Button";


function EditRequirementForm({ isOpen, requirement, requirementId, onClose, updateRequirements, projectName }) {
    const { currentUser } = useContext(UserContext);

    const [systemRequirement, setSystemRequirement] = useState(requirement);
    const [lastButtonClicked, setLastButtonClicked] = useState(null);
    const [validationResult, setValidationResult] = useState(null);
    const [saveRequirementStatus, setSaveRequirementStatus] = useState(null);

    const handleSystemRequirementChange = (event) => {
        setSystemRequirement(event.target.value);
    };

    const handleCheckRequirement = async () => {
        try {
            setLastButtonClicked('check');
            const response = await fetch('http://localhost:8080/api/v2/requirements/check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ requirement: systemRequirement }),
            });

            const responseData = await response.json();

            if (responseData.ruppScheme === true) {
                setValidationResult("Requirement is valid!");
            } else {
                setValidationResult(`Requirement is not valid! Hint: ${responseData.hint}`);
            }
        } catch (error) {
            console.error('Failed to check the requirement:', error);
        }


    };

    const handleSaveRequirement = async () => {
        try {
            setLastButtonClicked('save');
            const response = await fetch(`http://localhost:8080/api/v2/requirements/${requirementId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ projectName: projectName, requirement: systemRequirement }),
            });

            if (!response.ok) {
                throw new Error('Failed to update requirement');
            }

            // if you need to do something after successful save (e.g. update the table), do it here
            const responseData = await response.json();

            setSaveRequirementStatus(responseData.message);
            updateRequirements();
            onClose();

        } catch (error) {
            console.error('Failed to update requirement:', error);
        }
    };

    useEffect(() => {
        setSystemRequirement(requirement);
    }, [requirement]);


    useEffect(() => {
        setValidationResult(null); setSaveRequirementStatus(null)
    }, [systemRequirement]);

    return (
        <Modal open={isOpen} onClose={onClose} popupName="Edit Requirement">
            <label>
                <input className="input-field" type="text" value={systemRequirement} onChange={handleSystemRequirementChange} />
            </label>
            <br />
            <br />
            {
                lastButtonClicked === 'check' && validationResult && <p>{validationResult}</p>
            }
            {
                lastButtonClicked === 'save' && saveRequirementStatus && <p>{saveRequirementStatus}</p>
            }
            {
                lastButtonClicked === '' && ''
            }
            <br />
            <br />
            <Button onClick={handleCheckRequirement}>Check</Button><br/>
            <FancyButton onClick={handleSaveRequirement}>Save</FancyButton>
        </Modal>
    );
}

export default EditRequirementForm;