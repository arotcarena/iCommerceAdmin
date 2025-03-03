type Props = {
    validation: any,
    name: string,
    multiple?: boolean,
    [key: string]: any
};

export const CountryField = ({
    validation,
    name,
    multiple = false,
    ...props
}: Props) => {
    return (''
        // <EntitySuggestFieldWithFormik
        //     endpoint={API_COUNTRIES}
        //     labelProperty="name"
        //     multiple={multiple}
        //     name={name}
        //     validation={validation}
        //     defaultIsOpen={false}
        //     maxSuggestedItems={7}
        //     {...props}
        // />
    )
}
