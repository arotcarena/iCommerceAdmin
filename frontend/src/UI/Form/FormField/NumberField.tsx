import { hasTooMuchDecimals } from "functions/numberHelpers/decimalsHelper"
import { forceNumberToBeNegative } from "functions/numberHelpers/forceNumber"
import React, { PropsWithChildren, ReactNode } from "react"
import { FormFeedback, Input, Label } from "reactstrap"
import { TabColumnType } from "type/superCrudTypes"


export type TextFieldProps = PropsWithChildren<{
    name: string,
    value: any,
    onChange: (value: any) => void,
    className?: string,
    margin?: number,
    type?: TabColumnType,
    maxDecimals?: number,
    forceNegative?: boolean,
    smallHeight?: boolean,
    [key: string]: any
}>

export const NumberField = ({
    name,
    value,
    onChange,
    children,
    className,
    margin,
    type = 'float',
    maxDecimals,
    forceNegative = false,
    smallHeight = false,
    ...props
}: TextFieldProps) => {

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
            onChange(parseInt(valueToString));
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
        onChange(currentValue);
    };

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
                value={value}
                placeholder={props.placeholder ?? ""}
                style={{height: smallHeight ? '32px': undefined}}
                {...props}
            />
        </div>
    )
}
