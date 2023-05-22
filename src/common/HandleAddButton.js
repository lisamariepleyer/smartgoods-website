import React, {useState} from "react";
import CreateRequirementForm from "../pages/CreateRequirementForm";

function HandleAddButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCreateRequirement = () => {
        setIsModalOpen(true);
    }

    const handleModalClose = () => {
        setIsModalOpen(false);
        //fetchRequirements();
    }

    return(
        <>
            <button onClick={handleCreateRequirement}>O</button>
            {isModalOpen && (
                <CreateRequirementForm
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </>
    );
}

export default HandleAddButton;