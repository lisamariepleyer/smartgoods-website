import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../common/UserContext';
import Modal from '../common/Modal';
import { Button, FancyButton } from "../components/Button";

function CreateRequirementForm({ isOpen, onClose }) {
    const { uuid } = useContext(UserContext);

    let requirement = '';

    const [systemName, setSystemName] = useState('The system');
    const [systemBehavior, setSystemBehavior] = useState('shall');
    const [abilityType, setAbilityType] = useState('');
    const [whom, setWhom] = useState('');
    const [processWord, setProcessWord] = useState('');
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

    const buildRequirement = () => {
        if (abilityType === 'be able to') {
            requirement = `${systemName || 'The System'} ${systemBehavior} ${abilityType} ${processWord}`;
        }
        requirement = `${systemName || 'The System'} ${systemBehavior} provide ${whom} with the ability to ${processWord}`;
        return(requirement);
    }

    const handleCheckRequirement = async () => {
        const requirementSentence = ruppsScheme ? buildRequirement() : systemRequirement;

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
        const requirementSentence = ruppsScheme ? buildRequirement() : systemRequirement;
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

            onClose();

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
        setValidationResult(null); setSaveRequirementStatus(null)
    }, [systemName, systemBehavior, abilityType, whom, processWord, systemRequirement]);

    return (
        <Modal open={isOpen} onClose={onClose} popupName={'Create Requirement'}>
            <label>
                <input type="checkbox" checked={ruppsScheme} onChange={handleRuppsSchemeChange} />
                Rupp's scheme
            </label>
            <br/>
            <br/>
            { ruppsScheme ? (
                <>
                    <label>
                        <input className="input-field" type="text" value={systemName} placeholder={'The system'} onChange={handleSystemNameChange} />
                    </label>
                    <br/>
                    <br/>
                    <label>
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
                        <input type="radio" value="provide [whom] with the ability to" checked={abilityType === "provide [whom] with the ability to"} onChange={handleAbilityTypeChange} />
                        provide {whom || '[whom]'} with the ability to
                    </label>
                    <br/>
                    <br/>
                    <label>
                    {(abilityType === "provide [whom] with the ability to") && (
                        <input className="input-field" type="text" value={whom} placeholder={'whom'} onChange={handleWhomChange} />
                    )}
                    </label>
                    <br/>
                    <br/>
                    <label>
                        <input className="input-field" type="text" value={processWord} placeholder={'Process word'} onChange={handleProcessWord} />
                    </label>
                    <br/>
                    <br/>
                    Full requirement:<br/>
                    {systemBehavior && abilityType && processWord &&
                        buildRequirement()
                    }
                </>
            ) : (
                <>
                    System Requirement:<br/><br/>
                    <label>
                        <input className="input-field" type="text" value={systemRequirement} onChange={handleSystemRequirementChange} />
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
            <Button onClick={handleCheckRequirement}>Check</Button><br/>
            <FancyButton onClick={handleSaveRequirement}>Save</FancyButton>
            <br/>
        </Modal>
    )
}

export default CreateRequirementForm;