//api

import { AppConfig } from "config/AppConfig";
import { prepareApiRequest } from "functions/api/apiRequest/apiRequestPreparator";
import { prepareCustomFetch } from "functions/api/customFetch/customFetchPreparator";

export const expectCustomFetchCalledWith = (
    endpoint: string,
    method: string = 'GET', 
    params: {[key: string]: any} = {},
    customHeaders?: object,
    urlParams: object = {},
    hasController: boolean = false,
) => {
    const controller = hasController ? new AbortController(): undefined;
    const {url, options} = prepareCustomFetch(endpoint, params, method, customHeaders, urlParams, controller);

    expect(fetchMock).toHaveBeenCalledWith(url, options);
}

export const expectApiRequestCalledWith = (
    path: string,
    method: string = 'GET', 
    params: {[key: string]: any} = {},
    sendAuthToken: boolean = true,
    hasController: boolean = false,
) => {
    const {customHeaders, preparedParams, urlParams} = prepareApiRequest(method, params, sendAuthToken);
    expectCustomFetchCalledWith(AppConfig.API_BASE_URL + path, method, preparedParams, customHeaders, urlParams, hasController);
}
