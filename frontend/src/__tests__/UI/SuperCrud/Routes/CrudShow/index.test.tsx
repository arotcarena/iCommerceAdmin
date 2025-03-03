import { screen, waitFor } from "@testing-library/react";
import { API_USERS } from "Routes/apiRoutes";
import { SuperCrud } from "UI/SuperCrud"
import { renderIntegrated } from "testUtils/renderIntegrated"
import getCollectionUserResponse from "../../../../../testUtils/fakeData/apiResponse/getCollection/getCollectionUserResponse.json";
import userContext from "../../../../../testUtils/fakeData/apiResponse/context/userContext.json";
import getUserResponse from "../../../../../testUtils/fakeData/apiResponse/get/getUserResponse.json";
import { expectApiRequestCalledWith } from "testUtils/helpers/fetchMockHelpers";
import userEvent from "@testing-library/user-event";
import { t } from "i18next";
import { resetStoredFormData } from "functions/storage/form/formDataStorage";
import { fakeUser } from "testUtils/fakeData/entities/fakeUser";

const testUser = getCollectionUserResponse['hydra:member'].find(user => user.email === 'test@email.fr');
if(!testUser) throw new Error('no test user');

describe('CrudShow', () => {
    afterEach(() => {
        resetStoredFormData('User');
    });

    const setUp = async (id: number, basePath?: string): Promise<HTMLElement> => {
        fetchMock.mockResponses(
            [JSON.stringify(getUserResponse), {status: 200}],
            [JSON.stringify(fakeUser), {status: 200}],
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
                    basePath={basePath !== undefined ? basePath: ""}
                />
            ),
            ['/show/'+id],
            'en'
        );

        await waitFor(() => {
            const inputs = container.querySelectorAll('input');
            expect(inputs.length).toBeGreaterThan(0);
            expectApiRequestCalledWith(API_USERS + '/' + testUser.id, 'GET');
        }, {timeout: 2000});

        return container;
    }

    it('should display item values', async () => {
        await setUp(testUser.id);

        expect(screen.getByDisplayValue(testUser.email)).toBeInTheDocument();
        expect(screen.getByDisplayValue(testUser.lastName)).toBeInTheDocument();
    })

    it('should display even fields with column.isEditable false', async () => {
        await setUp(testUser.id);

        expect(screen.queryByDisplayValue(testUser.lastName)).toBeInTheDocument();
    })

    it('should display disabled fields', async () => {
        const container = await setUp(testUser.id);

        const fields = container.querySelectorAll('input, select, textarea');
        fields.forEach(async (field) => {
            await userEvent.click(field);
            expect(field).not.toHaveFocus();
        });
    })

    it('should redirect to correct update page when click on edit', async () => {
        await setUp(testUser.id);
        await userEvent.click(screen.getByText(t('edit')));

        expect(screen.getByTestId('location-display').textContent).toEqual('/update/'+testUser.id);
    })

    it('should ask confirmation when click on delete', async () => {
        await setUp(testUser.id);
        await userEvent.click(screen.getByText(t('delete')));
        
        expect(screen.getByText(t('confirm.delete'))).toBeInTheDocument();
        expect(screen.getByText(t('close'))).toBeInTheDocument();
    })

    it('should send request to delete correct item when confirm delete', async () => {
        await setUp(testUser.id);

        fetchMock.resetMocks();

        await userEvent.click(screen.getByText(t('delete')));
        await userEvent.click(screen.getByText(t('confirm.delete')));

        expectApiRequestCalledWith(API_USERS + '/' + testUser.id, 'DELETE');
    })

    it('should redirect to SuperCrud index when delete success', async () => {
        await setUp(testUser.id, '/');

        fetchMock.resetMocks();
        fetchMock.mockResponse(
            JSON.stringify({}),
            {status: 204}
        );
        await userEvent.click(screen.getByText(t('delete')));
        expect(screen.getByText(t('confirm.delete')));
        await userEvent.click(screen.getByText(t('confirm.delete')));

        await waitFor(() => {
            expect(screen.getByTestId('location-display').textContent).toEqual('/');
            expectApiRequestCalledWith(API_USERS + '/' + testUser.id, 'DELETE');
        }, {timeout: 2000});
    })

    it('should not redirect when delete fails', async () => {
        await setUp(testUser.id);

        fetchMock.resetMocks();
        fetchMock.mockResponseOnce(
            JSON.stringify({}),
            {status: 500}
        );

        await userEvent.click(screen.getByText(t('delete')));
        await userEvent.click(screen.getByText(t('confirm.delete')));

        await waitFor(() => {
            expect(screen.getByTestId('location-display').textContent).not.toEqual('/');
        }, {timeout: 2000});
    })
})