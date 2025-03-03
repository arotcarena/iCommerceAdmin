import { formatDate } from "functions/dateHelpers/dateFormater";
import { useTranslation } from "react-i18next";

type Props = {
    dateString: string
}

export const DateDistanceShow = ({
    dateString
}: Props) => {
    const {i18n} = useTranslation();

    return formatDate(dateString, i18n.language);
    
    // const locale = i18n.language === 'fr' ? fr: enUS;
    // return formatDistanceToNowStrict(dateString, {addSuffix: true, locale});
}
