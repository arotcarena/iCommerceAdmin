export const storeAuthTarget = (target: string) => {
    sessionStorage.setItem('target', JSON.stringify(target));
}

export const getAuthTarget = (): string|null => {
    const target = sessionStorage.getItem('target');
    if(target) {
        return JSON.parse(target);
    }
    return null;
}

export const destroyAuthTarget = (): void => {
    sessionStorage.removeItem('target');
}