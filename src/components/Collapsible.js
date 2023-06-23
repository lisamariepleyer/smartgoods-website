import React, { useState } from "react";
import { CollapsibleButton } from '../components/Button';

const Collapsible = (props) => {
    const [collapsibleOpen, setCollapsibleOpen] = useState(false);

    const toggle = () => {
        setCollapsibleOpen(!collapsibleOpen);
    };

    return (
        <div>
            <CollapsibleButton onClick={toggle}>
                <span className="button-collapsible-icon">{collapsibleOpen ? '↓' : '→'}</span>
                <span className="text"> {props.label}</span>
            </CollapsibleButton>
            {collapsibleOpen && (
                <div className="toggle">
                    {props.children}
                </div>
            )}
        </div>
    );
};
export default Collapsible;