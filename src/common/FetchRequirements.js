
export const fetchRequirements = async (uuid) => {

    try {
        const response = await fetch('http://localhost:8080/requirement/list/all/' + uuid);

        if (!response.ok) {
            throw new Error('Request failed');
        }

        const responseData = await response.json();
        return responseData;

    } catch (error) {
        console.error(error);
    }
};
