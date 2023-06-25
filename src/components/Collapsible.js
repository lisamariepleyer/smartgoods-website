import React, { useState } from "react";
import { CollapsibleButton } from '../components/Button';

const Collapsible = ({ label, onEdit, onDelete, children }) => {
    const [collapsibleOpen, setCollapsibleOpen] = useState(false);

    const toggle = () => {
        setCollapsibleOpen(!collapsibleOpen);
    };

    return (
        <div>
            <CollapsibleButton onClick={toggle}>
                <span className="button-collapsible-icon">{collapsibleOpen ? '↓' : '→'}</span>
                <span className="text">{label}</span>
                <span onClick={(e) => { e.stopPropagation(); onEdit(); }}>&#160;🖊️</span>
                <span onClick={(e) => { e.stopPropagation(); onDelete(); }}>&#160;🗑️</span>
            </CollapsibleButton>
            {collapsibleOpen && (
                <div className="toggle">
                    {children}
                </div>
            )}
        </div>
    );
};
export default Collapsible;