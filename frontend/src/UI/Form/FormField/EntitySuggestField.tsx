import { MouseEvent, PropsWithChildren, useEffect, useMemo, useRef, useState } from "react";
import { Label } from "reactstrap";
import { useApiPlatformQSearch } from "functions/customHooks/search/qSearch/useApiPlatformQSearch";
import { SelectedItem, SelectedItemDisabled } from "../WithSuggest/SelectedItem";
import { InputIcons, InputIconsDisabled } from "../WithSuggest/InputIcons";
import { SuggestList } from "../Suggest/SuggestList";
import { resolveEntityLabel } from "functions/entity/entityLabelResolver";
import { EntityLink } from "UI/Show/EntityLink";
import { EntityType } from "type/entityTypes";
import { EntityFieldValue } from "type/formTypes";
import i18n from "i18n";


type Props = PropsWithChildren<{
    multiple?: boolean, 
    endpoint: string,
    defaultFilters?: {[key: string]: any},
    name: string,
    value: EntityFieldValue,
    onChange: (value: EntityFieldValue) => void,
    labelProperty?: string,
    complementLabelProperty?: string,
    onSelect?: (item: EntityType) => void,
    onClose?: () => void,
    placeholder?: string,
    margin?: number,
    defaultIsOpen?: boolean,
    openOnFocus?: boolean,
    disabled?: boolean,
    maxSuggestedItems?: number,
    customEntityLabelResolver?: (entity: EntityType, locale?: string) => string,
    onCellFocus?: () => void, // used for tab cells always open
    suggestItemIsSelectableCondition?: (suggest: EntityType) => boolean,
    suggestNotSelectableLabel?: string,
    waitFirstOpeningToLoad?: boolean,
    isInvalid?: boolean,
    inModal?: boolean, // change element on which listen on close click
    [key: string]: any
}>;

