import { render, screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { API_USERS } from "Routes/apiRoutes"
import { apiRequest } from "functions/api/apiRequest/apiRequest"
import { generateUrl } from "functions/router/urlGenerator"
import { MouseEvent } from "react"
import { MemoryRouter, useLocation, useNavigate } from "react-router-dom"
import { expectApiRequestCalledWith } from "testUtils/helpers/fetchMockHelpers"
import { LocationDisplay } from "testUtils/renderIntegrated"


describe('ApiRequest errors', () => {

    const TestComponent = () => {
        const history = useNavigate();
        const location = useLocation();

        const handleCallEndpoint = (e: MouseEvent) => {
            e.preventDefault();
            apiRequest<any>(API_USERS, {}, 'GET', history, location).catch((e) => {})
        }

        const handleCallNotExistantEndpoint = (e: MouseEvent) => {
            e.preventDefault();
            apiRequest<any>('/api/not-existant-endpoint', {}, 'GET', history, location).catch((e) => {});
        }

        return (
            <div>
                <p>Test component</p>
                <button type="button" onClick={handleCallEndpoint}>call endpoint</button>
                <button type="button" onClick={handleCallNotExistantEndpoint}>call not existant endpoint</button>
            </div>
        )
    }

    const setUp = (): HTMLElement => {
        const {container} = render(
            <MemoryRouter basename="/">
                <LocationDisplay />
                <TestComponent />
            </MemoryRouter>
        );

        return container;
    }
    
    it('should redirect to login when api return error 401', async () => {
        setUp();
        fetchMock.mockResponseOnce(JSON.stringify({}), {status: 401});

        await userEvent.click(screen.getByText('call endpoint'));

        await waitFor(() => {
            expect(screen.getByTestId('location-display')).toHaveTextContent(generateUrl('login'));
            expectApiRequestCalledWith(API_USERS, 'GET', {});
        }, {timeout: 2000, interval: 1000});
    })

    it('should redirect to error 403 page when api return error 403', async () => {
        setUp();
        fetchMock.mockResponseOnce(JSON.stringify({}), {status: 403});

        await userEvent.click(screen.getByText('call endpoint'));

        await waitFor(() => {
            expect(screen.getByTestId('location-display')).toHaveTextContent(generateUrl('error_403'));
            expectApiRequestCalledWith(API_USERS, 'GET', {});
        }, {timeout: 2000, interval: 1000});
    })

    it('should redirect to error 404 page when api return error 404', async () => {
        setUp();
        fetchMock.mockResponseOnce(JSON.stringify({}), {status: 404});

        await userEvent.click(screen.getByText('call not existant endpoint'));

        await waitFor(() => {
            expect(screen.getByTestId('location-display')).toHaveTextContent(generateUrl('error_404'));
            expectApiRequestCalledWith('/api/not-existant-endpoint', 'GET', {});
        }, {timeout: 2000, interval: 1000});
    })
})