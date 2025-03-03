import { screen, waitFor } from "@testing-library/react";
import { API_USERS } from "Routes/apiRoutes";
import { SuperCrud } from "UI/SuperCrud"
import { renderIntegrated } from "testUtils/renderIntegrated"
import getCollectionUserResponse from "../../../../../testUtils/fakeData/apiResponse/getCollection/getCollectionUserResponse.json";
import userContext from "../../../../../testUtils/fakeData/apiResponse/context/userContext.json";
import getUserResponse from "../../../../../testUtils/fakeData/apiResponse/get/getUserResponse.json";
import { expectApiRequestCalledWith } from "testUtils/helpers/fetchMockHelpers";
import { getByQuerySelector, submitForm } from "testUtils/helpers/domHelpers";
import { resetStoredFormData } from "functions/storage/form/formDataStorage";

const testUser = getCollectionUserResponse['hydra:member'].find(user => user.email === 'test@email.fr');
if(!testUser) throw new Error('no test user');

describe('CrudUpdate', () => {
    afterEach(() => {
        resetStoredFormData('User');
    });
    const setUp = async (id: number): Promise<HTMLElement> => {
        fetchMock.mockResponses(
            [JSON.stringify(getUserResponse), {status: 200}],
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
            ['/update/'+ (id ?? testUser.id)],
            'en'
        );

        await waitFor(() => {
            const inputs = container.querySelectorAll('input');
            expect(inputs.length).toBeGreaterThan(0);
            expectApiRequestCalledWith(API_USERS + '/' + testUser.id, 'GET');
        }, {timeout: 2000});

        return container;
    }

    it('should display form filled with updating item values', async () => {
        await setUp(testUser.id);

        expect(screen.getByDisplayValue(testUser.email)).toBeInTheDocument();
        expect(screen.getByDisplayValue(testUser.lastName)).toBeInTheDocument();
    })

    it('should display fields with column.isEditable false as disabled fields', async () => {
        const container = await setUp(testUser.id);

        expect(container.querySelector('input[name=firstName]')?.getAttribute('disabled')).toEqual('');
    })

    it('should display invalid-feedback when some field is invalid', async () => {
        const container = await setUp(testUser.id);

        await submitForm({
            email: 'invalidemail.fr'
        }, container, true);

        expect(getByQuerySelector(container, 'input[name=email] + .invalid-feedback')).toBeInTheDocument();
    })

    it('should send request with correct params to update correct item', async () => {
        const container = await setUp(testUser.id);

        fetchMock.resetMocks();

        await submitForm({
            email: 'valid@email.fr'
        }, container, true);

        await waitFor(() => {
            expectApiRequestCalledWith(API_USERS + '/' + testUser.id, 'PUT', {
                id: testUser.id,
                email: 'valid@email.fr',
                roles: testUser.roles,
                civility: testUser.civility,
                firstName: testUser.firstName,
                lastName: testUser.lastName,
                jobTitle: testUser.jobTitle,
                emailSignature: testUser.emailSignature,
                plainPassword: ''
            })
        }, {timeout: 2000});
    })

    it('should redirect to base path when submit success', async () => {
        const container = await setUp(testUser.id);

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
        const container = await setUp(testUser.id);

        fetchMock.mockResponseOnce(
            JSON.stringify({}),
            {status: 500}
        );

        await submitForm({
            email: 'valid@email.fr'
        }, container, true);

        expect(screen.getByTestId('location-display').textContent).toEqual('/update/' + testUser.id);
    })
})