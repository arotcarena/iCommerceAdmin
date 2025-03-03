import { CustomFetchError } from "../customFetch/customFetch";

export const createAlertTextFromApiError = (
    e: CustomFetchError,
    t: Function,
): string => {
    const error = e.data;
    let html = '';

    // title
    if(error.title) {
        html += '<strong>' + t(error.title) + ': </strong>';
    } else {
        html += '<strong>' + t('error_self') + ' ' + e.status + ' : </strong>';
    }

    // message
    html += ' ' + (error['hydra:description'] ?? (t(error.message) ?? null));
    
    // details
    if(error.data) {
        html += ' ' + t('details') + ' : ' + JSON.stringify(error.data);
    }

    return html;
}
