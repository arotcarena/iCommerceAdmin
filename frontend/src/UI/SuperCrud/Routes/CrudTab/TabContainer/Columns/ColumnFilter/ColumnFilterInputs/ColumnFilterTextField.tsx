import { useTranslation } from "react-i18next";

type Props = {
    filter?: string,
    setFilterValue: (key: string, value: string|number) => void,
    placeholder?: string,
    name: string,
    additionalClass?: string,
    smallHeight?: boolean,
}

export const ColumnFilterTextField = ({
    filter,
    setFilterValue,
    placeholder,
    name,
    additionalClass,
    smallHeight = false,
}: Props) => {
    const {t} = useTranslation();

    const handleChange = (e: any) => {
        e.preventDefault();
        setFilterValue(name, e.target.value);
    };
    return (
        <input 
            type="text" 
            className={'form-control search' + (additionalClass ? ' ' + additionalClass: '')} 
            placeholder={placeholder ? t(placeholder): ''} 
            name={name}
            value={filter || ''}
            onChange={handleChange}
            style={{height: smallHeight ? '32px': undefined}}
        />
    );
}
