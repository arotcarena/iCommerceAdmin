import { useGetUser } from "../useGetUser";
import { useAlert } from "Components/Contexts/AlertContext";
import { haveArraysCommonValue } from "functions/arrayHelpers/commonValuesChecker";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const useIsGranted = (roles: string[], message?: string, target?: string) => {
  const {t} = useTranslation();

  const {user} = useGetUser();
  const {createAlert} = useAlert();
  const navigate = useNavigate();

  if(user && !haveArraysCommonValue(user.roles, roles)) {
    createAlert('danger', message ? t(message): t('error.forbidden'));
    //if no target, return to previous page
    target ? navigate(target): navigate(-1);
  }
};
