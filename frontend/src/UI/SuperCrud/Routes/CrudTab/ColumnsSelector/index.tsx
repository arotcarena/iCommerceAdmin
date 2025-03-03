import React, { MouseEvent, useEffect, useMemo } from "react"
import { ColumnItem } from "./ColumnItem"
import { ListGroup } from "reactstrap"
import { TabColumn } from "type/superCrudTypes"
import { useTranslation } from "react-i18next"
import { getStoredColumnsSelection, resetStoredColumnsSelection, storeColumnsSelection } from "functions/storage/superCrud/columnsSelectionStorage"
import { useSuperCrud } from "Components/Contexts/SuperCrudContext"

type Props = {
    isOpen: boolean,
    toggleOpen: () => void,
    columns: TabColumn[],
    setColumns: React.Dispatch<React.SetStateAction<TabColumn[]>>,
    storeColumnsSelectionKey?: string,
}

export const ColumnsSelector = ({
    isOpen,
    toggleOpen,
    columns,
    setColumns,
    storeColumnsSelectionKey,
}: Props) => {
    const {t} = useTranslation();
    const {entity} = useSuperCrud();
    const storageKey = storeColumnsSelectionKey ?? entity;

    //persistance in sessionStorage
    useEffect(() => {
        const storedColumns = getStoredColumnsSelection(storageKey, columns);
        if(storedColumns) {
            setColumns(storedColumns);
        }
    }, []);
    useEffect(() => {
        storeColumnsSelection(storageKey, columns);
    }, [columns]);
    //store default columns at component mount
    const defaultColumns = useMemo(() => {
        return columns
    }, []);
    //remove persisted data
    const handleResetColumnsSelection = (e: MouseEvent) => {
        e.preventDefault();
        resetStoredColumnsSelection(storageKey);
        setColumns(defaultColumns);
    };
    const showRemoveCustomSelectionButton = useMemo(() => {
        return JSON.stringify(columns) !== JSON.stringify(defaultColumns);
    }, [columns, defaultColumns]); 

    const handleSelect = (column: TabColumn): void => {
        setColumns(prevColumns => prevColumns.map(prevColumn => {
            if(prevColumn.name === column.name) {
                return {
                    ...prevColumn,
                    isVisible: !prevColumn.isVisible
                };
            }
            return prevColumn;
        }));
    };

    return (
        <div className={'columns-selector' + (isOpen ? ' open': '')}>
            <button type="button" className="btn columns-selector-opener i-text" onClick={toggleOpen}>
                <i className={'ri-arrow-'+(isOpen ? 'right': 'left')+'-s-line icon-arrow h4 page-sticky pt-4'}></i>
            </button>
            {
                isOpen && (
                    <ListGroup className="pt-4 ms-2 me-2 mb-4 page-sticky">
                        <h3 className="h3 mt-0 ms-2 mb-2">{t('column', {count: columns.length})}</h3>
                        {
                            columns.map((column: TabColumn, index: any) => (
                                column.type !== 'relation' && (
                                    <ColumnItem 
                                        key={index}
                                        column={column}
                                        onSelect={handleSelect}
                                    />
                                )
                            ))
                        }
                        {
                            showRemoveCustomSelectionButton && (
                                <button 
                                    className="btn border-primary text-primary fs-9 mt-3 position-sticky d-flex align-items-center justify-content-center"
                                    style={{bottom: '38px', backgroundColor: '#FFF', width: '170px'}}
                                    type="button"
                                    onClick={handleResetColumnsSelection}
                                >
                                    <i className="ri ri-arrow-go-back-line ri-xl"></i>{' '}
                                    <span className="text-start ms-2" style={{lineHeight: 1.4}}>
                                        {t('default_selection')}
                                    </span>
                                </button>
                            )
                        }
                    </ListGroup>
                )
            }
        </div>
    )
}