export const EntitySuggestField = ({
    multiple = false,
    endpoint,
    defaultFilters,
    name,
    value,
    onChange,
    labelProperty,
    complementLabelProperty,
    onSelect,
    onClose,
    placeholder,
    children,
    margin,
    defaultIsOpen = false,
    openOnFocus = true,
    disabled = false,
    maxSuggestedItems,
    customEntityLabelResolver,
    onCellFocus,
    suggestItemIsSelectableCondition,
    suggestNotSelectableLabel,
    waitFirstOpeningToLoad = true,
    isInvalid = false,
    inModal = false,
    ...props
}: Props) => {
    //STATES
    const [isValidSelectedValue, setIsValidSelectedValue] = useState<boolean>(true);
    //to avoid search suggests when q has changed after a select
    const [justSelected, setJustSelected] = useState<boolean>(false);

    //q
    const resolveQ = () => {
        let resolvedQ = '';
        if(!multiple && value && !Array.isArray(value)) {
            resolvedQ = resolveEntityLabel(value, labelProperty, complementLabelProperty, customEntityLabelResolver);
        }
        return resolvedQ;
    }
    const [q, setQ] = useState<string>(resolveQ());
    //synchronize from value to q
    useEffect(() => {
        if(!multiple) {
            const currentQ = resolveQ();
            if(q !== currentQ) {
                setQ(currentQ);
            }
        }
    }, [value]);

    const handleChange = (e: any) => {
        setQ(e.target.value);
        setIsValidSelectedValue(false);
        if(e.target.value === '' && isOpen) {
            setOpen(false);
        }
        if(e.target.value !== '' && !isOpen) {
            setOpen(true);
        }
    };
    
    //suggestsItems
    const [canStartLoad, setCanStartLoad] = useState<boolean>(waitFirstOpeningToLoad ? false: true);
    const {data, isLoading} = useApiPlatformQSearch<EntityType>(endpoint, q, 'q', maxSuggestedItems, 300, defaultFilters, canStartLoad);
    const suggests: EntityType[] = useMemo(() => {
        if(data) {
            return data.items;
        }
        return [];
    }, [data]);

    //open or close
    const [isOpen, setOpen] = useState<boolean>(false);
    useEffect(() => {
        if(justSelected) {
            setOpen(false);
            setJustSelected(false);
            return;
        }
        if((suggests.length > 0 && defaultIsOpen) && !isOpen) {
            setOpen(true);
        }
    //eslint-disable-next-line
    }, [suggests]);
    useEffect(() => {
        if(defaultIsOpen && !isOpen) {
            // use setTimeout to do it after handle close do close
            setTimeout(() => {
                setOpen(true);
            }, 0);
        }
    }, [defaultIsOpen]);
    // if wait first opening to load
    useEffect(() => {
        if(isOpen && waitFirstOpeningToLoad && !canStartLoad) {
            setCanStartLoad(true);
        }
    }, [isOpen]);

    //handlers
    const inputRef = useRef<HTMLInputElement>(null);
    const handleWrapperClick = (e: any) => {
        //if click on entityLink, don't preventDefault
        if(!e.target?.classList?.contains('ri-external-link-line')) {
            e.preventDefault();
        }
        e.stopPropagation();
        if(!isOpen) {
            setOpen(true);
        }
        inputRef.current?.focus();
    };

    const handleRemoveSelectedItem = (id: number): void => {
        if(multiple && Array.isArray(value)) {
            onChange(value.filter((item: EntityType) => item.id !== id));
        }
    };
    const handleSelect = (suggest: EntityType) => {
        if(multiple) {
            //update Q
            setQ('');
            //verify if suggest is already selected
            if(value && value.find((item: EntityType) => item.id === suggest.id)) {
                setOpen(false);
                return;
            }
            //update value
            if(!value) {
                onChange([suggest]);
            }
            if(Array.isArray(value)) {
                onChange([...value, suggest]);
            }
        } else {
            //update Q
            setQ(resolveEntityLabel(suggest, labelProperty, complementLabelProperty, customEntityLabelResolver));
            //update value
            onChange(suggest);
        }

        //custom listener
        if(onSelect) {
            onSelect(suggest);
        }

        //display states
        setIsValidSelectedValue(true);
        setJustSelected(true);
        setOpen(false);
    };
    const handleClose = () => {
        setOpen(false);
        if(onClose) {
            onClose();
        }
    };
    const handleMainRemove = () => {
        onChange(
            multiple ? []: null
        );
        setQ('');
        inputRef.current?.focus();
    };

    //if content entered by user is not in existing choices, empty field on blur
    //this is usefull only on not multiple field
    const handleBlur = (e: any) => {
        // if click on close button
        if(e.relatedTarget?.classList.contains('input-closer')) {
            e.preventDefault();
            e.stopPropagation();
            handleMainRemove();
        }

        if(multiple) {
            setQ('');
            return;
        }

        // valid current input value
        if(isValidSelectedValue) {
            return;
        }

        const suggestsLabels = suggests.map((suggest: EntityType) => (
            resolveEntityLabel(suggest, labelProperty, complementLabelProperty, customEntityLabelResolver)
        ));
        if(!suggestsLabels.includes(q)) {
            setQ('');
        }
    };

    /**
     * By default select first suggest automatically
     */
    const defaultSelect = () => {
        if(suggests.length > 0) {
            handleSelect(suggests[0]);
        }
    }

    /**
     * On focus open suggest list
     */
    const handleInputFocus = (e: any) => {
        if(openOnFocus && !isOpen) {
            e.preventDefault();
            e.stopPropagation();
            setOpen(true);
        }
        // for tab cells always open
        if(onCellFocus) {
            onCellFocus();
        }
    };

    if(disabled) {
        return (
            <div className={margin ? 'mt-'+margin+' mb-'+margin: ''}>
                {
                    children && <Label htmlFor={name}>{children}</Label>
                }
                <div className="form-group position-relative">
                    <div className="input-suggested disabled">
                        <div className="input-suggested-box-wrapper form-control d-flex align-items-center ps-0 pe-2">
                            <div className="input-selected-items">
                                {
                                    multiple && value && value.length > 0 && value.map((item: EntityType) => (
                                        <SelectedItemDisabled key={item.id}>
                                            <EntityLink
                                                entity={item}
                                                endpoint={endpoint}
                                                labelProperty={labelProperty}
                                                complementLabelProperty={complementLabelProperty}
                                                customEntityLabelResolver={customEntityLabelResolver}
                                                theme="dark"
                                            />
                                        </SelectedItemDisabled>
                                    ))
                                }
                                {
                                    !multiple && value && !Array.isArray(value) && (
                                        <span className="me-1">
                                            <EntityLink
                                                entity={value}
                                                endpoint={endpoint}
                                                labelProperty={labelProperty}
                                                complementLabelProperty={complementLabelProperty}
                                                customEntityLabelResolver={customEntityLabelResolver}
                                                hasLabel={false}
                                                theme="secondary"
                                            />
                                        </span>
                                    )
                                }
                                {
                                    !multiple && (
                                        <input disabled={true} id={name} {...props} className="invisible-input" value={q} />
                                    )
                                }
                            </div>
                            <InputIconsDisabled />
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <div className={'select-zindex-group' + (margin ? ' mt-'+margin+' mb-'+margin: '')}>
            {
                children && <Label htmlFor={name}>{children}</Label>
            }
            <div className="form-group position-relative">
                <div className={'input-suggested' + (isOpen ? ' active': '')} onClick={handleWrapperClick}>
                    <div className="input-suggested-box-wrapper form-control d-flex align-items-center ps-0 pe-2">
                        <div className="input-selected-items">
                            {
                                multiple && value && value.length > 0 && value.map((item: EntityType) => (
                                    <SelectedItem key={item.id} id={item.id} onRemove={handleRemoveSelectedItem}>
                                        <EntityLink
                                            entity={item}
                                            endpoint={endpoint}
                                            labelProperty={labelProperty}
                                            complementLabelProperty={complementLabelProperty}
                                            customEntityLabelResolver={customEntityLabelResolver}
                                            theme="light"
                                        />
                                    </SelectedItem>
                                ))
                            }
                            {
                                !multiple && value && !Array.isArray(value) && !isOpen && (
                                    <span className="me-1">
                                        <EntityLink
                                            entity={value}
                                            endpoint={endpoint}
                                            labelProperty={labelProperty}
                                            complementLabelProperty={complementLabelProperty}
                                            customEntityLabelResolver={customEntityLabelResolver}
                                            hasLabel={false}
                                        />
                                    </span>
                                )   
                            }
                            <input
                                ref={inputRef} 
                                id={name}
                                {...props}
                                className="invisible-input" 
                                name="q"
                                value={q} 
                                onChange={handleChange} 
                                placeholder={placeholder || ''}
                                onBlur={handleBlur}
                                autoComplete="off"
                                onFocus={handleInputFocus}
                            />
                        </div>
                        <InputIcons
                            isLoading={isLoading}
                            onMainRemove={handleMainRemove}
                            mainRemoveIsOpen={(multiple && value && value.length > 0) || (q !== '')}
                        />
                    </div>
                    {
                        isOpen && (
                            <SuggestList
                                suggests={suggests}
                                onSelect={handleSelect}
                                onDefaultSelect={defaultSelect}
                                onClose={handleClose}
                                suggestItemIsSelectableCondition={suggestItemIsSelectableCondition}
                                renderSuggestItem={(item: EntityType) => (
                                    resolveEntityLabel(item, labelProperty, complementLabelProperty, customEntityLabelResolver, i18n.language, true)
                                )}
                                suggestNotSelectableLabel={suggestNotSelectableLabel}
                                inModal={inModal}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    )
};
