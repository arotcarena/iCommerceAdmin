import { CrudFormField } from "./CrudFormField";
import { RenderForm, TabColumn } from "type/superCrudTypes";
import { SearchItem } from "type/searchTypes";
import { useFormValidation } from "functions/customHooks/form/useFormValidation";
import { FormSubmitGroup } from "UI/Form/Submit/FormSubmitGroup";

type Props = {
    item?: SearchItem,
    columns: TabColumn[],
    mutationFn: (formData: any) => Promise<any>,
    handleSubmitSuccess: (data: any) => void,
    onClose?: () => void,
    renderForm?: RenderForm,
    isCreateForm?: boolean,
    storeFormDataKey?: string,
    storeFormDataPersistantFields?: string[],
    dataTransformerFn?: (formData: any) => any,
    customValidation?: (formData: any) => string[], // return error messages
};

export const CrudForm = ({
    item,
    columns,
    mutationFn,
    handleSubmitSuccess,
    onClose,
    renderForm,
    isCreateForm = false,
    storeFormDataKey,
    storeFormDataPersistantFields,
    dataTransformerFn,
    customValidation,
}: Props) => {

    // We need to wait that columns are loaded, because CrudForm needs to set initialValues on mount
    // and these initialValues are defined based on the columns types
    
    if(columns.length < 1) {
        return '';
    }

    return (
        <CrudFormWithColumnsLoaded 
            item={item}
            columns={columns}
            mutationFn={mutationFn}
            handleSubmitSuccess={handleSubmitSuccess}
            onClose={onClose}
            renderForm={renderForm}
            isCreateForm={isCreateForm}
            storeFormDataKey={storeFormDataKey}
            storeFormDataPersistantFields={storeFormDataPersistantFields}
            dataTransformerFn={dataTransformerFn}
            customValidation={customValidation}
        />
    )
};


export const CrudFormWithColumnsLoaded = ({
    item,
    columns,
    mutationFn,
    handleSubmitSuccess,
    onClose,
    renderForm,
    isCreateForm = false,
    storeFormDataKey,
    storeFormDataPersistantFields,
    dataTransformerFn,
    customValidation,
}: Props) => {
    const {isPending, validation} = useFormValidation(columns,
        mutationFn,
        handleSubmitSuccess,
        item,
        storeFormDataKey,
        storeFormDataPersistantFields,
        dataTransformerFn,
        customValidation
    );

    return (
        <div style={{opacity: isPending ? .5: 1}}>
            {
                renderForm ? (
                    renderForm(validation, columns, false, isPending, onClose, isCreateForm, item?.id)
                ): (
                    <form onSubmit={validation.handleSubmit}>
                        {
                            columns.map((column, index) => (
                                <CrudFormField
                                    key={index}
                                    column={column}
                                    validation={validation}
                                />
                            ))
                        }
                        <FormSubmitGroup
                            isPending={isPending}
                            onClose={onClose}
                        />
                    </form>
                )
            }
        </div>
    )
};
