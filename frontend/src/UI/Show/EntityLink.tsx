import { resolveEntityCrudRoute } from "functions/entity/entityCrudRouteResolver";
import { resolveEntityLabel } from "functions/entity/entityLabelResolver"
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { EntityType } from "type/entityTypes";

type Props = {
    entity: EntityType|null|undefined,
    labelProperty?: string,
    complementLabelProperty?: string,
    isUpdateLink?: boolean,
    endpoint?: string,
    customEntityLabelResolver?: (entity: EntityType, locale?: string) => string,
    theme?: string,
    hasLabel?: boolean,
}

export const EntityLink = ({
    entity,
    labelProperty,
    complementLabelProperty,
    endpoint,
    isUpdateLink,
    customEntityLabelResolver,
    theme = 'primary',
    hasLabel = true,
}: Props): string|ReactNode => {
    const {i18n} = useTranslation();
    const label = resolveEntityLabel(entity, labelProperty, complementLabelProperty, customEntityLabelResolver, i18n.language);
    
    if(!endpoint || !entity?.id) {
        return label;
    }
    
    const entityCrudRoute = resolveEntityCrudRoute(endpoint);
    if(entityCrudRoute) {
        const action = isUpdateLink ? 'update': 'show';
        const url = entityCrudRoute + '/'+ action +'/' + entity.id;
        return (
            <div className="d-flex gap-1 align-items-start">
                <Link className="entity-link" to={url}>
                    <i className={'ri ri-external-link-line ri-lg text-' + theme}>
                    </i>
                </Link>
                {
                    hasLabel && label
                }
            </div>
        )
    }

    if(hasLabel) {
        return label;
    }

    return '';
};


export const getEntityLinkUrl = (
    entity: EntityType,
    endpoint: string,
    isUpdateLink: boolean = false,
): string|null => {
    const entityCrudRoute = resolveEntityCrudRoute(endpoint);
    if(!entityCrudRoute) {
        return null;
    }
    const action = isUpdateLink ? 'update': 'show';
    return entityCrudRoute + '/'+ action +'/' + entity.id;
};
