import { useOpenState } from "functions/customHooks/state/useOpenState";
import { formatDate } from "functions/dateHelpers/dateFormater";
import { MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { DatePickerField } from "UI/Form/FormField/DatePickerField";
import { ModalField } from "UI/Form/FormFieldWithFormik/SubForm/ModalField";

type Props = {
    afterFilter?: string
    beforeFilter?: string,
    afterName: string,
    beforeName: string,
    setFilterValue: (key: string, value: string|number) => void,
    resetFilter: (key: string) => void,
    enableTime: boolean
    placeholder?: string,
    label?: string,
}

export const ColumnFilterDatePicker = ({
    afterFilter,
    beforeFilter,
    afterName,
    beforeName,
    setFilterValue,
    resetFilter,
    enableTime,
    placeholder,
    label
}: Props) => {
    const {t} = useTranslation();

    const handleChange = (date: any) => {
        if(date.length === 2) {
            const afterDate = date[0];
            const beforeDate = date[1];
            // set time to 3h and 21h to avoid problems of changing day because of timezone
            // this will be transform to 00:00:00 and 23:59:59 in filterConvertor before to be sent to api
            afterDate.setHours(3, 0, 0, 0);
            beforeDate.setHours(21, 0, 0, 0);
            setFilterValue(afterName, date[0].toISOString());
            setFilterValue(beforeName, date[1].toISOString());
        } else {
            date[0].setHours(3, 0, 0, 0);
            setFilterValue(afterName, date[0].toISOString());
            resetFilter(beforeName);
        }
    }

    const value = (afterFilter || beforeFilter) ? (
        [afterFilter ?? '', beforeFilter ?? '']
    ): '';

    const [isOpen, open, close] = useOpenState(false);
 
    return (
        <>
            {
                isOpen && (
                    <ModalField
                        close={close}
                        onSubmit={close}
                        hasSubmitControls={false}
                        formField={(
                            <div className="mb-4 date-picker-filter-wrapper" style={{padding: '0 30px'}}>
                                <DatePickerField
                                    value={value}
                                    onChange={handleChange}
                                    enableTime={enableTime}
                                    isRange={true}
                                    placeholder={placeholder}
                                    isAlwaysOpen={true}
                                >
                                    {
                                        label && (
                                            <div className="mb-2">
                                                {t(label)}
                                            </div>
                                        )
                                    }
                                </DatePickerField>
                            </div>
                        )}
                    />
                )
            }
            <div>
                <FilterDatePickerShow value={value} onClick={open} enableTime={enableTime} />
            </div>
        </>
    )
}


type FilterDatePickerShowProps = {
    value: string|string[], 
    onClick: () => void,
    enableTime: boolean
};

const FilterDatePickerShow = ({
    value,
    onClick,
    enableTime
}: FilterDatePickerShowProps) => {
    const handleClick = (e: MouseEvent) => {
        e.preventDefault();
        onClick();
    }
    const {i18n} = useTranslation();

    let displayValues = [];
    if(Array.isArray(value)) {
        for(const v of value) {
            try {
                displayValues.push(formatDate(v, i18n.language, enableTime));
            } catch(e) {
                //
            }
        }
    } else if(value) {
        try {
            displayValues.push(formatDate(value, i18n.language, enableTime));
        } catch(e) {
            displayValues.push(' ');
        }
    }

    if(displayValues.length < 2) {
        return (
            <div className="form-control" onClick={handleClick} style={{minHeight: '38px'}}>
                {displayValues[0]}
            </div>
        )
    }

    return (
        <div className="form-control" onClick={handleClick}>
            {
                displayValues[0]
            }
            {' '}
                <i className="ri-arrow-right-line"></i>
            {' '}
            {
                displayValues[1]
            }
        </div>
    )
}
