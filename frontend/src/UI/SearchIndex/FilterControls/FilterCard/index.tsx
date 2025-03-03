import { useSuperCrud } from "Components/Contexts/SuperCrudContext"
import { useOpenState } from "functions/customHooks/state/useOpenState"
import { MouseEvent, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { TabColumn, TabColumnType } from "type/superCrudTypes"
import { FilterValue } from "./FilterValue"

type Props = {
    name: string,
    value: any,
    onReset: (key: string) => void,
    type?: TabColumnType
}

export const FilterCard = ({
    name,
    value,
    onReset,
    type,
}: Props) => {
    const {t} = useTranslation();

    const {columns} = useSuperCrud();
    const column: TabColumn|null = useMemo(() => {
        return columns.find(col => col.name === name) ?? null;
    }, [columns]);

    const handleClick = (e: MouseEvent) => {
        e.preventDefault();
        onReset(name);
    }

    const [valueInfoIsOpen, openValueInfo, closeValueInfo] = useOpenState(false);

    //min and max filters name
    let displayName = name;
    if(displayName.includes('min_')) {
        displayName = t(name.replace('min_', '')) + ' (' + t('min') + ')';
    } else if(displayName.includes('max_')) {
        displayName = t(displayName.replace('max_', '')) + ' (' + t('max') + ')';
    } else if(displayName.includes('before_')) {
        displayName = t(displayName.replace('before_', '')) + ' (' + t('max') + ')';
    } else if(displayName.includes('after_')) {
        displayName = t(displayName.replace('after_', '')) + ' (' + t('min') + ')';
    } else {
        displayName = t(displayName);
    }

    return (
        <div className="filter-card card mb-3 position-relative" style={{maxWidth: '18rem'}} onMouseOver={openValueInfo} onMouseLeave={closeValueInfo}>
            <div className="card-body">
                <i className="ri-filter-fill ri-lg"></i>{' '}
                {displayName}
                <button className="btn position-absolute" style={{top: '-5px', right: '-5px'}} type="button" onClick={handleClick}>
                    <i className="ri-close-line ri-xl"></i>
                </button>
            </div>
            <div className="filter-value-wrapper">
                <FilterValue 
                    isOpen={valueInfoIsOpen} 
                    name={name} 
                    value={value} 
                    needTranslation={column?.type === 'choice'}
                    type={type}
                />
            </div>
        </div>
    )
}
