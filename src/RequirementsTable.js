import React from 'react';

const RequirementsTable = ({ data }) => {

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
                    <td>{item.requirement}</td>
                    <td>{item.ruppScheme ? '✅' : '❌'}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default RequirementsTable;