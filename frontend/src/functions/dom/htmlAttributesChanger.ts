/**
 * Changes the html element attribute
 */
export const changeHTMLAttribute = (attribute: string, value: string): boolean => {
    if (document.documentElement) {
        document.documentElement.setAttribute(attribute, value);
    }
    return true;
};
