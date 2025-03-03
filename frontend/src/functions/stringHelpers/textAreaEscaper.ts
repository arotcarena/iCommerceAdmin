export const escapeTextarea = (textarea: any) => {
    if(Array.isArray(textarea)) {
        return textarea.filter((part: unknown) => typeof part === 'string').join(' ');
    }
    return textarea;
};
