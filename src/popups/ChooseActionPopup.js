import React from 'react';
import Modal from '../popups/Modal';
import { Button } from '../components/Button';

function ChooseActionPopup({ open, onClose, onChoose }) {
    return (
        <Modal open={open} onClose={onClose} popupName="Smart Goods">
            <div>
                <Button onClick={() => onChoose('project')}>Create Project</Button>
                <br/>
                <Button onClick={() => onChoose('requirement')}>Create Requirement</Button>
            </div>

        </Modal>
    )
}

export default ChooseActionPopup;
