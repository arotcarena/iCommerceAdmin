import { FormData } from "type/formTypes";

export const storeFormData = (key: string, formData: FormData): void => {
    sessionStorage.setItem(
        getFormDataStorageKey(key), 
        JSON.stringify(formData)
    );
}

export const getStoredFormData = (key: string): FormData|null => {
    const formData = sessionStorage.getItem(
        getFormDataStorageKey(key)
    );

    if(formData) {
        return JSON.parse(formData);
    }
    return null;
}

export const resetStoredFormData = (key: string, persistantFields?: string[]) => {
    if(!persistantFields) {
        sessionStorage.removeItem(
            getFormDataStorageKey(key)
        );
        return;
    }
    const formData = getStoredFormData(key);
    if(!formData) {
        return;
    }
    const newFormData: FormData = {};
    for(const [field, value] of Object.entries(formData)) {
        if(persistantFields.includes(field)) {
            newFormData[field] = value;
        }
    }
    storeFormData(key, newFormData);
}

const getFormDataStorageKey = (key: string): string => {
    return 'form_' + key + '.data';
}
