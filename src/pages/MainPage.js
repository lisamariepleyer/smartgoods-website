import React, { useContext, useState, useEffect } from 'react';

import { fetchProjects } from "../common/FetchProjects";
import { UserContext } from '../common/UserContext';

import RequirementsTable from '../components/RequirementsTable';
import { MainHeader } from '../components/Header';
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
            <MainHeader onPopupClose={fetchProjectsFromServer}/>
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