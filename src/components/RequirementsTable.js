import React from 'react';
import {fetchRequirements} from "../common/FetchRequirements";

const RequirementsTable = ({ data, updateRequirements }) => {

    /* Requirement is returned packaged in some additional text:
     "{\r\n    requirement: Some text.\r\n}"
     This function returns the raw requirement which should be shown to the user.
     */
    const extractRequirementText = (requirement) => {
        try {
            const startMarker = 'requirement:';
            const endMarker = '}';
            const startIndex = requirement.indexOf(startMarker);
            const endIndex = requirement.indexOf(endMarker, startIndex + startMarker.length);
            if (startIndex !== -1 && endIndex !== -1) {
                return requirement.substring(startIndex + startMarker.length, endIndex);
            }
        } catch (error) {
            console.error('Error parsing requirement:', error);
            return 'error';
        }
    };


    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/requirement/delete/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete requirement');
            }

            updateRequirements();
        } catch (error) {
            console.error('Failed to delete requirement:', error);
        }
    };

    return (
        <table className="requirements-table">
            <thead>
            <tr>
                <th>Validity</th>
                <th>Requirement</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            {data.map((item) => (
                <tr key={item.id}>
                    <td>{item.ruppScheme ? '✅' : '❌'}</td>
                    <td>{extractRequirementText(item.requirement)}</td>
                    <td onClick={() => handleDelete(item.id)} style={{ cursor: 'pointer'}}>🗑️</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default RequirementsTable;