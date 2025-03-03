import { Headers } from "type/httpTypes";
import { NEEDS_REMOVE_FILTERNAME_END_TAG } from "../convertor/apiPlatformConversion/filtersConvertor";

type Options = {
    method: string,
    headers: Headers,
    body?: string,
    signal?: AbortSignal,
};


export const prepareCustomFetch = (
    endpoint: string,
    params: object = {},
    method: string = 'GET',
    customHeaders: object = {},
    urlParams: object = {},
    controller?: AbortController,
): {
    url: string,
    options: Options
} => {

    let url = urlPreparator(endpoint, urlParams);
    let options: Options = {
        method: method,
        headers: {
            "Accept": "application/json"
        }
    };

    // abort controller
    if(controller) {
        options = {
            ...options,
            signal: controller.signal
        };
    }

    if(method === 'GET') {
        url = urlPreparator(url, params);
    } else {
        options = {
            ...options,
            headers: {
                ...options.headers,
                "Content-Type": method === 'PATCH' ? "application/merge-patch+json": "application/json"
            },
            body: JSON.stringify(params)
        };
    }

    options.headers = {
        ...options.headers,
        ...customHeaders
    };

    return {
        url,
        options
    }
}


export const urlPreparator = (
    url: string,
    params: object = {}
): string => {
    let urlParams: string[] = [];
    for(let [key, value] of Object.entries(params)) {
        if(key.includes(NEEDS_REMOVE_FILTERNAME_END_TAG)) {
            key = key.split(NEEDS_REMOVE_FILTERNAME_END_TAG)[0];
        }
        urlParams.push(key + '=' + value);
    }
    if(urlParams.length > 0) {
        url += (url.includes('?') ? '&': '?') + urlParams.join('&'); 
    }

    return url;
};
