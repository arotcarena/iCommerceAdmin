import { waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { API_LOGIN } from "Routes/apiRoutes"
import { AppConfig } from "config/AppConfig"
import { generateUrl } from "functions/router/urlGenerator"
import { Login } from "pages/Authentication/Login"
import { expectCustomFetchCalledWith } from "testUtils/helpers/fetchMockHelpers"
import { getTestLocation } from "testUtils/helpers/locationHelper"
import { renderIntegrated } from "testUtils/renderIntegrated"

describe('Login', () => {
    const setUp = async (): Promise<{
        container: HTMLElement,
        usernameInput: Element|null,
        passwordInput: Element|null,
        tryLogin: (username: string|null, password?: string) => Promise<void>
    }> => {
        const {container} = renderIntegrated(
            <Login />
            , 
            [generateUrl('login')]
        );

        const usernameInput = container.querySelector('form input[name=username]');
        const passwordInput = container.querySelector('form input[name=password]');
        const submitButton = container.querySelector('form button[type=submit]');

        const tryLogin = async (username: string|null = null, password?: string): Promise<void> => {
            if(usernameInput && passwordInput && submitButton) {
                if(username) {
                    await userEvent.type(usernameInput, username);
                }
                if(password) {
                    await userEvent.type(passwordInput, password);
                }
                await userEvent.click(submitButton);
            } else {
                throw new Error('test failed');
            }
        } 
        return {
            container,
            usernameInput,
            passwordInput,
            tryLogin
        };
    }

    it('should render form', async () => {
        const {usernameInput, passwordInput} = await setUp();
        expect(usernameInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
    })

    it('should display invalid-feedback when no password', async () => {
        const {tryLogin, container} = await setUp();

        await tryLogin('test@email.fr');
        const invalidFeedback = container.querySelector('.invalid-feedback');
        expect(invalidFeedback).toBeInTheDocument();
    })

    it('should display invalid-feedback when no username', async () => {
        const {tryLogin, container} = await setUp();

        await tryLogin(null, 'password');
        const invalidFeedback = container.querySelector('.invalid-feedback');
        expect(invalidFeedback).toBeInTheDocument();
    })

    it('should display alert when bad credentials', async () => {
        const {tryLogin, container} = await setUp();

        fetchMock.mockResponseOnce(JSON.stringify({
            code: 401,
            message: 'Invalid credentials.'
        }), {status: 401});

        await tryLogin('test@email.fr', 'wrong_password');

        expectCustomFetchCalledWith(AppConfig.API_BASE_URL + API_LOGIN, 'POST', {
            username: 'test@email.fr',
            password: 'wrong_password'
        });

        await waitFor(() => {
            expect(container.querySelector('.alert.alert-danger')).toBeInTheDocument()
        });

        expect(getTestLocation()).toEqual(generateUrl('login'));
    })

    it('should not display alert when good credentials', async () => {
        const {tryLogin, container} = await setUp();

        fetchMock.mockResponses(
            [JSON.stringify({token: 'example_token'}), {status: 200}],
            [JSON.stringify({}), {status: 200}], // handledCompanies request
        )

        await tryLogin('test@email.fr', 'password');
        
        expectCustomFetchCalledWith(AppConfig.API_BASE_URL + API_LOGIN, 'POST', {
            username: 'test@email.fr',
            password: 'password'
        });

        await waitFor(() => {
            expect(container.querySelector('.alert.alert-danger')).not.toBeInTheDocument()
        });
    })

    it('should redirect to home by default when good credentials', async () => {
        const {tryLogin, container} = await setUp();

        fetchMock.mockResponseOnce(JSON.stringify({
            token: 'example_token'
        }), {status: 200});

        await tryLogin('test@email.fr', 'password');
        
        expectCustomFetchCalledWith(AppConfig.API_BASE_URL + API_LOGIN, 'POST', {
            username: 'test@email.fr',
            password: 'password'
        });

    })
})




