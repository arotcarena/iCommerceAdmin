import { screen, waitFor } from "@testing-library/react";
import { API_USERS } from "Routes/apiRoutes";
import { SuperCrud } from "UI/SuperCrud"
import { renderIntegrated } from "testUtils/renderIntegrated"
import getCollectionUserResponse from "../../../../../testUtils/fakeData/apiResponse/getCollection/getCollectionUserResponse.json";
import userContext from "../../../../../testUtils/fakeData/apiResponse/context/userContext.json";
import { expectApiRequestCalledWith } from "testUtils/helpers/fetchMockHelpers";
import { getByQuerySelector, submitForm } from "testUtils/helpers/domHelpers";
import { resetStoredFormData } from "functions/storage/form/formDataStorage";

const testUser = getCollectionUserResponse['hydra:member'].find(user => user.email === 'test@email.fr');
if(!testUser) throw new Error('no test user');

describe('CrudCreate', () => {
    afterEach(() => {
        resetStoredFormData('User');
    });

    const setUp = async (): Promise<HTMLElement> => {
        fetchMock.mockResponses(
            [JSON.stringify(userContext), {status: 200}],
            [JSON.stringify(getCollectionUserResponse), {status: 200}],
        );

        const {container} = renderIntegrated(
            (
                <SuperCrud
                    title="Users"
                    entity="User"
                    endpoint={API_USERS}
                    defaultItemsPerPage={20}
                    basePath="/"
                />
            ),
            ['/create'],
            'en'
        );

        await waitFor(() => {
            const inputs = container.querySelectorAll('input');
            expect(inputs.length).toBeGreaterThan(0);
        }, {timeout: 2000});

        return container;
    }

    it('should display fields with column.isEditable false as disabled fields', async () => {
        const container = await setUp();

        expect(getByQuerySelector(container, 'input[name=email]')?.getAttribute('disabled')).toBeNull();
        expect(container.querySelector('input[name=firstName]')?.getAttribute('disabled')).toEqual('');
    })

    it('should display invalid-feedback when some field is invalid', async () => {
        const container = await setUp();

        await submitForm({
            email: 'invalidemail.fr'
        }, container, true);

        expect(getByQuerySelector(container, 'input[name=email] + .invalid-feedback')).toBeInTheDocument();
    })

    it('should send request to create item with correct params', async () => {
        const container = await setUp();

        fetchMock.resetMocks();

        await submitForm({
            email: 'valid@email.fr'
        }, container, true);

        await waitFor(() => {
            expectApiRequestCalledWith(API_USERS, 'POST', {
                email: 'valid@email.fr',
                roles: [],
                plainPassword: '',
                civility: null,
                firstName: '',
                lastName: '',
                jobTitle: '',
            })
        }, {timeout: 2000});
    })

    it('should redirect to SuperCrud index when submit success', async () => {
        const container = await setUp();

        fetchMock.resetMocks();
        
        fetchMock.mockResponse(
            JSON.stringify({}),
            {status: 200}
        );

        await submitForm({
            email: 'valid@email.fr'
        }, container, true);

        expect(screen.getByTestId('location-display').textContent).toEqual('/');
    })

    it('should not redirect when submit fails', async () => {
        const container = await setUp();

        fetchMock.resetMocks();

        fetchMock.mockResponseOnce(
            JSON.stringify({}),
            {status: 500}
        );

        await submitForm({
            email: 'valid@email.fr'
        }, container, true);

        await waitFor(() => {
            expect(screen.getByTestId('location-display').textContent).not.toEqual('/');
        })
    })
})