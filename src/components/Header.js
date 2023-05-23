import React, {useContext, useState} from 'react';

import logoImage from '../img/smartgoods_logo.png';
import { RoundButton } from "./Button";
import CreateRequirementForm from "../pages/CreateRequirementForm";
import { fetchRequirements } from "../common/FetchRequirements";
import { UserContext } from "../common/UserContext";

const LoginHeader = () => {
    return (
        <header className="login-container">
            <h1>Smart Goods</h1>
            <img src={logoImage} alt="Logo" style={{ width: '150px', height: 'auto' }} />
        </header>
    );
};

const MainHeader = ({ onPopupClose }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { uuid } = useContext(UserContext);
    const [requirements, setRequirements] = useState([]);

    const handleCreateRequirement = () => {
        setIsModalOpen(true);
    }

    const handleCreateRequirementClose = async () => {
        try {
            const response = await fetchRequirements(uuid);
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
                <RoundButton onClick={handleCreateRequirement}>+</RoundButton>
                {isModalOpen && (
                    <CreateRequirementForm
                        isOpen={isModalOpen}
                        onClose={handleCreateRequirementClose}
                    />
                )}
                <RoundButton>P</RoundButton>
            </div>
        </header>
    );
};

export { LoginHeader, MainHeader };