export const hasTooMuchDecimals = (value: string, maxDecimals: number) => {
    const parts: string[] = value.toString().split('.');
    if(parts[1] && parts[1].length > 2) {
        return true;
    }
    return false;
};
