import bell from "../../../../../assets/images/svg/bell.svg";
import { useTranslation } from "react-i18next";


export const EmptyNotificationsList = () => {
    const {t} = useTranslation();

    return (
        <>
            <div className="w-25 w-sm-50 pt-3 mx-auto">
                <img src={bell} className="img-fluid" alt="user-pic" />
            </div>
            <div className="text-center pb-5 mt-2">
                <h6 className="fs-18 fw-semibold lh-base">{t('info.no_notifications')}</h6>
            </div>
        </>
    )
}
