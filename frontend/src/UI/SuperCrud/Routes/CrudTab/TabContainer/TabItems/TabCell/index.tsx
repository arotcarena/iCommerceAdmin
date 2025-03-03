import { MouseEvent } from "react";
import { TabCellEdit } from "./TabCellEdit";
import { createExcerpt } from "functions/stringHelpers/excerptMaker";
import { Renderer, TabColumn, TabItemType } from "type/superCrudTypes";
import { useTranslation } from "react-i18next";
import { BoolField } from "UI/Form/FormField/BoolField";
import { lightSearchedPart } from "functions/stringHelpers/searchedPartLighter";
import { AddressCell } from "UI/Card/AddressCard";
import { escapeHtml } from "functions/stringHelpers/htmlEscaper";
import { formatDate } from "functions/dateHelpers/dateFormater";
import { formatPrice } from "functions/formaters/priceFormater";
import { useSuperCrud } from "Components/Contexts/SuperCrudContext";
import { EntityLink } from "UI/Show/EntityLink";
import { getEntityAttachmentUrl } from "functions/files/entityAttachmentUrlResolver";
import { escapeTextarea } from "functions/stringHelpers/textAreaEscaper";

type Props = {
    item: TabItemType,
    column: TabColumn,
    renderer: Renderer|null,
    isEditing: boolean,
    editCell: (item: TabItemType, field: string) => void,
    editNextCell: () => void,
    closeEdit: () => void,
    filter: any,
    qFilter?: string,
    itemIsEditable: boolean,
};

export const TabCell = ({
    item,
    column,
    renderer,
    isEditing,
    editCell,
    editNextCell,
    closeEdit,
    filter,
    qFilter,
    itemIsEditable,
}: Props) => {
    const {t} = useTranslation();
    const {isAlwaysCellEditing, fieldIsEditableCondition} = useSuperCrud();

    let isEditable = itemIsEditable && column.isEditable ? true: false;
    if(fieldIsEditableCondition) {
        isEditable = fieldIsEditableCondition(item, column.name);
    }

    const handleDoubleClick = (e: MouseEvent): void => {
        if(isAlwaysCellEditing) {
            return;
        }
        e.preventDefault();
        editCell(item, column.name);
    };

    if((isEditing || isAlwaysCellEditing) && isEditable) {
        return (
            <td className={'type-'+column.type} style={{minWidth: '130px'}}>
                <TabCellEdit
                    column={column}
                    item={item}
                    field={column.name}
                    closeEdit={closeEdit}
                    isEditing={isEditing}
                    editCell={editCell}
                    editNextCell={editNextCell}
                />
            </td>
        );
    }

    let additionalClass: string = column.type;
    if(column.type === 'choice' && column?.endpoint) {
        additionalClass = 'entity'
    }

    //display value

    let value = item[column.name] ?? '';

    //custom rendering
    if(renderer) {
        const customRendering = renderer(item);
        if(customRendering !== undefined) {
            return (
                <td onDoubleClick={handleDoubleClick} className={'type-' + additionalClass} style={{minWidth: '130px'}}>
                    {customRendering}
                </td>
            )
        }
    }

    //nl2br
    const nl2br = require('react-nl2br');
    if(column.type === 'textarea') {
        value = nl2br(value);
    }
    //excerpt
    if(column.type === 'textarea' || column.type === 'html') {
        if(column.type === 'textarea') {
            value = escapeTextarea(value);
        }
        if(column.type === 'html') {
            value = escapeHtml(value);
        }

        value = createExcerpt(value.toString(), 30);
    } else if(column.type === 'text') {
        value = createExcerpt(value.toString(), 40);
    }
    //translate
    if(typeof value === 'string' && column.type === 'choice') {
        value = t(value);
    }

    return (
        <td onDoubleClick={handleDoubleClick} className={'type-' + additionalClass} style={{minWidth: '130px'}}>
            <TabCellValue
                value={value}
                type={column.type}
                endpoint={column?.endpoint}
                name={column.name}
                filter={filter}
                qFilter={qFilter}
                labelProperty={column?.labelProperty}
                complementLabelProperty={column?.complementLabelProperty}
            />
        </td>
    );
}


type TabCellValueProps = {
    value: any,
    type: string,
    name: string,
    filter: any,
    qFilter?: string,
    labelProperty?: string
    complementLabelProperty?: string,
    endpoint?: string,
};

export const TabCellValue = ({
    value,
    type,
    name,
    filter,
    qFilter,
    labelProperty,
    complementLabelProperty,
    endpoint,
}: TabCellValueProps) => {
    const {t, i18n} = useTranslation();

    //data transform
    if(type === 'price' && value && typeof value === 'number') {
        value = formatPrice(value, i18n.language);
    }

    if(['date', 'datetime'].includes(type)) {
        if(value) {
            return formatDate(value, i18n.language, type === 'datetime');
        }
        return '';
    }

    if(type === 'address') {
        return (
            <AddressCell address={value} className="small" />
        )
    }

    if(type === 'image' && value && value.id) {
        return (
            <img height={50} width="auto" src={getEntityAttachmentUrl(value.id)} alt={t(name)} />
        )
    }

    if(type === 'bool') {
        return (
            <div className="m-1">
                <BoolField
                    name="bool"
                    disabled={true}
                    value={value}
                    onChange={() => {}}
                    size="md"
                />
            </div>
        );
    }

    if(type === 'choice') {
        if(Array.isArray(value)) {
            //case of entity field
            if(labelProperty) {
                return value.map((v, index) => (
                    <EntityLink
                        key={index}
                        entity={v}
                        labelProperty={labelProperty}
                        complementLabelProperty={complementLabelProperty}
                        endpoint={endpoint}
                    />
                ));
            }
            //case of choices field
            value = value.join(', ');
        } else {
            if(labelProperty) {
                return (
                    <EntityLink
                        entity={value}
                        labelProperty={labelProperty}
                        complementLabelProperty={complementLabelProperty}
                        endpoint={endpoint}
                    />
                )
            }
        }
    }

    //light searched parts
    let searchLightedValue: string|null = null;
    if(filter && typeof filter === 'string') {
        searchLightedValue = lightSearchedPart(value.toString(), filter);
    } else if(qFilter) {
        searchLightedValue = lightSearchedPart(value.toString(), qFilter);
    }

    if(searchLightedValue) {
        return <div dangerouslySetInnerHTML={{__html: searchLightedValue}} />
    }

    if(type === 'html') {
        return <div dangerouslySetInnerHTML={{__html: value}} />
    }

    return value;
}
