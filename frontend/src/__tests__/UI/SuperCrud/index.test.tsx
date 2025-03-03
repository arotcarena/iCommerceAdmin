import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { API_USERS } from "Routes/apiRoutes";
import { SuperCrud } from "UI/SuperCrud";
import { getByQuerySelector } from "testUtils/helpers/domHelpers";
import { renderIntegrated } from "testUtils/renderIntegrated";
import getCollectionUserResponse from "../../../testUtils/fakeData/apiResponse/getCollection/getCollectionUserResponse.json";
import userContext from "../../../testUtils/fakeData/apiResponse/context/userContext.json";
import getCollectionUserWithOnlyTestUserResult from "../../../testUtils/fakeData/apiResponse/getCollection/filtered/email/getCollectionUserWithOnlyTestUserResult.json";
import getCollectionUserWith5ItemsPerPageResponse from "../../../testUtils/fakeData/apiResponse/getCollection/filtered/itemsPerPage/getCollectionUserWith5ItemsPerPageResponse.json";
import getCollectionUserOrderByFirstNameAsc from "../../../testUtils/fakeData/apiResponse/getCollection/ordered/firstName/getCollectionUserOrderedByFirstNameAsc.json";
import getCollectionUserOrderByFirstNameDesc from "../../../testUtils/fakeData/apiResponse/getCollection/ordered/firstName/getCollectionUserOrderedByFirstNameDesc.json";
import getCollectionUserPage2 from "../../../testUtils/fakeData/apiResponse/getCollection/pagination/getCollectionUserPage2.json";
import { t } from "i18next";
import { expectApiRequestCalledWith } from "testUtils/helpers/fetchMockHelpers";
import { resetSuperCrudStoredFilters } from "functions/storage/superCrud/superCrudFiltersStorage";
import { resetStoredColumnsSelection } from "functions/storage/superCrud/columnsSelectionStorage";
import { resetStoredFormData } from "functions/storage/form/formDataStorage";
import { fakeUser } from "testUtils/fakeData/entities/fakeUser";
import getMeResponse from "../../../testUtils/fakeData/apiResponse/get/getMeResponse.json";


jest.setTimeout(10000);


const testUser = getCollectionUserResponse['hydra:member'].find(user => user.email === 'test@email.fr');
if(!testUser) throw new Error('no user with test@email.fr');
const secondUser = getCollectionUserResponse['hydra:member'][1];

