import React, { PropsWithChildren, ReactNode } from "react"
import { FormFeedback, Label } from "reactstrap"


export type Props = PropsWithChildren<{
    name: string,
    validation: any,
    value?: string|number,
    onBlur?: (e: any) => void,
    onChange?: (e: any) => void,
    suggestList?: ReactNode,
    className?: string,
    [key: string]: any
}>

export const TextareaField = ({
    name,
    validation,
    value,
    onBlur,
    onChange,
    children,
    suggestList,
    className,
    ...props
}: Props) => {

    const handleBlur = (e: any) => {
        if(onBlur) {
            onBlur(e);
        }
        validation.handleBlur(e);
    };

    const handleChange = (e: any) => {
        if(onChange) {
            onChange(e);
        }
        validation.handleChange(e);
    }

    return (
        <div className={props.margin ? 'mt-'+props.margin+' mb-'+props.margin+'': ''}>
            {
                children && (
                    <Label htmlFor={name} className="form-label">{children}</Label>
                )
            }
            <textarea
                style={{minWidth: '200px'}}
                name={name}
                className={'form-control' + (className ? ' ' + className: '') + (validation.touched[name] && validation.errors[name] ? ' is-invalid' : '')}
                onChange={handleChange}
                onBlur={handleBlur}
                value={value || validation.values[name] || ""}
                placeholder={props.placeholder ?? ""}
                rows={props.rows || 5}
                {...props}
            >
            </textarea>
            {
                suggestList && suggestList
            }
            {
                validation.touched[name] && validation.errors[name] ? (
                    <FormFeedback type="invalid">{validation.errors[name]}</FormFeedback>
                ) : null
            }
        </div>
    )
}