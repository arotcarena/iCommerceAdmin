import { useSuperCrud } from "Components/Contexts/SuperCrudContext"
import { PropsWithChildren } from "react";
import { TabColumn } from "type/superCrudTypes";

type Props = PropsWithChildren<{
    column?: TabColumn,
    handleIsVisible?: boolean
}>;

export const CrudConditionalDisplay = ({
    column,
    handleIsVisible = true,
    children
}: Props) => {
    const {parentPropertyName, hiddenFields} = useSuperCrud();

    if(
        !column ||
        (handleIsVisible === true && !column.isVisible) ||
        column.type === 'relation' ||
        column.name === parentPropertyName ||
        hiddenFields?.includes(column.name)
    ) {
        return '';
    }

    return children;
}
