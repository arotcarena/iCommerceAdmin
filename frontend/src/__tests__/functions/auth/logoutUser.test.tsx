import { logoutUser } from "functions/auth/logoutUser";
import { getAuthToken, storeAuthToken } from "functions/storage/auth/authTokenStorage";

const createAlert = jest.fn();

describe('logoutUser', () => {
    it('should destroy token when logout', () => {

        storeAuthToken('test_token');

        fetchMock.mockResponseOnce(
            JSON.stringify({}), {status: 200}
        );
        logoutUser(createAlert);

        expect(getAuthToken()).toBeNull();
    })
})