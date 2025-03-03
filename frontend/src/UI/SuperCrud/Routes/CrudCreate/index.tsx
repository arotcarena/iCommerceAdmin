import { useNavigate } from "react-router-dom"
import { CrudForm } from "../../CrudForm";
import { useAlert } from "Components/Contexts/AlertContext";
import { CrudLayout } from "UI/SuperCrud/CrudLayout";
import { usePostItem } from "functions/customHooks/api/queries/itemQueries";
import { useSuperCrud } from "Components/Contexts/SuperCrudContext";
import { RenderForm } from "type/superCrudTypes";
import { useTranslation } from "react-i18next";


type Props = {
    renderForm?: RenderForm
};

export const CrudCreate = ({
    renderForm
}: Props) => {
    const {t} = useTranslation();

    const navigate = useNavigate();
    const {
        basePath,
        writeEndpoint,
        forceFetch,
        columns,
        parentIri,
        parentPropertyName,
        storeFormDataKey,
        storeFormDataPersistantFields,
        dataTransformerFn,
        customValidation,
        redirectToUpdateAfterCreate,
        customCreateLabel,
    } = useSuperCrud();

    const {createAlert} = useAlert();
    
    const handleReturn = () => {
        navigate(basePath);
    }
    
    //create
    const postItem = usePostItem(writeEndpoint, columns, parentIri, parentPropertyName);
    
    const mutationFn = (formData: Object): Promise<any> => {
        return postItem(formData);
    };
    
    const handleSubmitSuccess = (data: any) => {
        forceFetch();
        createAlert('success', t('success.item_create'));
        if(redirectToUpdateAfterCreate && data.id) {
            navigate(basePath + '/update/' + data.id);
            return;
        }
        navigate(basePath);
    }

    return (
        <CrudLayout
            breadcrumb={
                <span> / {customCreateLabel ?? t('create')}</span>
            }
            isIndexPage={false}
            isSubCrud={parentIri !== undefined}
            customCreateLabel={customCreateLabel}
        >
            <div className="p-3">
                <CrudForm
                    columns={columns}
                    mutationFn={mutationFn}
                    handleSubmitSuccess={handleSubmitSuccess}
                    onClose={handleReturn}
                    renderForm={renderForm}
                    isCreateForm={true}
                    storeFormDataKey={storeFormDataKey}
                    storeFormDataPersistantFields={storeFormDataPersistantFields}
                    dataTransformerFn={dataTransformerFn}
                    customValidation={customValidation}
                />
            </div>
        </CrudLayout>
    )
}
