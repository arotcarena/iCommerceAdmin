const unauthorizedEventKey = 'unauthorized_event'

export const storeUnauthorizedEvent = (): void => {
    sessionStorage.setItem(unauthorizedEventKey, 'on');
};

export const hasStoredUnauthorizedEvent = (): boolean => {
    const unauthorized = sessionStorage.getItem(unauthorizedEventKey);
    return unauthorized === 'on';
};

export const resetUnauthorizedEvent = (): void => {
    sessionStorage.removeItem(unauthorizedEventKey);
};
