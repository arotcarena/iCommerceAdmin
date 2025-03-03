import { useTranslation } from "react-i18next";
import Select from "react-select";
import { SortOption } from "type/formTypes";


type Props = {
    options: SortOption[],
    onChange: (sortValue: string) => void,
    placeholder?: string
};

export const Sorter = ({
    options = [],
    onChange,
    placeholder
}: Props) => {
    const {t} = useTranslation();

    const handleChange = (sortOption: any) => {
        onChange(sortOption.value);
    }

    return (
        <Select
            options={options}
            onChange={handleChange}
            name="sortBy"
            placeholder={placeholder || t('sort')}
        />
    )

}