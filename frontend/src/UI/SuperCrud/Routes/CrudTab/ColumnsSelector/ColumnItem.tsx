import { useSuperCrud } from "Components/Contexts/SuperCrudContext";
import { useTranslation } from "react-i18next";
import { Input, ListGroupItem } from "reactstrap";
import { TabColumn } from "type/superCrudTypes";

type Props = {
    column: TabColumn,
    onSelect: (column: TabColumn) => void
};

export const ColumnItem = ({
    column,
    onSelect
}: Props) => {

    const {t} = useTranslation();

    const {parentPropertyName, hiddenFields} = useSuperCrud();

    const handleChange = () => {
        onSelect(column);
    }

    if(parentPropertyName === column.name || hiddenFields?.includes(column.name)) {
        return '';
    }

    return (
        <ListGroupItem tag="label" className="d-flex">
            {
                column.type !== 'relation' && (
                    <Input className="form-check-input me-1" type="checkbox" checked={column.isVisible} onChange={handleChange} />
                )
            }
            {t(column.name)}
        </ListGroupItem>
    )
}
