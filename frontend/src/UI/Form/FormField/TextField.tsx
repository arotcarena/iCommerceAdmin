import React, { PropsWithChildren, ReactNode } from "react"
import { FormFeedback, Input, Label } from "reactstrap"


export type TextFieldProps = PropsWithChildren<{
    name: string,
    value?: string|number,
    onBlur?: (e: any) => void,
    onChange?: (e: any) => void,
    suggestList?: ReactNode,
    className?: string,
    margin?: number,
    [key: string]: any
}>

export const TextField = ({
    name,
    value,
    onBlur,
    onChange,
    children,
    suggestList,
    className,
    margin,
    ...props
}: TextFieldProps) => {

    const handleBlur = (e: any) => {
        if(onBlur) {
            onBlur(e);
        }
    };

    const handleChange = (e: any) => {
        if(onChange) {
            onChange(e);
        }
    };

    return (
        <div className={margin ? 'mt-'+margin+' mb-'+margin+'': ''}>
            {
                children && (
                    <Label htmlFor={name} className="form-label">{children}</Label>
                )
            }
            <Input
                name={name}
                className={'form-control' + (className ? ' ' + className: '')}
                type={props.type ?? 'text'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={value || ""}
                placeholder={props.placeholder ?? ""}
                {...props}
            />
            {
                suggestList && suggestList
            }
        </div>
    )
}
