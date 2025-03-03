import { PropsWithChildren } from "react";
import Flatpickr from "react-flatpickr";
import { Label } from "reactstrap";
import { BaseOptions } from "flatpickr/dist/types/options";
import { useTranslation } from "react-i18next";
import { French } from 'flatpickr/dist/l10n/fr';

type Props = PropsWithChildren<{
    enableTime?: boolean,
    isRange?: boolean,
    onChange: (date: string|string[]) => void,
    value?: any,
    placeholder?: string,
    dateFormat?: string,
    timeFormat?: string,
    isAlwaysOpen?: boolean,
    [key: string]: any
}>;


export const DatePickerField = ({
    enableTime = false,
    isRange = false,
    onChange,
    value,
    placeholder,
    dateFormat = 'Y:m:d',
    timeFormat = 'H:i',
    isAlwaysOpen,
    children,
    ...props
}: Props) => {
    const {i18n} = useTranslation();
    if(i18n.language === 'fr') {
        dateFormat = 'd/m/Y';
    }
    const handleChange = (dateValue: any) => {
        onChange(dateValue);
    } 

    const displayFormat = dateFormat + (enableTime ? ' ' + timeFormat: '');

    let options: Partial<BaseOptions> = {
        inline: isAlwaysOpen,
        altFormat: displayFormat,
        enableTime,
        locale: French,
    };
    if(isRange) {
        options = {
            ...options,
            mode: 'range'
        };
    }

    return (
        <>
            {
                children && <Label>{children}</Label>
            }
            <Flatpickr
                className="form-control"
                value={value || ''}
                options={options}
                onChange={handleChange}
                placeholder={placeholder || ''}
                {...props}
            />
        </>
    )
}
