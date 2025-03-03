import { API_CHANGE_PASSWORD, API_FORGOTTEN_PASSWORD, API_ME, API_REFRESH_TOKEN, API_RESET_PASSWORD } from "Routes/apiRoutes";
import { generateUrl } from "functions/router/urlGenerator";
import { User } from "type/entityTypes";
import { PasswordChangeData, PasswordCreateData } from "type/formTypes";
import { useApiRequest } from "../useApiRequest";
import { customFetch } from "functions/api/customFetch/customFetch";
import { AppConfig } from "config/AppConfig";
import { CompanyType } from "type/mainTypes";

export const useLoadUser = (): (() => Promise<User>) => {
    const doApiRequest = useApiRequest();

    const loadUser = () => {
        return doApiRequest<User>(API_ME, {}, 'GET');
    }

    return loadUser;
};

export const usePostPassword = (): ((formData: PasswordCreateData, token: string) => Promise<any>) => {
    const doApiRequest = useApiRequest();

    const postPassword = (formData: PasswordCreateData, token: string) => {
        return doApiRequest<any>(API_RESET_PASSWORD + '/' + token, formData, 'POST');
    };

    return postPassword;
};

export const useUpdatePassword = (): ((formData: PasswordChangeData) => Promise<any>) => {
    const doApiRequest = useApiRequest();

    const updatePassword = (formData: PasswordChangeData) => {
        return doApiRequest<any>(API_CHANGE_PASSWORD, formData, 'POST');
    };

    return updatePassword;
};

export const useForgottenPasswordRequest = (): ((email: string) => Promise<any>) => {
    const doApiRequest = useApiRequest();

    const forgottenPasswordRequest = (email: string) => {
        return doApiRequest<any>(
            API_FORGOTTEN_PASSWORD,
            {
                email,
                target: generateUrl('password_reset', {}, true)//absolute url of reset_password page to generate email link
            },
            'POST',
        );
    };

    return forgottenPasswordRequest;
};

export const apiRefreshToken = (refresh_token: string): Promise<{token?: string, error?: string}> => {
    return customFetch(AppConfig.API_BASE_URL + API_REFRESH_TOKEN, {refresh_token}, 'POST');
}
