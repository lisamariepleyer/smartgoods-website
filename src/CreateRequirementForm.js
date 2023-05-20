import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from './UserContext';
import Modal from './Modal';

function CreateRequirementForm({ isOpen, onClose }) {
    const { uuid } = useContext(UserContext);

    const [systemName, setSystemName] = useState('');
    const [systemBehavior, setSystemBehavior] = useState('shall');
    const [abilityType, setAbilityType] = useState('');
    const [whom, setWhom] = useState('');
    const [processWord, setProcessWord] = useState('');
    const [requirementDescription, setRequirementDescription] = useState('');
    const [validationResult, setValidationResult] = useState(null);
    const [saveRequirementStatus, setSaveRequirementStatus] = useState('null');
    const [lastButtonClicked, setLastButtonClicked] = useState(null);
    const [ruppsScheme, setRuppsScheme] = useState(true);
    const [systemRequirement, setSystemRequirement] = useState('');

    const handleSystemNameChange = (event) => {
        setSystemName(event.target.value);
    }

    const handleSystemBehaviorChange = (event) => {
        setSystemBehavior(event.target.value);
    };

    const handleAbilityTypeChange = (event) => {
        setAbilityType(event.target.value);
    }

    const handleWhomChange = (event) => {
        setWhom(event.target.value);
    }

    const handleProcessWord = (event) => {
        setProcessWord(event.target.value);
    }

    const handeRequirementDescription = (event) => {
        setRequirementDescription(event.target.value);
    }

    const handleCheckRequirement = async () => {
        const requirementSentence = ruppsScheme ? `${systemName} ${systemBehavior} ${abilityType} ${processWord} ${requirementDescription}` : systemRequirement;

        try {
            setLastButtonClicked('check');
            const response = await fetch('http://localhost:8080/requirement/check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ requirement: requirementSentence }),
            });

            const responseData = await response.json();

            if (responseData === true) {
                setValidationResult("Requirement is valid!");
            } else {
                setValidationResult("Requirement is not valid!");
            }
        } catch (error) {
            console.error('Failed to check the requirement:', error);
        }


    };

    const handleSaveRequirement = async () => {
        const requirementSentence = ruppsScheme ? `${systemName} ${systemBehavior} ${abilityType} ${processWord} ${requirementDescription}` : systemRequirement;
        try {
            setLastButtonClicked('save');
            const response = await fetch(`http://localhost:8080/requirement/save/${uuid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ requirement: requirementSentence }),
            });

            const responseData = await response.json();

            setSaveRequirementStatus(responseData.message);
        } catch (error) {
            console.error('Failed to save the requirement:', error);
        }
    };

    const handleRuppsSchemeChange = () => {
        setRuppsScheme(!ruppsScheme);
        setLastButtonClicked('');
    };

    const handleSystemRequirementChange = (event) => {
        setSystemRequirement(event.target.value);
    };


    useEffect(() => {
        setValidationResult(null)
    }, [systemName, systemBehavior, abilityType, whom, processWord, requirementDescription]);

    return (
        <Modal open={isOpen} onClose={onClose}>
            <h2>Create Requirement</h2>
            <label>
                <input type="checkbox" checked={ruppsScheme} onChange={handleRuppsSchemeChange} />
                Rupp's scheme
            </label>
            <br/>
            <br/>
            { ruppsScheme ? (
                <>
                    <label>
                        System name:<br/>
                        <input type="text" value={systemName} onChange={handleSystemNameChange} />
                    </label>
                    <br/>
                    <br/>
                    <label>
                        {systemName || 'The System'}:<br/>
                        <select value={systemBehavior} onChange={handleSystemBehaviorChange}>
                            <option value="shall">shall</option>
                            <option value="should">should</option>
                            <option value="will">will</option>
                        </select>
                    </label>
                    <br/>
                    <br/>
                    <label>
                        <input type="radio" value="be able to" checked={abilityType === "be able to"} onChange={handleAbilityTypeChange} />
                        be able to
                    </label>
                    <br/>
                    <label>
                        <input type="radio" value={`provide ${whom || '[whom]'} with the ability to`} checked={abilityType === `provide ${whom || '[whom]'} with the ability to`} onChange={handleAbilityTypeChange} />
                        provide {whom || '[whom]'} with the ability to
                    </label>
                    <br/>
                    <br/>
                    <label>
                        Whom:<br/>
                        <input type="text" value={whom} onChange={handleWhomChange} />
                    </label>
                    <br/>
                    <br/>
                    <label>
                        Process word:<br/>
                        <input type="text" value={processWord} onChange={handleProcessWord} />
                    </label>
                    <br/>
                    <br/>
                    <label>
                        Description of the requirement:<br/>
                        <input type="text" value={requirementDescription} onChange={handeRequirementDescription} />
                    </label>
                    <br/>
                    <br/>
                    Full requirement:<br/>
                    {systemBehavior && abilityType && processWord && requirementDescription &&
                        `${systemName || 'The System'} ${systemBehavior} ${abilityType} ${processWord} ${requirementDescription}`
                    }
                </>
            ) : (
                <>
                    <label>
                        System Requirement:<br/>
                        <input type="text" value={systemRequirement} onChange={handleSystemRequirementChange} />
                    </label>
                    <br/>
                    <br/>
                    Full requirement:<br/>
                    {systemRequirement}
                </>
            )
            }
            <br/>
            <br/>
            {
                lastButtonClicked === 'check' && validationResult && <p>{validationResult}</p>
            }
            {
                lastButtonClicked === 'save' && saveRequirementStatus && <p>{saveRequirementStatus}</p>
            }
            {
                lastButtonClicked === '' && ''
            }

            <br/>
            <br/>
            <button onClick={handleCheckRequirement}>Check</button> <button onClick={handleSaveRequirement}>Save</button>
            <br/>
        </Modal>
    )
}

export default CreateRequirementForm;