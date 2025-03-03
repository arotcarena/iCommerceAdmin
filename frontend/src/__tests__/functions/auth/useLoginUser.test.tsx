import { QueryClient } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react";
import { API_LOGIN } from "Routes/apiRoutes";
import { AppConfig } from "config/AppConfig";
import { CustomFetchError } from "functions/api/customFetch/customFetch";
import { useLoginUser } from "functions/auth/useLoginUser";
import { generateUrl } from "functions/router/urlGenerator";
import { storeAuthTarget } from "functions/storage/auth/authTargetStorage";
import { getAuthToken } from "functions/storage/auth/authTokenStorage";
import { getAsyncError } from "testUtils/helpers/errorHelper";
import { expectCustomFetchCalledWith } from "testUtils/helpers/fetchMockHelpers";

const loginData = {
    username: 'test',
    password: 'password'
};

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

const mockQueryClient = new QueryClient();
jest.mock("@tanstack/react-query", () => ({
    ...jest.requireActual("@tanstack/react-query"),
    useQueryClient: () => mockQueryClient,
}));


describe('loginUser', () => {

    it('should send correct login request', async () => {
        const {result} = renderHook(() => useLoginUser());
        fetchMock.mockResponseOnce(
            JSON.stringify({}), {status: 200}
        );
        await result.current(loginData);

        expectCustomFetchCalledWith(AppConfig.API_BASE_URL + API_LOGIN, 'POST', loginData);
    })

    it('should throw error if api throw error', async () => {
        const {result} = renderHook(() => useLoginUser());
        fetchMock.mockResponseOnce(
            JSON.stringify({}), {status: 401}
        );

        const error = await getAsyncError(() => result.current(loginData));
        expect(error).toBeInstanceOf(CustomFetchError);
    })

    it('should redirect to home when login success and no target', async () => {
        const {result} = renderHook(() => useLoginUser());
        fetchMock.mockResponseOnce(
            JSON.stringify({}), {status: 200}
        );
        await result.current(loginData);

        expect(mockNavigate).toHaveBeenCalledWith(generateUrl('home'));
    })

    it('should redirect to target when login success and target in session', async () => {
        const {result} = renderHook(() => useLoginUser());
        storeAuthTarget(generateUrl('profile'));
        fetchMock.mockResponseOnce(
            JSON.stringify({}), {status: 200}
        );
        await result.current(loginData);

        expect(mockNavigate).toHaveBeenCalledWith(generateUrl('profile'));
    })

    it('should store token when login success', async () => {
        const {result} = renderHook(() => useLoginUser());
        storeAuthTarget(generateUrl('profile'));
        fetchMock.mockResponseOnce(
            JSON.stringify({token: 'test_token'}), {status: 200}
        );
        await result.current(loginData);

        const token = getAuthToken();
        expect(token).toEqual('test_token');
    })
})
