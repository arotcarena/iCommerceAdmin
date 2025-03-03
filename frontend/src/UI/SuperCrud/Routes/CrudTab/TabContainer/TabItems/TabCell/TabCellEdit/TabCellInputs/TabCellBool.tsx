import { Input } from "reactstrap";

type Props = {
    validation: any,
    onSubmit: () => void,
    closeEdit: () => void,
}

export const TabCellBool = ({
    validation,
    onSubmit,
    closeEdit
}: Props) => {
    
    const handleChange = (e: any) => {
        validation.setFieldValue('value', e.target.checked);
    }

    const handleBlur = async () => {
        await onSubmit();
        closeEdit();
    }

    const handleKeyDown = (e: any): void => {
        if(e.key === 'Enter') {
            onSubmit();
        }
    };

    return (
        <div className="form-check form-switch mb-2 m-1">
            <Input
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                defaultChecked={validation.values.value ? true: false} 
                onChange={handleChange} 
                autoFocus={true} 
                type="checkbox" 
                role="switch" id="flexSwitchCheckDefault"
                className="form-check-input form-switch-md"
                invalid={
                    validation.touched.value && validation.errors.value ? true : false
                }
            />
            {
                validation.errors.value && <div className="invalid-feedback">{validation.errors.value}</div>
            }
        </div>
    )
}

