import { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next"

export const NoActionAvailableButton = ({
    children,
}: PropsWithChildren) => {
    const {t} = useTranslation();
    return (
        <div className="d-flex">
            <div className="bg-white d-flex align-items-center px-3 border border-dark" style={{borderRadius: '5px', height: '40px'}}>
                <i className="ri-information-line me-1"></i>
                {
                    children || t('no_action_available')
                }
            </div>
        </div>
    )
}
