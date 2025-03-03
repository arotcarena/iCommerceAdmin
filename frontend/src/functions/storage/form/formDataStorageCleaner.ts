export const cleanFormDataStorage = () => {
    for(const key of Object.keys(sessionStorage)) {
        if(key.endsWith('.data') || key.endsWith('_data')) {
            sessionStorage.removeItem(key);
        }
    }
}
