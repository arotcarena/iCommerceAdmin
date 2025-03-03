import { useSuperCrud } from "Components/Contexts/SuperCrudContext";
import { useTranslation } from "react-i18next";
import { formatDate } from "functions/dateHelpers/dateFormater";
import { matchIsoDate } from "functions/dateHelpers/isoDateRegex";
import { resolveEntityLabel } from "functions/entity/entityLabelResolver";
import { TabColumn, TabColumnType } from "type/superCrudTypes";
import { formatPrice } from "functions/formaters/priceFormater";

type Props = {
    isOpen: boolean,
    name: string,
    value: any,
    needTranslation?: boolean,
    type?: TabColumnType,
}

export const FilterValue = ({
    isOpen,
    name,
    value,
    needTranslation = false,
}: Props) => {
    const {t, i18n} = useTranslation();
    const {columns} = useSuperCrud();
    const column = columns.find(col => col.name === name);

    if(Array.isArray(value)) {
        return value.map((v, index) => (
            <FilterValue
                key={index}
                isOpen={isOpen}
                name={name}
                value={v}
                needTranslation={needTranslation}
            />
        ))
    }

    if(matchIsoDate(value)) {
        value = formatDate(value, i18n.language, false);
    }
    
    //case of boolean value
    if(value === true) {
        value = t('true');
    }
    if(value === false) {
        value = t('false');
    }

    //ranges
    if(columns) {
        const rangeColumn = columns.find((col: TabColumn) => {
            for(const rangeOperator of ['max', 'min']) {
                if(name === (rangeOperator + '_' + col.name)) {
                    return true;
                }
            }
            return false;
        });
        // case of price
        if(rangeColumn?.type === 'price' && typeof value === 'number') {
            value = formatPrice(value);
        }
    }

    //in case of entity field
    if(column?.type === 'choice' && column?.endpoint && column?.labelProperty) {
        value = resolveEntityLabel(value, column.labelProperty, column.complementLabelProperty);
    }

    if(needTranslation) {
        value = t(value);
    }

    if(!isOpen) {
        return '';
    }

    return (
        <div className="filter-value-card">
            {value}
        </div>
    );
}
