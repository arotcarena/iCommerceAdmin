import { PropsWithChildren } from "react"
import { Label } from "reactstrap"
import { SelectOption } from "type/formTypes"
import { SelectedItemDisabled } from "../WithSuggest/SelectedItem"
import { InputIconsDisabled } from "../WithSuggest/InputIcons"

type Props = PropsWithChildren<{
    multiple?: boolean,
    margin?: number,
    name: string,
    options: SelectOption[],
    value: any,
    [key: string]: any,
}>

export const SelectDisabled = ({
    multiple = false,
    name,
    margin,
    options,
    value,
    children,
    ...props
}: Props) => {


    if(multiple) {
        return (
            <div className={margin ? 'mt-'+margin+' mb-'+margin: ''}>
                {
                    children && <Label htmlFor={name}>{children}</Label>
                }
                <div className="form-group position-relative">
                    <div className="input-suggested disabled">
                        <div className="input-suggested-box-wrapper form-control d-flex align-items-center ps-0 pe-2">
                            <div className="input-selected-items">
                                {
                                    options.map((option, index) => (
                                        value.includes(option.value) && (
                                            <SelectedItemDisabled key={index}>
                                                {option.label}
                                            </SelectedItemDisabled>
                                        )
                                    ))
                                }
                            </div>
                            <InputIconsDisabled />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={margin ? 'mt-'+margin+' mb-'+margin: ''}>
                {
                    children && <Label htmlFor={name}>{children}</Label>
                }
                <div className="form-group position-relative">
                    <div className="input-suggested disabled">
                        <div className="input-suggested-box-wrapper form-control d-flex align-items-center ps-0 pe-2">
                            <div className="input-selected-items">
                                <input 
                                    className="invisible-input"
                                    disabled={true} 
                                    id={name}
                                    value={options.find(option => option.value === value)?.label || ''}
                                    {...props}
                                />
                            </div>
                            <InputIconsDisabled />
                        </div>
                    </div>
                </div>
            </div>
    )
}
