import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAlert } from "Components/Contexts/AlertContext";
import { API_USERS } from "Routes/apiRoutes";
import { CrudForm } from "UI/SuperCrud/CrudForm";
import { CrudFormShow } from "UI/SuperCrud/Routes/CrudShow/CrudFormShow";
import { useRetrieveEntityContext } from "functions/customHooks/CRUD/CrudTab/useRetrieveEntityContext";
import { usePatchItem, useShowItem } from "functions/customHooks/api/queries/itemQueries";
import { useOpenState } from "functions/customHooks/state/useOpenState";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { User } from "type/entityTypes";
import { ProfileForm } from "./ProfileForm";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import { generateUrl } from "functions/router/urlGenerator";
import { TabColumn } from "type/superCrudTypes";

type Props = {
    user: User
};

export const ProfileEdit = ({
    user
}: Props) => {
    const {t} = useTranslation();
    const {createAlert} = useAlert();

    //show full user
    const showUser = useShowItem(API_USERS);
    const {data: fullUser, error} = useQuery({
        queryKey: ['item_show', API_USERS, user.id],
        queryFn: () => showUser(user.id),
    });
    
    //editable data 
    const {columns} = useRetrieveEntityContext('User');

    const editableColumns = useMemo(() => {
        return columns.filter(column => !['roles', 'plainPassword'].includes(column.name));
    }, [columns]);

    const editableUser = useMemo(() => ({
        id: user.id,
        email: user.email,
        civility: fullUser?.civility || '',
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: fullUser?.avatar ?? user.avatar,
        jobTitle: fullUser?.jobTitle || '',
        emailSignature: fullUser?.emailSignature || '',
        agentId: fullUser?.agentId
    }), [user, fullUser]);

    //update
    const [isEdit, openEdit, closeEdit] = useOpenState(false);

    const patchItem = usePatchItem(API_USERS, columns);
    const mutationFn = (formData: Object): Promise<any> => patchItem(user.id, formData);

    //on update success
    const queryClient = useQueryClient();
    const handleSubmitSuccess = () => {
        createAlert('success', t('success.user_update'));
        closeEdit();
        //refetch current user
        queryClient.invalidateQueries({
            queryKey: ['me']
        });
        queryClient.invalidateQueries({
            queryKey: ['item_show', API_USERS, user.id]
        });
    };


    if(error) {
        <div className="alert alert-danger m-4">{t('error.loading_data')}</div>
    }

    return (
        <Card>
            <h5 className="card-title mt-4 ms-4 mb-2 flex-grow-1">
                <Link to={generateUrl('profile')} onClick={closeEdit}>{t('profile')}</Link>
                {
                    isEdit && (
                        <>
                            <span> / </span>
                            {t('edit')}
                        </>
                    )
                }
            </h5>
            <CardBody className="ps-4 pe-4 pt-4" style={{maxWidth: '850px'}}>
                {
                    isEdit ? (
                        <CrudForm
                            item={editableUser}
                            columns={editableColumns}
                            mutationFn={mutationFn}
                            handleSubmitSuccess={handleSubmitSuccess}
                            onClose={closeEdit}
                            renderForm={(validation: any, columns: TabColumn[], disabled: boolean, isPending?: boolean, onClose?: () => void) => (
                                <ProfileForm
                                    validation={validation} 
                                    columns={editableColumns}
                                    isPending={isPending}
                                    onClose={onClose}
                                />
                            )}
                        />
                    ): (
                        <>
                            <CrudFormShow
                                item={editableUser}
                                renderShow={(validation: any) => (
                                    <ProfileForm
                                        validation={validation}
                                        columns={editableColumns}
                                        disabled={true}
                                    />
                                )}
                            />
                            <div className="form-submit-group">
                                <button onClick={openEdit} className="btn btn-success">
                                    <i className="ri-edit-2-fill me-2"></i>
                                    <span>{t('edit')}</span>
                                </button>
                            </div>
                        </>
                    )
                }
            </CardBody>
        </Card>
    );
}