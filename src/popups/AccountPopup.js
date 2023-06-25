import React, {useContext} from 'react';
import Modal from '../popups/Modal';
import {Button} from "../components/Button";

import { UserContext } from '../common/UserContext';
import {useNavigate} from "react-router-dom";

function AccountPopup({ open, onClose }) {
    let navigate = useNavigate();
    const { currentUser, setCurrentUser } = useContext(UserContext);

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v2/users/' + currentUser.username + '/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setCurrentUser(null);
            navigate('/');

        } catch (error) {
            console.error('Failed to log out:', error);
        }
    };

    return (
        <Modal open={open} onClose={onClose} popupName="Account Info">
            <div>
                <h3>Username</h3>{currentUser.username}
                <h3>First Name</h3>{currentUser.firstName}
                <h3>Last Name</h3>{currentUser.lastName}
                <br/>
                <br/>
                <br/>
                <Button onClick={handleLogout}>Logout</Button><br/>
            </div>
        </Modal>
    )
}

export default AccountPopup;
