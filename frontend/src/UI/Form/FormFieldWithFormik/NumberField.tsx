import { hasTooMuchDecimals } from "functions/numberHelpers/decimalsHelper"
import { forceNumberToBeNegative } from "functions/numberHelpers/forceNumber"
import { PropsWithChildren } from "react"
import { FormFeedback, Input, Label } from "reactstrap"
import { TabColumnType } from "type/superCrudTypes"


export type TextFieldProps = PropsWithChildren<{
    name: string,
    validation: any,
    onBlur?: (e: any) => void,
    onChange?: (e: any) => void,
    className?: string,
    margin?: number,
    type?: TabColumnType,
    maxDecimals?: number,
    ignoreZeroValue?: boolean,
    forceNegative?: boolean,
    [key: string]: any
}>

export const NumberField = ({
    name,
    validation,
    onBlur,
    onChange,
    children,
    className,
    margin,
    type = 'float',
    maxDecimals,
    ignoreZeroValue = false,
    forceNegative = false,
    ...props
}: TextFieldProps) => {

    const handleBlur = (e: any) => {
        if(onBlur) {
            onBlur(e);
        }
        validation.handleBlur(e);
    };

    const handleKeyDown = (e: any) => {
        if(['.', ','].includes(e.key)) {
            //if necessary, limit int
            if(type === 'int') {
                e.preventDefault();
                e.stopPropagation();
            }
        }
    };

    const handlePaste = (e: any) => {
        if(type === 'int') {
            e.preventDefault();
            let valueToString = e.clipboardData.getData('text').toString();
            if(valueToString.includes('.')) {
                valueToString = valueToString.split('.')[0];
            } 
            if(valueToString.includes(',')) {
                valueToString = valueToString.split(',')[0];
            }
            validation.setFieldValue(name, parseInt(valueToString));
        }
    };

    const handleChange = (e: any) => {
        let currentValue = e.target.value;
        //if there is a max decimals constraint
        if(maxDecimals && hasTooMuchDecimals(currentValue, maxDecimals)) {
            return;
        }
        if(type === 'price') {
            //if type is price, limit max decimals 2
            if(hasTooMuchDecimals(currentValue, 2)) {
                return;
            }
            //transform to cents
            if(currentValue) {
                currentValue = Math.round(currentValue * 100);
            }
        }
        if(forceNegative) {
            currentValue = forceNumberToBeNegative(currentValue);
        }
        if(onChange) {
            onChange(e);
        }
        validation.setFieldValue(name, currentValue);
    };

    let value = validation.values[name];
    //transform price from cents
    if(value && typeof value === 'string') {
        value = ['price', 'int'].includes('type') ? parseInt(value): parseFloat(value);
    }
    if(value && type === 'price') {
        value = value / 100;
    }
    //special process to avoid ignore zero value
    if(value === null || value === undefined) {
        value = '';
    }

    // if param ignoreZeroValue is passed
    if(ignoreZeroValue && value === 0) {
        value = '';
    }

    if(forceNegative) {
        value = forceNumberToBeNegative(value);
    }

    return (
        <div className={margin ? 'mt-'+margin+' mb-'+margin+'': ''} onKeyDown={handleKeyDown} onPaste={handlePaste}>
            {
                children && (
                    <Label htmlFor={name} className="form-label">{children}</Label>
                )
            }
            <Input
                name={name}
                className={'form-control' + (className ? ' ' + className: '')}
                type="number"
                onChange={handleChange}
                onBlur={handleBlur}
                value={value}
                placeholder={props.placeholder ?? ""}
                {...props}
                invalid={
                    validation.touched[name] && validation.errors[name] ? true : false
                }
            />
            {
                validation.touched[name] && validation.errors[name] ? (
                    <FormFeedback type="invalid">{validation.errors[name]}</FormFeedback>
                ) : null
            }
        </div>
    )
}
