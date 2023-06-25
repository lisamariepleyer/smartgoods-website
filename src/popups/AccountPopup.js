import React, {useContext} from 'react';
import Modal from '../popups/Modal';
import {Button} from "../components/Button";

import { UserContext } from '../common/UserContext';

function AccountPopup({ open, onClose }) {
    const { currentUser } = useContext(UserContext);

    return (
        <Modal open={open} onClose={onClose} popupName="Account Info">
            <div>
                <h3>Username</h3>{currentUser.username}
                <h3>First Name</h3>{currentUser.firstName}
                <h3>Last Name</h3>{currentUser.lastName}
            </div>
        </Modal>
    )
}

export default AccountPopup;
