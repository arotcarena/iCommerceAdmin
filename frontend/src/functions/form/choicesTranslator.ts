import { t } from "i18next";
import { ChoicesType } from "type/formTypes";

export const translateChoices = (choices: ChoicesType) => {
    let translatedChoices: ChoicesType = {};
    for(const [label, value] of Object.entries(choices)) {
        translatedChoices = {
            ...translatedChoices,
            [t(label)]: value
        };
    }
    return translatedChoices;
}
