import React from 'react';

const RequirementsTable = ({ data }) => {

    /* Requirement is returned packaged in some additional text:
     "{\r\n    requirement: Some text.\r\n}"
     This function returns the raw requirement which should be shown to the user.
     */
    const extractRequirementText = (requirement) => {
        try {
            const startMarker = 'requirement: ';
            const endMarker = '\r\n}';
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
    
    return (
        <table>
            <thead>
            <tr>
                <th>Requirement</th>
                <th>Validity</th>
            </tr>
            </thead>
            <tbody>
            {data.map((item) => (
                <tr key={item.id}>
                    <td>{extractRequirementText(item.requirement)}</td>
                    <td>{item.ruppScheme ? '✅' : '❌'}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default RequirementsTable;