import { useNavigate, useParams } from "react-router-dom";
import { CrudFormShow } from "./CrudFormShow";
import { CrudLayout } from "UI/SuperCrud/CrudLayout";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDeleteItem, useShowItem } from "functions/customHooks/api/queries/itemQueries";
import { useSuperCrud } from "Components/Contexts/SuperCrudContext";
import { RenderForm } from "type/superCrudTypes";
import { DeleteModal } from "UI/Modal/DeleteModal";
import { useTranslation } from "react-i18next";
import { useAlert } from "Components/Contexts/AlertContext";
import { useOpenState } from "functions/customHooks/state/useOpenState";

type Props = {
    renderShow?: RenderForm
};


export const CrudShow = ({
    renderShow
}: Props) => {
    const {t} = useTranslation();
    const {createAlert} = useAlert();
    const navigate = useNavigate();

    const {
        columns,
        basePath,
        forceFetch,
        showEndpoint,
        writeEndpoint,
        disabled,
        globalContext: {labelProperty, isDeletable, isEditable},
        itemIsEditableCondition,
        renderCustomTitleOnEditPage,
    } = useSuperCrud();

    const {id} = useParams();
    if(!id) {
        throw new Error('No id provided');
    }

    const showItem = useShowItem(showEndpoint);
    const {data: item} = useQuery({
        queryKey: ['item_show', showEndpoint, id],
        queryFn: () => showItem(parseInt(id)),
        initialData: null
    });

    //remove
    const [deleteModalIsOpen, openDeleteModal, closeDeleteModal] = useOpenState(false);
    const deleteItem = useDeleteItem(writeEndpoint);
    const {mutate} = useMutation({
        mutationFn: () => deleteItem(parseInt(id)),
        onSuccess: () => {
            forceFetch();
            createAlert('success', t('success.item_removal', {id}));
            navigate(basePath);
        },
        onError: (error: Error) => {
            createAlert('danger', error.message ?? t('error.item_removal'));
        }
    });

    const customTitle = renderCustomTitleOnEditPage && item ? renderCustomTitleOnEditPage(item): undefined;

    return (
        <CrudLayout
            customTitle={customTitle}
            breadcrumb={
                <span> / {item && item[labelProperty] ? item[labelProperty]: ('#' + id)}</span>
            }
            isIndexPage={false}
            id={item?.id}
        >
            {
                item && (
                    <div className="p-3">
                        <CrudFormShow 
                            item={item}
                            columns={columns}
                            renderShow={renderShow}
                        />
                        {
                            !disabled && isEditable && (
                                !itemIsEditableCondition ||
                                itemIsEditableCondition(item)
                            ) ? (
                                <div className="d-flex gap-1 flex-wrap form-submit-group">
                                    <button type="button" className="btn btn-success" onClick={() => navigate(basePath + '/update/' + item.id)}>
                                        <i className="ri-edit-2-fill"></i>{" "}
                                        {t('edit')}
                                    </button>
                                    {
                                        isDeletable && (
                                            <button type="button" className="btn btn-danger" onClick={openDeleteModal}>
                                                <i className="ri-delete-bin-fill"></i>{" "}
                                                {t('delete')}
                                            </button>
                                        )
                                    }
                                </div>
                            ): (
                                <div className="d-flex gap-1 flex-wrap form-submit-group">
                                    <div style={{height: '40px'}}></div>
                                </div>
                            )
                        }
                        {
                            isDeletable && (
                                <DeleteModal
                                    show={deleteModalIsOpen}
                                    onDeleteClick={mutate}
                                    onCloseClick={closeDeleteModal}
                                    item={item}
                                />
                            )
                        }
                    </div>
                )
            }
        </CrudLayout>
    )
}