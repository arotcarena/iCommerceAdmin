import { useTranslation } from "react-i18next";

export const PasswordRequirements = () => {
    const {t} = useTranslation();

    return (
        <div className="p-3 bg-light mb-2 rounded">
            <h5 className="fs-13">{t('info.password_must_contain')}</h5>
            <p id="pass-length" className="invalid fs-12 mb-2" dangerouslySetInnerHTML={{__html: t('info.minimum_characters', {count: 8})}}></p>
            <p id="pass-lower" className="invalid fs-12 mb-2" dangerouslySetInnerHTML={{__html: t('info.minimum_one_lowercase')}}></p>
            <p id="pass-upper" className="invalid fs-12 mb-2" dangerouslySetInnerHTML={{__html: t('info.minimum_one_uppercase')}}></p>
            <p id="pass-number" className="invalid fs-12 mb-0" dangerouslySetInnerHTML={{__html: t('info.minimum_one_number')}}></p>
        </div>
    )
}
