import { PropsWithChildren } from "react";
import Flatpickr from "react-flatpickr";
import { useTranslation } from "react-i18next";
import { FormFeedback, Label } from "reactstrap";
import { French } from 'flatpickr/dist/l10n/fr';

type Props = PropsWithChildren<{
    enableTime?: boolean,
    isRange?: boolean,
    validation: any,
    name: string,
    placeholder?: string,
    dateFormat?: string,
    timeFormat?: string,
    margin?: number,
    onChange?: () => void,
    isAlwaysOpen?: boolean,
    [key: string]: any
}>;


export const DatePickerField = ({
    enableTime = false,
    isRange = false,
    validation,
    name,
    placeholder,
    dateFormat = 'Y:m:d',
    timeFormat = 'H:i',
    margin,
    children,
    onChange,
    isAlwaysOpen = false,
    ...props
}: Props) => {
    const {i18n} = useTranslation();
    if(i18n.language === 'fr') {
        dateFormat = 'd/m/Y';
    }

    const handleChange = (dateValue: any) => {
        let newValue: string|string[] = '';
        if(!Array.isArray(dateValue)) {
            return;
        }
        if(dateValue.length > 1) {
            newValue = dateValue;
        } else {
            newValue = dateValue[0];
        }
        validation.setFieldValue(name, newValue);

        if(onChange) {
            onChange();
        }
    }

    const displayFormat = dateFormat + (enableTime ? ' ' + timeFormat: '');

    let options: object = {
        altInput: true,
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
        <div className={margin ? ' mt-'+margin+' mb-'+margin: ''}>
            {
                children && <Label htmlFor={name}>{children}</Label>
            }
            <Flatpickr
                className={'form-control' + (validation.touched[name] && validation.errors[name] ? ' is-invalid': '')}
                value={validation.values[name] ?? ''}
                name={name}
                options={options}
                onChange={handleChange}
                placeholder={placeholder || ''}
                onBlur={validation.handleBlur}
                id={name}
                {...props}
            />
            {
                validation.touched[name] && validation.errors[name] ? (
                    <FormFeedback type="invalid">{validation.errors[name]}</FormFeedback>
                ) : null
            }
        </div>
    )
}
