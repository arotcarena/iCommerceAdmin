import { t } from "i18next";
import { Item } from "type/searchTypes";

export const userRolesRenderer = (item: Item): string => {
    if(!item.roles) {
        return '';
    }
    const rolesFormated = item.roles.map((role: string) => t(role));
    return rolesFormated.join(', ');
};
