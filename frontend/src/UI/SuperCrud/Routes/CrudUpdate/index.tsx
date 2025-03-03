import { Link, useNavigate, useParams } from "react-router-dom";
import { CrudForm } from "../../CrudForm";
import { useAlert } from "Components/Contexts/AlertContext";
import { CrudLayout } from "UI/SuperCrud/CrudLayout";
import { useQuery } from "@tanstack/react-query";
import { usePatchItem, useShowItem, useUpdateItem } from "functions/customHooks/api/queries/itemQueries";
import { useSuperCrud } from "Components/Contexts/SuperCrudContext";
import { RenderForm } from "type/superCrudTypes";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Item } from "type/searchTypes";

type Props = {
    renderForm?: RenderForm,
    usePatch?: boolean
};

export const CrudUpdate = ({
    renderForm,
    usePatch
}: Props) => {
    const {t} = useTranslation();

    const {createAlert} = useAlert();
    const navigate = useNavigate();
    const {
        basePath, 
        showEndpoint,
        writeEndpoint,
        columns, 
        forceFetch, 
        parentIri, 
        parentPropertyName, 
        globalContext: {labelProperty}, 
        redirectOnUpdate, 
        onSubmitSuccess,
        itemIsEditableCondition,
        dataTransformerFn,
        customValidation,
        renderCustomTitleOnEditPage,
} = useSuperCrud();
    const {id} = useParams();
    if(!id) {
        throw new Error('No id provided');
    }

    const handleReturn = () => {
        navigate(basePath);
    }

    //show
    const showItem = useShowItem(showEndpoint);
    const {data: item} = useQuery({
        queryKey: ['item_show', showEndpoint, id],
        queryFn: () => showItem(parseInt(id)),
        initialData: null,
        placeholderData: null,
        gcTime: 0,
        staleTime: 0
    });

    //verify if line is disabled
    const verifyIfEditable = (item: Item, itemIsEditableCondition?: (item: Item) => boolean) => {
        if(item && itemIsEditableCondition && !itemIsEditableCondition(item)) {
            createAlert('danger', t('error.update_entry_forbidden'));
            handleReturn();
        }
    }
    const [count, setCount] = useState(0);
    const [timer, setTimer] = useState<any>(null);
    useEffect(() => {
        if(item) {
            if(timer) {
                clearTimeout(timer);
            }
            setCount(count => count + 1);
            if(count < 2) {
                const timeout = setTimeout(() => {
                    verifyIfEditable(item, itemIsEditableCondition);
                }, 2000);
                setTimer(timeout);
            } else {
                verifyIfEditable(item, itemIsEditableCondition);
            }
        }
    }, [item, itemIsEditableCondition]);

    //update
    const updateItem = useUpdateItem(writeEndpoint, columns);
    const patchItem = usePatchItem(writeEndpoint, columns, parentIri, parentPropertyName);

    const mutationFn = (formData: object): Promise<any> => {
        return usePatch ? patchItem(parseInt(id), formData): updateItem(parseInt(id), formData);
    };
    const handleSubmitSuccess = (): void => {
        forceFetch();
        createAlert('success', t('success.record_update'));
        if(redirectOnUpdate) {
            navigate(basePath);
        }
        if(onSubmitSuccess) {
            onSubmitSuccess();
        }
    };

    const customTitle = renderCustomTitleOnEditPage && item ? renderCustomTitleOnEditPage(item): undefined;

    return (
        <CrudLayout
            customTitle={customTitle}
            breadcrumb={
                <>
                    <span> / </span>
                    <Link to={basePath + '/show/' + id}>{item && item[labelProperty] ? item[labelProperty]: ('#' + id)}</Link>
                    <span> / </span>
                    <span>{t('update')}</span>
                </>
            }
            isIndexPage={false}
            id={item?.id}
            isSubCrud={parentIri !== undefined}
        >
            <div className="p-3">
                {
                    item && (
                        <CrudForm
                            item={item}
                            columns={columns}
                            mutationFn={mutationFn}
                            handleSubmitSuccess={handleSubmitSuccess}
                            onClose={handleReturn}
                            renderForm={renderForm}
                            dataTransformerFn={dataTransformerFn}
                            customValidation={customValidation}
                        />
                    )
                }
            </div>
        </CrudLayout>
    )
}
