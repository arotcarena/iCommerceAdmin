import { MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "reactstrap"

type Props = {
    q?: string,
    setFilterValue: (key: string, value: string|number) => void,
    placeholder?: string,
    qParamName?: string
};

export const QSearchInput = ({
    q = '',
    setFilterValue,
    placeholder,
    qParamName = 'q'
}: Props) => {
    const {t} = useTranslation();

    const handleChange = (e: any) => {
        setFilterValue(qParamName, e.target.value);
    };

    const handleCloseClick = (e: MouseEvent) => {
        setFilterValue(qParamName, '');
    }

    return (
        <div className="search-box">
            <Input
                type="text"
                className="form-control search pe-4"
                placeholder={placeholder || (t('search') + '...')}
                value={q}
                onChange={handleChange}
            />
            <i className="ri-search-line search-icon"></i>
            {
                q !== '' && (
                    <button type="button" onClick={handleCloseClick} className="btn p-0 search-closer">
                        <i className="ri-close-line ri-xl"></i>
                    </button>
                )
            }
        </div>
    )
}
