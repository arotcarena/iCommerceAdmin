type Props = {
    value: any,
    onChange: (value: any) => void,
    name: string,
    multiple?: boolean,
    placeholder?: string,
    [key: string]: any
};

export const CountryField = ({
    value,
    onChange,
    name,
    multiple = false,
    placeholder,
    ...props
}: Props) => {
    return (
        ''
        // <EntitySuggestField
        //     endpoint={API_COUNTRIES}
        //     labelProperty="name"
        //     multiple={multiple}
        //     name={name}
        //     value={value}
        //     onChange={onChange}
        //     defaultIsOpen={false}
        //     maxSuggestedItems={7}
        //     {...props}
        // />
    )
}
