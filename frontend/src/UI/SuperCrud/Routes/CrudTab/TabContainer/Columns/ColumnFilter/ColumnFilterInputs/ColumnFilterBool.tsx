import { useTranslation } from "react-i18next";

type Props = {
    filter?: boolean,
    setFilterValue: (key: string, value: string|number) => void,
    placeholder?: string,
    name: string
}

export const ColumnFilterBool = ({
    filter,
    setFilterValue,
    placeholder,
    name
}: Props) => {
    const {t} = useTranslation();

    const handleChange = (e: any) => {
        e.preventDefault();
        setFilterValue(name, e.target.checked);
    };
    return (
        <div className="form-check form-switch mt-2 mb-2 ms-1">
            {
                placeholder && <div>{t(placeholder)}</div>
            }
            <input
                style={{opacity: filter === undefined ? .4: 1}}
                checked={filter || false}
                onChange={handleChange}
                type="checkbox"
                role="switch" 
                className="form-check-input form-switch-md"
                name={name}
            />
        </div>
    );
}