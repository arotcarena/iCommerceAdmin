import { destroyAuthToken } from "functions/storage/auth/authTokenStorage"
import { t } from "i18next";

export const logoutUser = (
    createAlert: (color: string, message: TrustedHTML|string) => void
) => {
    destroyAuthToken();
    //ajouter appel api pour destroy token coté back
    createAlert('success', t('success.logout'));
}
