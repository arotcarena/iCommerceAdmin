import { EntityType } from "type/entityTypes";

export const resolveEntityLabel = (
    entity: EntityType|null|undefined,
    labelProperty?: string,
    complementLabelProperty?: string,
    customEntityLabelResolver?: (entity: EntityType, locale?: string, authorizeHtml?: boolean) => string,
    locale?: string,
    authorizeHtml: boolean = false,
): string => {
    if(!entity) {
        return '';
    }

    if(customEntityLabelResolver) {
        return customEntityLabelResolver(entity, locale, authorizeHtml);
    }

    let label = '';
    if(labelProperty) {
        label += entity[labelProperty];
    }
    if(complementLabelProperty && entity[complementLabelProperty]) {
        label += ' (' + entity[complementLabelProperty] + ')'; 
    }

    return label;
}
