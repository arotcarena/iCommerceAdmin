import { useQuery } from "@tanstack/react-query";
import { useLoadItems } from "functions/customHooks/api/queries/itemQueries";
import { resolveEntityCrudRoute } from "functions/entity/entityCrudRouteResolver";
import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { Item } from "type/searchTypes";

type Props = {
    sourceIri: string,
    targetEndpoint: string,
    sourceEntityFilterName: string,
    targetPage?: 'show' | 'update',
    renderLabel: (target: Item) => string
};

export const JobEntityInversedRelationLink = ({
    sourceIri,
    targetEndpoint,
    sourceEntityFilterName,
    targetPage = 'show',
    renderLabel,
}: Props) => {
    const loadItems = useLoadItems(targetEndpoint);
    const {data: targets} = useQuery({
        queryKey: [targetEndpoint + '_' + sourceIri + '_link', sourceIri],
        queryFn: () => loadItems({[sourceEntityFilterName]: sourceIri}),
        initialData: null,
    });

    if(!targets || targets.items?.length < 1) {
        return '';
    }

    return (
        targets.items.map((target: Item, index: number) => (
            <div key={index}>
                <JobEntityLink
                    entity={target}
                    endpoint={targetEndpoint}
                    target={targetPage}
                >
                    {renderLabel(target)}
                </JobEntityLink>
            </div>
        ))
    )
};

export const JobEntityLink = ({
    entity,
    endpoint,
    target = 'show',
    children,
}: PropsWithChildren<{
    entity: Item,
    endpoint: string,
    target?: 'update'|'show',
}>) => {
    const crudRoute = resolveEntityCrudRoute(endpoint);
    const link = crudRoute + '/' + target + '/' + entity.id;

    return (
        <Link to={link}>
            <i className="ri ri-external-link-line ri-lg text-primary"></i>{' '}
            {children}
        </Link>
    )
}
