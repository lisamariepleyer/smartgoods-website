import React, {useState} from 'react';
import EditRequirementForm from '../popups/EditRequirementForm';

const RequirementsTable = ({ data, updateRequirements }) => {

    const [hoveredRow, setHoveredRow] = useState(null);
    const [hint, setHint] = useState(null);

    const [editRequirementId, setEditRequirementId] = useState(null);
    const [editRequirementText, setEditRequirementText] = useState('');
    const [projectName, setProjectName] = useState('');

    const handleEdit = (id, requirement) => {
        setEditRequirementId(id);
        setEditRequirementText(requirement);
        setProjectName(projectName);
    }

    const closeEditForm = () => {
        setEditRequirementId(null);
    };

    const handleRowHover = (rowID, rowHint) => {
        setHoveredRow(rowID);
        setHint(rowHint);
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
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item) => (
                    <tr>
                        <td
                            key={item.id}
                            onMouseEnter={() => handleRowHover(item.id, item.hint)}
                            onMouseLeave={() => handleRowHover(null, null)}
                        >
                            {item.isRuppScheme === "true" ? '✅' : '❌'}
                            {hint && hoveredRow === item.id && (
                                <span className="tooltip">
                                    <span className="tooltiptext">
                                        Hint: {hint}
                                    </span>
                                </span>
                            )}
                        </td>
                        <td>{item.requirement}</td>
                        <td onClick={() => handleEdit(item.id, item.requirement, item.projectName)} style={{ cursor: 'pointer' }}>🖊️</td>
                        <td onClick={() => handleDelete(item.id)} style={{ cursor: 'pointer'}}>🗑️</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <EditRequirementForm
                isOpen={editRequirementId !== null}
                requirementId={editRequirementId}
                requirement={editRequirementText}
                updateRequirements={updateRequirements}
                projectName={projectName}
                onClose={closeEditForm}
            />
        </div>
    );
};

export default RequirementsTable;