describe('SuperCrud', () => {
    afterEach(() => {
        resetSuperCrudStoredFilters('User');
        resetStoredColumnsSelection('User');
        resetStoredFormData('User');
    })

    const setUp = async (emptyBasePath: boolean = false): Promise<HTMLElement> => {

        fetchMock.mockResponses(
            [JSON.stringify(userContext), {status: 200}], //user context
            [JSON.stringify(getCollectionUserResponse), {status: 200}], //items,
            [JSON.stringify({}), {status: 200}], //menu list
            [JSON.stringify(fakeUser), {status: 200}],
            [JSON.stringify(getCollectionUserResponse), {status: 200}], //items,
        );

        const {container} = renderIntegrated(
            <SuperCrud
                title="Users"
                entity="User"
                endpoint={API_USERS}
                defaultItemsPerPage={20}
                basePath={emptyBasePath ? '': '/users'}
            />
        );

        //wait for initial loadItems and then return container
        return await waitFor(() => {
            const table = getByQuerySelector(container, 'table');
            expect(table).toBeInTheDocument();
            expect(screen.getByText(testUser.email)).toBeInTheDocument();
            return container;
        }, {timeout: 10000, interval: 1000});
    };

    it('should render items table', async () => {
        const container = await setUp();

        const table = getByQuerySelector(container, 'table');
        expect(table).toBeInTheDocument();
    })

    // columns
    it('should not display columnsSelector by default', async () => {
        const container = await setUp();
        expect(container.querySelector('.columns-selector ul')).toBeNull();
    })

    it('should open columnsSelector when click on opener', async () => {
        const container = await setUp();
        
        await clickOnColumnsSelectorOpener(container);
        expect(container.querySelector('.columns-selector ul')).not.toBeNull();
    })

    it('should close columnsSelector when click on close', async () => {
        const container = await setUp();

        await clickOnColumnsSelectorOpener(container);
        expect(container.querySelector('.columns-selector ul')).not.toBeNull();
        
        await clickOnColumnsSelectorOpener(container);
        expect(container.querySelector('.columns-selector ul')).toBeNull();
    })

    it('should not display column when uncheck this column in ColumnsSelector', async () => {
        const container = await setUp();

        await clickOnColumnsSelectorOpener(container);

        const columnsSelector = getByQuerySelector(container, '.columns-selector');

        const columnsSelectorItem = within(columnsSelector).getByText(t('email', {locale: 'en'}));
        await userEvent.click(columnsSelectorItem);
        
        const table = getByQuerySelector(container, 'table');
        expect(within(table).queryByText(t('email', {locale: 'en'}))).not.toBeInTheDocument();
    })

    it('should display column when check this column in ColumnsSelector', async () => {
        const container = await setUp();

        await clickOnColumnsSelectorOpener(container);

        const columnsSelector = getByQuerySelector(container, '.columns-selector');

        const columnsSelectorItem = within(columnsSelector).getByText(t('email', {locale: 'en'}));
        await userEvent.click(columnsSelectorItem);
        
        const table = getByQuerySelector(container, 'table');
        expect(within(table).queryByText(t('email', {locale: 'en'}))).not.toBeInTheDocument();

        await userEvent.click(columnsSelectorItem);
        expect(within(table).queryByText(t('email', {locale: 'en'}))).toBeInTheDocument();
    })

    //items 
    it('should display 20 items by default', async () => {
        const container = await setUp();

        const trs = container.querySelectorAll('tr');
        expect(trs.length).toEqual(20 + 1); // + 1 for thead tr
    })

    //pagination
    it('should display pagination', async () => {
        const container = await setUp();

        expect(screen.getByText(t('previous'))).toBeInTheDocument();
        expect(screen.getByText(t('next'))).toBeInTheDocument();
    })

    //FILTERS
    it('should display itemsPerPage filter', async () => {
        await setUp();
        const itemsPerPageFilter = screen.getByTestId('itemsPerPage-filter');
        expect(itemsPerPageFilter).toBeInTheDocument();
    })
    //itemsPerPage
    it('should display only 5 records when filter itemsPerPage select 5', async () => {
        const container = await setUp();

        fetchMock.mockResponses(
            [JSON.stringify(getCollectionUserWith5ItemsPerPageResponse), {status: 200}],
            [JSON.stringify(fakeUser), {status: 200}],
        );
        
        // repeat in other order, to avoid problem of requests sent in wrong order
        fetchMock.mockResponses(
            [JSON.stringify(fakeUser), {status: 200}],
            [JSON.stringify(getCollectionUserWith5ItemsPerPageResponse), {status: 200}],
        );
        
        const itemsPerPageFilter = screen.getByTestId('itemsPerPage-filter');
        await userEvent.click(within(itemsPerPageFilter).getByText(t('results_per_page')));
        const option5 = screen.getAllByRole('option').find(option => option.textContent === '5');
        if(!option5) throw new Error('no itemsPerPage option 5');
        await userEvent.click(option5);

        await waitFor(() => {
            fetchMock.mockResponses(
                [JSON.stringify(fakeUser), {status: 200}],
                [JSON.stringify(getCollectionUserWith5ItemsPerPageResponse), {status: 200}],
            );
            const trs = container.querySelectorAll('tr');
            expect(trs.length).toEqual(5 + 1); // + 1 for thead tr
            expectApiRequestCalledWith(API_USERS, 'GET', {page: 1, itemsPerPage: 5}, true, true);
        }, {timeout: 5000, interval: 1000});
    })
    //email filter
    it('should display only one result after filtered with email', async () => {
        const container = await setUp();
        fetchMock.mockResponses(
            [JSON.stringify(getCollectionUserWithOnlyTestUserResult), {status: 200}],
            [JSON.stringify(fakeUser), {status: 200}],
        );

        const emailFilterInput = getByQuerySelector(container, 'thead > tr > th:nth-child(2) input');
        await userEvent.type(emailFilterInput, 'test@email');
        
        await waitFor(() => {
            const trs = container.querySelectorAll('tr');
            expect(trs.length).toEqual(1 + 1); // + 1 for thead tr
            const tdEmail = getByQuerySelector(container, 'tbody tr td:nth-child(2)');
            expectApiRequestCalledWith(API_USERS, 'GET', {page: 1, email: 'test@email', itemsPerPage: 20}, true, true);
            expect(tdEmail.textContent).toEqual('test@email.fr');
        }, {timeout: 5000, interval: 1000});
    })

    //ORDER BY
    //asc
    it('should order by firstName asc when click on th firstName', async () => {
        const container = await setUp();
        fetchMock.mockOnce(JSON.stringify(getCollectionUserOrderByFirstNameAsc), {status: 200});

        const thFirstName = getByQuerySelector(container, 'thead > tr th:nth-child(6) span');
        await userEvent.click(thFirstName);

        await waitFor(() => {
            const tdFirstName = getByQuerySelector(container, 'tbody > tr td:nth-child(6)');
            expect(tdFirstName.textContent?.substring(0, 1)).toEqual('A');
            expectApiRequestCalledWith(API_USERS, 'GET', {page: 1, ['order[firstName]']: 'ASC', itemsPerPage: 20}, true, true);
        }, {timeout: 5000, interval: 1000});
    })

    //desc
    it('should order by firstName desc when click 2 times on th firstName', async () => {
        const container = await setUp();
        fetchMock.mockOnce(JSON.stringify(getCollectionUserOrderByFirstNameDesc), {status: 200});

        const thFirstName = getByQuerySelector(container, 'thead > tr th:nth-child(6) span');
        await userEvent.click(thFirstName);
        await userEvent.click(thFirstName);

        await waitFor(() => {
            const tdFirstName = getByQuerySelector(container, 'tbody > tr td:nth-child(6)');
            expect(tdFirstName.textContent?.substring(0, 1)).toEqual('Z');
            expectApiRequestCalledWith(API_USERS, 'GET', {page: 1, ['order[firstName]']: 'DESC', itemsPerPage: 20}, true, true);
        }, {timeout: 5000, interval: 1000});
    })

    //PAGINATION
    it('should display page 2 when click on next page', async () => {
        const container = await setUp();
        fetchMock.mockOnce(JSON.stringify(getCollectionUserPage2), {status: 200});

        await userEvent.click(screen.getByText(t('next')));

        await waitFor(() => {
            const tdEmail = getByQuerySelector(container, 'tbody tr td:nth-child(2)');
            expect(tdEmail.textContent).not.toEqual('test@email.fr');
            expectApiRequestCalledWith(API_USERS, 'GET', {page: 2, itemsPerPage: 20}, true, true);
        }, {timeout: 5000, interval: 1000});
    })

    //CELL EDIT 
    it('should edit cell when doubleClick on it', async () => {
        const container = await setUp();

        const tdEmail = screen.getByText('test@email.fr');
        const tr = getByQuerySelector(container, 'table tbody tr');

        await userEvent.dblClick(tdEmail);

        const inputEmail = within(tr).getByDisplayValue('test@email.fr');
        expect(inputEmail).toBeInTheDocument();
        expect(inputEmail).toHaveFocus();
    })

    /**
     * firstName column is not editable (userContext.json)
     */
    it('should not edit cell when column.isEditable is false', async () => {
        const container = await setUp();

        const tdFirstName = screen.getByText(testUser.firstName);
        const tr = getByQuerySelector(container, 'table tbody tr');

        await userEvent.dblClick(tdFirstName);

        tr.querySelectorAll('input').forEach(input => {
            expect(input).toHaveAttribute('type', 'checkbox');
        });
    })

    //edit nav 
    it('should focus on next cell when press key Tab', async () => {
        await setUp();
        const tdEmail = screen.getByText('test@email.fr');

        await userEvent.dblClick(tdEmail);
        await userEvent.keyboard('{Tab}');
        await userEvent.keyboard('{Tab}');
        await userEvent.keyboard('{Tab}');
        await userEvent.keyboard('{Tab}');
        //with pressing 4 times Tab we go to lastName because firstName is not editable
        const inputLastName = screen.getByDisplayValue(testUser.lastName);
        expect(inputLastName).toHaveAttribute('type', 'text');
        expect(inputLastName).toHaveFocus();
    })

    it('should focus on prev cell', async () => {
        await setUp();
        const tdLastName = screen.getByText(testUser.lastName);

        await userEvent.dblClick(tdLastName);
        await userEvent.keyboard('{Shift>}{Tab}{/Shift}');
        await userEvent.keyboard('{Shift>}{Tab}{/Shift}');
        await userEvent.keyboard('{Shift>}{Tab}{/Shift}');
        await userEvent.keyboard('{Shift>}{Tab}{/Shift}');
        //with 4 Tab we go to lastName because firstName is not editable
        const inputEmail = screen.getByDisplayValue(testUser.email);
        expect(inputEmail).toHaveAttribute('type', 'email');
        expect(inputEmail).toHaveFocus();
    })

    it('should focus on next line', async () => {
        const container = await setUp();
        //get the last td of first tr
        const lastTd = getByQuerySelector(container, 'table > tbody > tr > td:nth-child(9)');

        await userEvent.dblClick(lastTd);
        await userEvent.keyboard('{Tab}');

        const inputEmail = screen.getByDisplayValue(secondUser.email);
        expect(inputEmail).toHaveAttribute('type', 'email');
        expect(inputEmail).toHaveFocus();
    })

    it('should focus on prev line', async () => {
        const container = await setUp();
        const line2TdEmail = screen.getByText(secondUser.email);
        await userEvent.dblClick(line2TdEmail);
        await userEvent.keyboard('{Shift>}{Tab}{/Shift}');

        const lineOneLastTdInput = getByQuerySelector(container, 'table > tbody > tr > td:nth-child(9) input');
        expect(lineOneLastTdInput).toHaveFocus();
    })

    //cell edit update
    it('should display invalid-feedback when submitting empty field while field is required', async () => {
        const container = await setUp();

        const tdEmail = screen.getByText('test@email.fr');
        const tr = getByQuerySelector(container, 'table tbody tr');

        await userEvent.dblClick(tdEmail);
        
        const inputEmail = within(tr).getByDisplayValue('test@email.fr');

        await userEvent.clear(inputEmail);
        await userEvent.type(inputEmail, '{enter}');
        
        expect(getByQuerySelector(container, 'input + .invalid-feedback'));
    })

    //delete
    it('should ask confirmation when click on delete', async () => {
        const container = await setUp();

        const deleteButton = getByQuerySelector(container, 'table tbody tr .tab-controls .btn-danger');
        await userEvent.click(deleteButton);
        expect(screen.getByText(t('confirm.delete'))).toBeInTheDocument();
        expect(screen.getByText(t('close'))).toBeInTheDocument();
    })

    it('should send request to delete correct item when confirm delete', async () => {
        const container = await setUp();
        
        fetchMock.mockResponseOnce(
            JSON.stringify({}),
            {status: 204}
        )

        const deleteButton = getByQuerySelector(container, 'table tbody tr .tab-controls .btn-danger');
        await userEvent.click(deleteButton);
        await userEvent.click(screen.getByText(t('confirm.delete')));

        await waitFor(() => {
            expectApiRequestCalledWith(API_USERS + '/' + testUser.id, 'DELETE');
        })
    })

    it('should send request to delete correct item when confirm delete', async () => {
        const container = await setUp();
        
        fetchMock.mockResponseOnce(
            JSON.stringify({}),
            {status: 204}
        )

        const deleteButton = getByQuerySelector(container, 'table tbody tr .tab-controls .btn-danger');
        await userEvent.click(deleteButton);
        await userEvent.click(screen.getByText(t('confirm.delete')));

        await waitFor(() => {
            expectApiRequestCalledWith(API_USERS + '/' + testUser.id, 'DELETE');
        })
    })

    it('should display alert-danger when delete request return error', async () => {
        const container = await setUp();
        
        fetchMock.mockResponseOnce(
            JSON.stringify({}),
            {status: 500}
        )

        const deleteButton = getByQuerySelector(container, 'table tbody tr .tab-controls .btn-danger');
        await userEvent.click(deleteButton);
        await userEvent.click(screen.getByText(t('confirm.delete')));

        await waitFor(() => {
            expect(getByQuerySelector(container, '.alert-danger')).toBeInTheDocument();
            expectApiRequestCalledWith(API_USERS + '/' + testUser.id, 'DELETE');
        }, {timeout: 2000})
    })

    it('should display main delete button when items are checked', async () => {
        const container = await setUp();

        const line1checkbox = getByQuerySelector(container, 'table tbody tr input[type=checkbox]');
        const line2checkbox = getByQuerySelector(container, 'table tbody tr:nth-child(2) input[type=checkbox]');
        await userEvent.click(line1checkbox);
        await userEvent.click(line2checkbox);

        expect(screen.getByTestId('main-delete-button')).toBeInTheDocument();
        expect(screen.getByTestId('main-delete-button')).toHaveTextContent('2');
    })

    it('should ask confirmation when click on main delete button', async () => {
        const container = await setUp();
        const line1checkbox = getByQuerySelector(container, 'table tbody tr input[type=checkbox]');
        await userEvent.click(line1checkbox);

        const mainDeleteButton = screen.getByTestId('main-delete-button');
        await userEvent.click(mainDeleteButton);

        expect(screen.getByText(t('confirm.items_removal', {count: 1}))).toBeInTheDocument();
        expect(screen.getByText(t('close'))).toBeInTheDocument();
    })

    it('should send request to delete multiple items when checked multiple items and click main delete button', async () => {
        const container = await setUp();

        fetchMock.resetMocks();
        fetchMock.mockResponses(
            [JSON.stringify({}), {status: 204}], // delete
        );

        const line1checkbox = getByQuerySelector(container, 'table tbody tr input[type=checkbox]');
        const line2checkbox = getByQuerySelector(container, 'table tbody tr:nth-child(2) input[type=checkbox]');
        await userEvent.click(line1checkbox);
        await userEvent.click(line2checkbox);

        const mainDeleteButton = screen.getByTestId('main-delete-button');
        await userEvent.click(mainDeleteButton);
        await userEvent.click(screen.getByText(t('confirm.action')));
        
        const id1 = testUser.id;
        const id2 = secondUser.id;
        await waitFor(() => {
            expectApiRequestCalledWith(API_USERS + '/' + id1, 'DELETE');
            expectApiRequestCalledWith(API_USERS + '/' + id2, 'DELETE');
        }, {timeout: 2000})
    })

    //LINKS
    //link to show
    it('should redirect to correct show page when click on show button', async () => {
        const container = await setUp(true);
        const showButton = getByQuerySelector(container, 'table > tbody > tr > td:last-child button:first-child');
        await userEvent.click(showButton);

        expect(screen.getByTestId('location-display').textContent).toEqual('/show/' + testUser.id);
    })

    //link to update
    it('should redirect to correct update page when click on update button', async () => {
        const container = await setUp(true);
        const showButton = getByQuerySelector(container, 'table > tbody > tr > td:last-child button:nth-child(2)');
        await userEvent.click(showButton);

        expect(screen.getByTestId('location-display').textContent).toEqual('/update/' + testUser.id);
    })

    //link to create
    it('should redirect to correct create page when click on create button', async () => {
        await setUp(true);
        await userEvent.click(screen.getByText(t('create')));

        expect(screen.getByTestId('location-display').textContent).toEqual('/create');
    })
    
    //HELPER
    const clickOnColumnsSelectorOpener = async (container: HTMLElement) => {
        const opener = getByQuerySelector(container, '.columns-selector-opener');
        await userEvent.click(opener);
    }
})