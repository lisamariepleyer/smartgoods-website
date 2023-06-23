import React, {useState} from 'react';

const RequirementsTable = ({ data, updateRequirements }) => {

    const [hoveredRow, setHoveredRow] = useState(null);

    const handleRowHover = (hint) => {
        setHoveredRow(hint);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/v2/requirements/${id}`, {
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
        <div>
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
                    <tr
                        key={item.id}
                        onMouseEnter={() => handleRowHover(item.hint)}
                        onMouseLeave={() => handleRowHover(null)}
                    >
                        <td>{item.isRuppScheme === "true" ? '✅' : '❌'}</td>
                        <td>{item.requirement}</td>
                        <td onClick={() => handleDelete(item.id)} style={{ cursor: 'pointer'}}>🗑️</td>
                    </tr>
                ))}
                </tbody>
            </table>
            {hoveredRow && (
                <span className="tooltip">
                    <span className="tooltiptext">
                        Hint: {hoveredRow}
                    </span>
                </span>
            )}
        </div>
    );
};

export default RequirementsTable;