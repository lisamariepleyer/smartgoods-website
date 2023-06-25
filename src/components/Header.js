import React, {useContext, useState} from 'react';

import logoImage from '../img/smartgoods_logo.png';
import { RoundButton } from "./Button";
import CreateRequirementForm from "../popups/CreateRequirementForm";
import CreateProjectForm from "../popups/CreateProjectForm"
import ChooseActionPopup from "../popups/ChooseActionPopup";
import AccountPopup from "../popups/AccountPopup";
import { fetchProjects } from "../common/FetchProjects";
import { UserContext } from "../common/UserContext";


const LoginHeader = () => {
    return (
        <header className="login-container">
            <h1>Smart Goods</h1>
            <img src={logoImage} alt="Logo" style={{ width: '150px', height: 'auto' }} />
        </header>
    );
};

const MainHeader = ({ onPopupClose, projects }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { uuid } = useContext(UserContext);
    const [requirements, setRequirements] = useState([]);

    const [showChooseActionPopup, setShowChooseActionPopup] = useState(false);
    const [chosenAction, setChosenAction] = useState(null);

    const [showAccountPopup, setShowAccountPopup] = useState(false);

    const handlePlusButton = () => {
        setShowChooseActionPopup(true);
    }

    const handleChooseAction = (action) => {
        setChosenAction(action);
        setShowChooseActionPopup(false);
    }

    const handleAccountButton = (action) => {
        setShowAccountPopup(true);
    }

    const handleCreateRequirementClose = async () => {
        try {
            const response = await fetchProjects(uuid);
            setRequirements(response);
        } catch (error) {
            throw new Error('Request failed');
        }

        setIsModalOpen(false);
        onPopupClose();
    };

    return (
        <header className="header-container">
            <div style={{marginTop: "35px"}}>
                <img src={logoImage} alt="logo" style={{ width: '50px', height: 'auto' }} />
            </div>
            <div>
                <h1>Smart Goods</h1>
            </div>
            <div className="buttons" style={{marginTop: "35px"}}>
                <RoundButton onClick={handlePlusButton}>+</RoundButton>
                <ChooseActionPopup
                    open={showChooseActionPopup}
                    onClose={() => setShowChooseActionPopup(false)}
                    onChoose={handleChooseAction}
                />
                {chosenAction === 'project' && (
                    <CreateProjectForm
                        isOpen={chosenAction === 'project'}
                        onClose={() => setChosenAction(null)}
                        onUpdateProjects={onPopupClose}
                    />
                )}
                {chosenAction === 'requirement' && (
                    <CreateRequirementForm
                        isOpen={chosenAction === 'requirement'}
                        onClose={() => setChosenAction(null)}
                        projects={projects}
                        onUpdateProjects={onPopupClose}
                    />
                )}

                <RoundButton onClick={handleAccountButton}>A</RoundButton>
                <AccountPopup open={showAccountPopup}
                              onClose={() => setShowAccountPopup(false)}
                />
            </div>
        </header>
    );
};

export { LoginHeader, MainHeader };