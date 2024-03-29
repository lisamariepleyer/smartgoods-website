import React, { useContext, useState, useEffect } from 'react';

import { UserContext } from '../common/UserContext';

import { fetchProjects } from "../common/FetchProjects";
import { MainHeader } from '../components/Header';
import RequirementsTable from '../components/RequirementsTable';
import Collapsible from "../components/Collapsible";
import EditProjectForm from "../popups/EditProjectForm"

function MainPage() {
    const { currentUser } = useContext(UserContext);
    const [projects, setProjects] = useState([]);
    const [editProjectFormOpen, setEditProjectFormOpen] = useState(false);
    const [currentProject, setCurrentProject] = useState(null);

    useEffect(() => {
        if (currentUser.username) {
            fetchProjectsFromServer();
        }
    }, [currentUser.username]);

    const fetchProjectsFromServer = async () => {
        try {
            const response = await fetchProjects(currentUser.username);
            setProjects(response);
        } catch (error) {
            throw new Error('Request failed');
        }
    };

    const handleEditProject = (project) => {
        setCurrentProject(project);
        setEditProjectFormOpen(true);
    };

    const handleDeleteProject = async (project) => {
        try {
            const response = await fetch(`http://localhost:8080/api/v2/projects/${project.id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log(`Project with id ${project.id} deleted successfully.`);
                fetchProjectsFromServer();
            } else {
                console.error('Failed to delete the project:', await response.text());
            }
        } catch (error) {
            console.error('Failed to delete the project:', error);
        }
    };

    return (
        <div>
            <MainHeader onPopupClose={fetchProjectsFromServer} projects={projects}/>
            {projects.map(project => (
                <div key={project.id}>
                    <Collapsible label={project.projectName} onEdit={() => handleEditProject(project)} onDelete={() => handleDeleteProject(project)}>
                        <RequirementsTable data={project.requirements} updateRequirements={fetchProjectsFromServer}/>
                    </Collapsible>
                </div>
            ))}
            {currentProject &&
                <EditProjectForm
                    isOpen={editProjectFormOpen}
                    updateRequirements={fetchProjectsFromServer}
                    onClose={() => setEditProjectFormOpen(false)}
                    projectName={currentProject.projectName}
                />
            }
        </div>
    );
}

export default MainPage;