import { FilterSelect } from "./FilterSelect";
import { useTranslation } from "react-i18next";

type Props = {
    setFilterValue: (key: string, value: string|number|null) => void,
    value?: number,
    defaultValue?: number,
    itemsPerPageParamName?: string,
    placeholder?: string,
    seeAllIsAvailable?: boolean,
};

export const ItemsPerPageFilter = ({
    setFilterValue,
    value,
    itemsPerPageParamName = 'itemsPerPage',
    placeholder,
    seeAllIsAvailable = false,
}: Props) => {
    const {t} = useTranslation();

    const options: {label: string, value: any}[] = [
        { label: t('results_per_page'), value: null },
        { label: '5', value: 5 },
        { label: '10', value: 10 },
        { label: '20', value: 20 },
        { label: '50', value: 50 },
        { label: '100', value: 100 },
    ];

    if(seeAllIsAvailable) {
        options.push({ label: t('see_all'), value: 'all' });
    }

    return (
        <div data-testid="itemsPerPage-filter">
            <FilterSelect
                options={options}
                value={value}
                setFilterValue={setFilterValue}
                name={itemsPerPageParamName}
                placeholder={placeholder || t('results_per_page')}
            />
        </div>
    )
}