import { prepareCustomFetch } from "./customFetchPreparator";

export const customFetch = async (
    endpoint: string,
    params: object = {},
    method: string = 'GET',
    customHeaders: object = {},
    urlParams: object = {},
    controller?: AbortController
): Promise<any> => {

    const {url, options} = prepareCustomFetch(endpoint, params, method, customHeaders, urlParams, controller);
    const response = await fetch(url, options as RequestInit);

    //if no body, response.json throw error
    if(response.status === 204) {
        return null;
    }

    const data = await response.json();

    if(response.ok) {
        return data;
    } else {
        throw new CustomFetchError(data, response.status)
    }
}


export class CustomFetchError {
    status: number
    data: any

    constructor(data: any, status: number) {
        this.data = data;
        this.status = status;
    }
}