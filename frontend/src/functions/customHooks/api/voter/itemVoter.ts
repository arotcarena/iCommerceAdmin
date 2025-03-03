import { API_USERS } from "Routes/apiRoutes";
import { useGetUser } from "functions/customHooks/useGetUser";
import { useTranslation } from "react-i18next";


type CanDeleteItem = (id: number) => boolean;

/**
 * current company cannot be deleted
 * current logged user cannot be deleted
 */
export const useItemDeleteVoter = (endpoint: string): CanDeleteItem => {
    const {t} = useTranslation();

    const {user} = useGetUser();

    const canDeleteItem = (id: number): boolean => {
        if(endpoint === API_USERS && id == user?.id) {
            throw new Error(t('error.delete_current_user'));
        }
        return true;
    }

    return canDeleteItem;
}

