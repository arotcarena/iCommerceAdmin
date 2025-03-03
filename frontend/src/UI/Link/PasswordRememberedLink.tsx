import { generateUrl } from "functions/router/urlGenerator"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

export const PasswordRememberedLink = () => {
    const {t} = useTranslation();

    return (
        <p className="mb-0">
            {t('wait_remember_my_password')} <Link to={generateUrl('login')} className="fw-semibold text-primary text-decoration-underline"> {t('click_here')} </Link> 
        </p>
    )
}