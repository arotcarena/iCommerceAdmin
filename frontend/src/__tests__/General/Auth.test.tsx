import { screen, waitFor } from "@testing-library/react";
import App from "App"
import { generateUrl } from "functions/router/urlGenerator";
import { storeAuthToken } from "functions/storage/auth/authTokenStorage";
import { t } from "i18next";
import { renderIntegratedExceptRouter } from "testUtils/renderIntegratedExceptRouter";

describe('Auth', () => {
    const setUp = (browserHistory: string[]): HTMLElement => {
        const {container} = renderIntegratedExceptRouter(
            <App />,
            browserHistory,
            'en'
        );

        return container;
    }

    it('should redirect to login when try to access page under authentication without token', () => {
        setUp([generateUrl('profile')]);
        expect(screen.getByText(t('login')));
    })

    it('should not redirect to login when try to access page under authentication with token', async () => {
        // storeAuthToken('auth_token');
        // setUp([generateUrl('profile')]);

        // await waitFor(() => {
        //     expect(screen.getByText(t('profile')));
        // }, {timeout: 2000});
    })
})