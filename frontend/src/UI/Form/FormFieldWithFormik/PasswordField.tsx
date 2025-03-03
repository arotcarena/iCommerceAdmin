import { TextField, TextFieldProps } from "./TextField"
import { useToggleState } from "functions/customHooks/state/useToggleState"
import { Label } from "reactstrap";

export const PasswordField = ({
    name,
    validation,
    children,
    margin,
    ...props
}: TextFieldProps) => {

    const [isPasswordShow, togglePasswordShow] = useToggleState(false);

    return (
        <div className={margin ? 'mt-'+margin+' mb-'+margin+'': ''}>
            {
                children && <Label htmlFor={name} className="form-label">{children}</Label>
            }
            <div className="position-relative auth-pass-inputgroup mb-3">
                <TextField
                    name={name}
                    className="form-control pe-5"
                    validation={validation}
                    type={isPasswordShow ? 'text': 'password'}
                    {...props}
                />
                <button 
                    className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted btn-password-show" 
                    onClick={togglePasswordShow} 
                    type="button" 
                    id={name + '-addon'}
                    >
                    {
                        isPasswordShow ? (
                            <i className="ri-eye-off-fill align-middle"></i>
                        ): (
                            <i className="ri-eye-fill align-middle"></i>
                        )
                    }
                </button>
            </div>
            {
                props.info && (
                    <div id={name + '-input'} className="form-text">{props.info}</div>
                )
            }
        </div>
    )
}
