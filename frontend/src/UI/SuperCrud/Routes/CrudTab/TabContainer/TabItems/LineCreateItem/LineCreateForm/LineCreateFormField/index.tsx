import { TabColumn } from "type/superCrudTypes";
import { TextField } from "UI/Form/FormFieldWithFormik/TextField";
import { PasswordField } from "UI/Form/FormFieldWithFormik/PasswordField";
import { TextareaField } from "UI/Form/FormFieldWithFormik/TextareaField";
import { DatePickerField } from "UI/Form/FormFieldWithFormik/DatePickerField";
import { BoolField } from "UI/Form/FormFieldWithFormik/BoolField";
import { SelectMultiField } from "UI/Form/FormFieldWithFormik/SelectMultiField";
import { SelectField } from "UI/Form/FormFieldWithFormik/SelectField";
import { ImageUploadField } from "UI/Form/FormFieldWithFormik/Upload/ImageUploadField";
import { HtmlTextField } from "UI/Form/FormFieldWithFormik/HtmlTextField";
import { EntitySuggestFieldWithFormik } from "UI/Form/FormFieldWithFormik/EntitySuggestFieldWithFormik";
import { AddressField } from "UI/Form/FormFieldWithFormik/SubForm/AddressField";
import { NumberField } from "UI/Form/FormFieldWithFormik/NumberField";
import { EntitySelectFieldWithFormik } from "UI/Form/FormFieldWithFormik/EntitySelectFieldWithFormik";
import { useSuperCrud } from "Components/Contexts/SuperCrudContext";
import { resolveChoiceFieldsDefaultFilters } from "functions/crud/choiceFieldsDefaultFiltersResolver";

type Props = {
    validation: any,
    column: TabColumn,
    field: string,
};

export const LineCreateFormField = ({
    validation,
    column,
    field,
}: Props) => {

    const {type} = column;

    const {choiceFieldsDefaultFiltersRenderer} = useSuperCrud();
    const defaultFilters = resolveChoiceFieldsDefaultFilters(undefined, choiceFieldsDefaultFiltersRenderer, column);

    return (
        <td className={'type-' + type} style={{minWidth: '130px'}}>
            {
                type === 'password' && (
                    <PasswordField
                        name={field}
                        validation={validation}
                        margin={3}
                    />
                )
            }
            {
                (['int', 'float', 'decimal', 'price']).includes(type) && (
                    <NumberField
                        name={field}
                        validation={validation}
                        type={type}
                        maxDecimals={column?.constraints?.maxDecimals}
                    />
                )
            }
            {
                (['text', 'email'].includes(type)) && (
                    <TextField
                        name={field}
                        validation={validation}
                        type="text"
                    />
                )
            }
            {
                (type === 'textarea') && (
                    <TextareaField
                        name={field}
                        validation={validation}
                    />
                )
            }
            {
                (type === 'date' || type === 'datetime') && (
                    <DatePickerField
                        validation={validation}
                        name="value"
                        autoFocus={true}
                        enableTime={column.type === 'datetime'}
                    />
                )
            }
            {
                (type === 'bool') && (
                    <div className="m-1">
                        <BoolField
                            name={field}
                            validation={validation}
                            size="md"
                        />
                    </div>
                )
            }
            {
                (type === 'choice' && column?.choices) && (
                    column?.multiple ? (
                        <SelectMultiField
                            name={field}
                            validation={validation}
                            choices={column.choices}
                            defaultFilters={defaultFilters}
                        />
                    ): (
                        <SelectField
                            name={field}
                            validation={validation}
                            choices={column.choices}
                            defaultFilters={defaultFilters}
                        />
                    )
                )
            }
            {
                (type === 'choice' && column?.endpoint && column?.labelProperty) && (
                    column?.showFullChoiceList ? (
                        <EntitySelectFieldWithFormik
                            multiple={column?.multiple}
                            endpoint={column.endpoint}
                            name={field}
                            validation={validation}
                            labelProperty={column.labelProperty}
                            complementLabelProperty={column?.complementLabelProperty}
                            defaultIsOpen={false}
                            maxSuggestedItems={column?.maxSuggestedItems}
                            defaultFilters={defaultFilters}
                        />
                    ): (
                        <EntitySuggestFieldWithFormik
                            multiple={column?.multiple}
                            endpoint={column.endpoint}
                            name={field}
                            validation={validation}
                            labelProperty={column.labelProperty}
                            complementLabelProperty={column?.complementLabelProperty}
                            defaultIsOpen={false}
                            maxSuggestedItems={column?.maxSuggestedItems}
                            defaultFilters={defaultFilters}
                        />
                    )
                )
            }
            {
                type === 'image' && (
                    <ImageUploadField
                        multiple={column?.multiple}
                        acceptedFormats={column?.constraints?.acceptedFormats}
                        minSize={column?.constraints?.minSize}
                        maxSize={column?.constraints?.maxSize}
                        maxCount={column?.constraints?.maxCount}
                        required={column?.constraints?.required}
                        validation={validation}
                        name={field}
                        small={true}
                        type={column?.entityAttachmentType}
                    />
                )
            }
            {
                type === 'html' && (
                    <HtmlTextField
                        validation={validation}
                        name={field}
                        toolsConfig={column?.toolsConfig}
                    />
                )
            }
            {
                type === 'address' && (
                    <div style={{position: 'relative', top: '-3px', display: 'flex', justifyContent: 'center'}}>
                        <AddressField 
                            validation={validation}
                            name={field}
                            hasInputLabel={false}
                        >
                            {field}
                        </AddressField>
                    </div>
                )
            }
        </td>
    )
}