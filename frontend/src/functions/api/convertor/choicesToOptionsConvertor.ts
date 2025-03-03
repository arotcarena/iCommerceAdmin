import { SelectOption } from "type/formTypes";

export const convertChoicesToOptions = (
    choices: {[label: string]: string|number}
): SelectOption[] => {
    return Object.entries(choices).map(([label, value]) => ({label, value}));
}