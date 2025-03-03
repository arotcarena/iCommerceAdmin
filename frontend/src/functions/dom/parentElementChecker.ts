export const parentHasClassName = (elt: HTMLElement, className: string): boolean => {
    if(elt.classList.contains(className)) {
        return true;
    }
    if(elt.parentElement) {
        return parentHasClassName(elt.parentElement, className);
    }
    return false;
};
