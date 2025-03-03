import { useTranslation } from "react-i18next";
import { TabColumnType } from "type/superCrudTypes";
import { NumberField } from "UI/Form/FormField/NumberField";

type Props = {
    type: TabColumnType,
    minFilter?: string,
    maxFilter?: string,
    setFilterValue: (key: string, value: string|number) => void,
    minName: string,
    maxName: string,
    placeholder?: string,
    additionalClass?: string,
    smallHeight?: boolean,
};

export const ColumnFilterNumberField = ({
    type,
    minFilter,
    maxFilter,
    setFilterValue,
    minName,
    maxName,
    placeholder,
    additionalClass,
    smallHeight = false,
}: Props) => {
    const {t} = useTranslation();

    const handleChangeMin = (newValue: any) => {
        setFilterValue(minName, newValue);
    };

    const handleChangeMax = (newValue: any) => {
        setFilterValue(maxName, newValue);
    };

    return (
        <div className={'tab-col-dual-inputs' + (additionalClass ? ' ' + additionalClass: '')}>
            {
                placeholder && (
                    <div className="tab-col-dual-inputs-label">{t(placeholder)}</div>
                )
            }
            <NumberField
                type={type}
                className="search form-control"
                name={minName}
                value={minFilter}
                onChange={handleChangeMin}
                placeholder={t('min')}
                smallHeight={smallHeight}
            />
            <NumberField
                type={type}
                className="search form-control"
                name={maxName}
                value={maxFilter}
                onChange={handleChangeMax}
                placeholder={t('max')}
                smallHeight={smallHeight}
            />
        </div>
    )
}
