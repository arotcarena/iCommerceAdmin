import { screen, waitFor } from "@testing-library/react"
import { renderIntegrated } from "testUtils/renderIntegrated"
import getMeResponse from "../../../testUtils/fakeData/apiResponse/get/getMeResponse.json";
import getUserResponse from "../../../testUtils/fakeData/apiResponse/get/getUserResponse.json";
import userContext from "../../../testUtils/fakeData/apiResponse/context/userContext.json";
import Profile from "pages/Profile"
import { expectApiRequestCalledWith } from "testUtils/helpers/fetchMockHelpers"
import { API_ME, API_USERS } from "Routes/apiRoutes"
import userEvent from "@testing-library/user-event";
import { t } from "i18next";
import { expectLocation } from "testUtils/helpers/locationHelper";


const testUser = getMeResponse;
if(!testUser) throw new Error('no test user');

describe('Profile', () => {
    const setUp = async (): Promise<HTMLElement> => {
        const {container} = renderIntegrated(
            <Profile />,
            ['/'],
            'en'
        );

        fetchMock.mockResponses(
            [JSON.stringify(getMeResponse), {status: 200}],
            [JSON.stringify(getUserResponse), {status: 200}],
            [JSON.stringify(userContext), {status: 200}]
        );

        return await waitFor(() => {
            expect(screen.getByText(testUser.email)).toBeInTheDocument();
            const inputEmail = container.querySelector('input[name=email]');
            // expect(inputEmail).not.toBeNull(); 

            expectApiRequestCalledWith(API_ME, 'GET');
            expectApiRequestCalledWith(API_USERS + '/' + testUser.id, 'GET');
            expectApiRequestCalledWith('/api/contexts/User', 'GET');
            
            return container;
        }, {timeout: 2000});
    }

    it('should display user email', async () => {
        await setUp();
        expect(screen.getByText(testUser.email)).toBeInTheDocument();
    })

    it('should display disabled form by default', async () => {
        const container = await setUp();
        container.querySelectorAll('input').forEach(input => {
            expect(input.disabled).toBeTruthy();
        });
    })

    it('should display editable form when click on edit', async () => {
        const container = await setUp();
        await userEvent.click(screen.getByText(t('edit')));
        container.querySelectorAll('input').forEach(input => {
            expect(input.disabled).toBeFalsy();
        });
    })

    // it('should display disabled form again when click on cancel', async () => {
    //     const container = await setUp();
    //     await userEvent.click(screen.getByText(t('edit')));
    //     await userEvent.click(screen.getByText(t('cancel')));
    //     container.querySelectorAll('input').forEach(input => {
    //         expect(input.disabled).toBeTruthy();
    //     });
    // })

    it('should navigate to change password page when click on change password link', async () => {
        await setUp();
        await userEvent.click(screen.getByText(t('change_password')));
        
        expectLocation('change_password');
    })

//     it('should display invalid-feedback when invalid field', async () => {
//         const container = await setUp();
//         await userEvent.click(screen.getByText(t('edit')));
//         await submitForm({email: 'invalidemail.fr'}, container, true);

//         expect(getByQuerySelector(container, 'input[name=email] + .invalid-feedback')).toBeInTheDocument();
//     })

//     it('should not display invalid-feedback when valid field', async () => {
//       const container = await setUp();
//       await userEvent.click(screen.getByText(t('edit')));
//       await submitForm({email: 'valid@email.fr'}, container, true);

//       expect(container.querySelector('input[name=email] + .invalid-feedback')).toBeNull();
//   })
})        