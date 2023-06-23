
export const fetchProjects = async (username) => {

    try {
        const response = await fetch('http://localhost:8080/api/v2/projects/' + username);

        if (!response.ok) {
            throw new Error('Request failed');
        }

        return await response.json();

    } catch (error) {
        console.error(error);
    }
};
