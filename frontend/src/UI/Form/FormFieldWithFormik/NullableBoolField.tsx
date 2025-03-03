import { PropsWithChildren } from "react";
import { BoolField } from "./BoolField"
import { t } from "i18next";

type Props = PropsWithChildren<{
    name: string,
    validation: any,
    size?: 'md' | 'lg',
    margin?: number,
}>;

export const NullableBoolField = ({
    name,
    validation,
    size,
    margin,
    children,
}: Props) => {
    const handleSetTrue = () => {
        validation.setFieldValue(name, true);
    };
    const handleSetDefault = () => {
        validation.setFieldValue(name, null);
    }

    if(validation.values[name] === null) {
        return (
            <div
                onClick={handleSetTrue}
                className={'position-relative d-flex' + (margin ? ' mt-'+margin+' mb-'+margin: '')}
            >
                <div
                    className="me-2 bg-light rounded-pill d-flex justify-content-center align-items-center"
                    style={{width: '42px', height: '22px', cursor: 'pointer'}}
                >
                    <div className="rounded-circle bg-white" style={{width: '16px', height: '16px'}}></div>
                </div>
                <div>
                    {children}
                </div>
                <div
                    className="position-absolute text-muted"
                    style={{top: '50%', right: 0, transform: 'translateY(-50%)', fontSize: '.8em'}}    
                >
                    {t('default_value')}
                </div>
            </div>
        )
    }

    const value = validation.values[name];

    return (
        <div className="position-relative" style={{paddingRight: '120px'}}>
            <BoolField
                name={name}
                validation={validation}
                size={size}
                margin={margin}
            >
                {children}
            </BoolField>
            <div className="position-absolute d-flex align-items-center" style={{top: '50%', right: 0, transform: 'translateY(-50%)'}}>
                <div className={'text-uppercase fw-bold text-' + (value ? 'primary': 'dark')}>
                    {
                        t(value ? 'yes': 'no')
                    }
                </div>
                <button
                    className="btn btn-light text-muted ms-3"
                    onClick={handleSetDefault}
                >
                    <i className="ri-eraser-line"></i>
                </button>
            </div>
        </div>
    )
}
