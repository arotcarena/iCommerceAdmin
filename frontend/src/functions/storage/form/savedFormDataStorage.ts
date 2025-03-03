const SAVED_FORM_DATA_STORAGE_KEY = 'saved_form_data';
const PENDING_FORM_DATA_STORAGE_KEY = 'pending_form_data';

export const storePendingSavedData = (data: any) => {
    sessionStorage.setItem(PENDING_FORM_DATA_STORAGE_KEY, JSON.stringify(data));
};

export const storeSavedData = (data: any) => {
    sessionStorage.setItem(SAVED_FORM_DATA_STORAGE_KEY, JSON.stringify(data));
};

export const savePendingDataStored = () => {
    const data = sessionStorage.getItem(PENDING_FORM_DATA_STORAGE_KEY);
    if(data) {
        sessionStorage.setItem(SAVED_FORM_DATA_STORAGE_KEY, data);
    } else {
        sessionStorage.removeItem(SAVED_FORM_DATA_STORAGE_KEY);
    }
    resetPendingSavedDataStored();
};

export const getSavedDataStored = (): any => {
    const data = sessionStorage.getItem(SAVED_FORM_DATA_STORAGE_KEY);
    if(!data) {
        return null;
    }
    return JSON.parse(data);
};

export const resetPendingSavedDataStored = (): void => {
    sessionStorage.removeItem(PENDING_FORM_DATA_STORAGE_KEY);
};

export const resetSavedData = () => {
    sessionStorage.removeItem(SAVED_FORM_DATA_STORAGE_KEY);
};
