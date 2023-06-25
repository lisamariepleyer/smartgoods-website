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

    return (
        <div>
            <MainHeader onPopupClose={fetchProjectsFromServer} projects={projects}/>
            {projects.map(project => (
                <div key={project.id}>
                    <Collapsible label={project.projectName} onEdit={() => handleEditProject(project)}>
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