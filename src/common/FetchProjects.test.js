// fetchProjects.test.js

import { fetchProjects } from './fetchProjects';

// Mock the fetch function
global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ id: 1, name: 'Project 1' }, { id: 2, name: 'Project 2' }]),
    })
);

describe('fetchProjects', () => {
    it('should fetch projects for a given username', async () => {
        const username = 'test';

        // Call the function
        const projects = await fetchProjects(username);

        // Check if fetch was called with the correct URL
        expect(fetch).toHaveBeenCalledWith('http://localhost:8080/api/v2/projects/' + username);
    });

    it('should handle an error if the response is not ok', async () => {
        global.fetch.mockImplementationOnce(() =>
            Promise.resolve({
                ok: false,
                json: () => Promise.resolve({ message: 'Not found' }),
            })
        );

        const username = 'test';

        // Mock console.error to capture the error message
        const consoleErrorMock = jest.fn();
        global.console.error = consoleErrorMock;

        // Call the function
        const projects = await fetchProjects(username);

        // Check if the function logs the error with the correct message
        expect(consoleErrorMock).toHaveBeenCalledWith(new Error('Request failed'));

        // Check if the function returns undefined in case of error
        expect(projects).toBeUndefined();
    });
});