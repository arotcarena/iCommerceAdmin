export const cleanSuperCrudStorage = () => {
    for(const key of Object.keys(localStorage)) {
        if(key.endsWith('.selection') || key.endsWith('.filters')) {
            localStorage.removeItem(key);
        }
    }
}
