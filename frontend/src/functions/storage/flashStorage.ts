export const storeFlash = (storageKey: string, data: any, timeout: number = 1000): any => {
    sessionStorage.setItem(storageKey, JSON.stringify(data));
    setTimeout(() => {
        sessionStorage.removeItem(storageKey);
    }, timeout);
}

export const getFlashStored = (storageKey: string): any => {
    const data = sessionStorage.getItem(storageKey);
    if(!data) {
        return null;
    }
    return JSON.parse(data);
}
