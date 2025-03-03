import { useTranslation } from "react-i18next"

import logo from "../../assets/images/custom/logo/main-logo.png";

export const LogoDark = () => {

    return (
        <div className="logo logo-dark" style={{lineHeight: '1.5'}}>
            <span className="logo-sm">
                <LogoDarkSmall />
            </span>
            <span className="logo-lg">
                <LogoDarkLarge />
            </span>
        </div>
    )
}

const LogoDarkSmall = () => {
    const {t} = useTranslation();

    return (
        <img src={logo} alt={t('logo')} width="45" />
    )
};

const LogoDarkLarge = () => {
    const {t} = useTranslation();

    return (
        <img src={logo} alt={t('logo')} width="100" />
    )
};
