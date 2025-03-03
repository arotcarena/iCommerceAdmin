import userEvent from "@testing-library/user-event";

export const getByQuerySelector = <T extends HTMLElement>(container: HTMLElement, selector: string): T => {
    const elt = container.querySelector<T>(selector);
    if(!elt) throw new Error('query selector "'+selector+'" doesn\'t match any element of the document');

    return elt;
}


export const submitForm = async (formData: {[key: string]: any}, container: HTMLElement, doSubmit: boolean = false): Promise<void> => {
    for(const [field, value] of Object.entries(formData)) {
        const fieldElement = getByQuerySelector(container, '[name='+field+']');
        await userEvent.clear(fieldElement);
        if(value !== '') {
            await userEvent.type(fieldElement, value);
        }
    }

    if(doSubmit) {
        await userEvent.click(getByQuerySelector(container, 'button[type=submit]'));
    }
}