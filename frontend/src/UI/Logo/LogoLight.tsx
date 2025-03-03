import { useTranslation } from "react-i18next"

import logo from "../../assets/images/custom/logo/main-logo.png";

export const LogoLight = () => {
    
    return (
        <div className="logo logo-light">
            <span className="logo-sm">
                <LogoLightSmall />
            </span>
            <span className="logo-lg">
                <LogoLightLarge />
            </span>
        </div>
    )
}

const LogoLightSmall = () => {
    const {t} = useTranslation();

    return (
        <img src={logo} alt={t('logo')} width="45" />
    )
};

const LogoLightLarge = () => {
    const {t} = useTranslation();

    return (
        <img src={logo} alt={t('logo')} width="100" />
    )
};
