import { getAuthToken } from "functions/storage/auth/authTokenStorage";
import i18n from "i18n";
import { Headers } from "type/httpTypes";
import { convertParamsEntitiesToIris } from "../convertor/apiPlatformConversion/paramsEntitiesToIriConvertor";

export const prepareApiRequest = (
    method: string = 'GET',
    params: {[key: string]: any} = {},
    sendAuthToken: boolean = true
): {
    customHeaders: Headers,
    preparedParams: {[key: string]: any},
    urlParams: object
} => {
    let customHeaders: Headers = {
        "Accept": "application/ld+json",
        "Content-Type": method === 'PATCH' ? "application/merge-patch+json": "application/ld+json"
    };

    //JWT authentication
    if(sendAuthToken) {
        const token = getAuthToken();
        if(token) {
            customHeaders = {
                ...customHeaders,
                'Authorization': 'Bearer ' + token
            }
        }
    }

    //params allways in url
    let urlParams: object = {locale: i18n.language};

    //Mandatory conversions for api platform
    //convert objects having iri to simple iri
    const preparedParams = convertParamsEntitiesToIris(params);

    return {
        customHeaders,
        preparedParams,
        urlParams
    };
}
