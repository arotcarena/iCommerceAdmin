import { screen } from "@testing-library/react";
import App from "App"
import { storeAuthToken } from "functions/storage/auth/authTokenStorage";
import { renderIntegratedExceptRouter } from "testUtils/renderIntegratedExceptRouter";

describe('Error404', () => {
    it('should display error 404 page when not existant url', async () => {
        // storeAuthToken('auth_token');
        // renderIntegratedExceptRouter(<App />, ['/not-existant-url']);

        // expect(screen.getByText('404')).toBeInTheDocument();
    })

    it('should display error 404 page when /error404 url', async () => {
        // storeAuthToken('auth_token');
        // renderIntegratedExceptRouter(<App />, ['/error_404']);

        // expect(screen.getByText('404')).toBeInTheDocument();
    })
})