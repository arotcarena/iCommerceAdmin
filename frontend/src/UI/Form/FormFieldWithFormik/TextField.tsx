import React, { PropsWithChildren, ReactNode } from "react"
import { FormFeedback, Input, Label } from "reactstrap"
import { Link } from "react-router-dom";


export type TextFieldProps = PropsWithChildren<{
    name: string,
    validation: any,
    value?: string|number,
    onBlur?: (e: any) => void,
    onChange?: (e: any) => void,
    suggestList?: ReactNode,
    className?: string,
    margin?: number,
    isLink?: boolean,
    [key: string]: any
}>

export const TextField = ({
    name,
    validation,
    value,
    onBlur,
    onChange,
    children,
    suggestList,
    className,
    margin,
    isLink,
    ...props
}: TextFieldProps) => {

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
    };

    return (
        <div
            className={(margin ? 'mt-' + margin + ' mb-' + margin + '' : '') + (isLink ? ' position-relative': '')}
        >
            {
                children && (
                    <Label htmlFor={name} className="form-label">{children}</Label>
                )
            }
            {
                isLink && (value || validation.values[name]) &&
                <a
                    target="_blank"
                    href={value || validation.values[name]}
                    style={{
                        position: 'absolute',
                        left: '10px',
                        bottom: '0',
                        transform: 'translateY(-50%)'
                    }}    
                >
                    <i className={'ri ri-external-link-line ri-lg text-' + (props.disabled ? 'secondary': 'primary')}></i>
                </a>
            }
            <Input
                name={name}
                className={'form-control' + (className ? ' ' + className : '')}
                style={{
                    paddingLeft: isLink ? '35px': undefined
                }}
                type={props.type ?? 'text'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={value || validation.values[name] || ""}
                placeholder={props.placeholder ?? ""}
                {...props}
                invalid={
                    !!(validation.touched[name] && validation.errors[name])
                }
            />
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
