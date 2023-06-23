import React from 'react';

const RequirementsTable = ({ data, updateRequirements }) => {

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
                    <td>{item.isRuppScheme === "true" ? '✅' : '❌'}</td>
                    <td>{item.requirement}</td>
                    <td onClick={() => handleDelete(item.id)} style={{ cursor: 'pointer'}}>🗑️</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default RequirementsTable;