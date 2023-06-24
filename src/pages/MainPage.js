import React, { useContext, useState, useEffect } from 'react';

import { UserContext } from '../common/UserContext';

import { fetchProjects } from "../common/FetchProjects";
import { MainHeader } from '../components/Header';
import RequirementsTable from '../components/RequirementsTable';
import Collapsible from "../components/Collapsible";

function MainPage() {
    const { currentUser } = useContext(UserContext);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        if (currentUser) {
            fetchProjectsFromServer();
        }
    }, [currentUser]);

    const fetchProjectsFromServer = async () => {
        try {
            const response = await fetchProjects(currentUser);
            setProjects(response);
        } catch (error) {
            throw new Error('Request failed');
        }
    };

    return (
        <div>
            <MainHeader onPopupClose={fetchProjectsFromServer} projects={projects}/>
            <p>Hi {currentUser}!</p>
            {projects.map(project => (
                <div key={project.id}>
                    <Collapsible label={project.projectName}>
                        <RequirementsTable data={project.requirements} updateRequirements={fetchProjectsFromServer}/>
                    </Collapsible>
                </div>
            ))}
        </div>
    );
}

export default MainPage;