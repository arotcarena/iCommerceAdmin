import { TextField } from "UI/Form/FormFieldWithFormik/TextField";
import { TextareaField } from "UI/Form/FormFieldWithFormik/TextareaField";
import { DatePickerField } from "UI/Form/FormFieldWithFormik/DatePickerField";
import { BoolField } from "UI/Form/FormFieldWithFormik/BoolField";
import { SelectMultiField } from "UI/Form/FormFieldWithFormik/SelectMultiField";
import { SelectField } from "UI/Form/FormFieldWithFormik/SelectField";
import { ImageUploadField } from "UI/Form/FormFieldWithFormik/Upload/ImageUploadField";
import { HtmlTextField } from "UI/Form/FormFieldWithFormik/HtmlTextField";
import { TabColumn } from "type/superCrudTypes";
import { PasswordField } from "UI/Form/FormFieldWithFormik/PasswordField";
import { useTranslation } from "react-i18next";
import { EntitySuggestFieldWithFormik } from "UI/Form/FormFieldWithFormik/EntitySuggestFieldWithFormik";
import { AddressField } from "UI/Form/FormFieldWithFormik/SubForm/AddressField";
import { NumberField } from "./FormFieldWithFormik/NumberField";
import { EntitySelectFieldWithFormik } from "./FormFieldWithFormik/EntitySelectFieldWithFormik";
import {Link} from "react-router-dom";

type Props = {
    column?: TabColumn,
    validation: any,
    disabled?: boolean,
    margin?: number,
    fullWidth?: boolean,
    onChange?: () => void,
    defaultFilters?: {[key: string]: any},
    [key: string]: any
};

export const DynamicFormField = ({
    column,
    validation,
    disabled = false,
    margin = 4,
    fullWidth = false,
    onChange,
    defaultFilters,
    ...props
}: Props) => {
    const {t} = useTranslation();

    if(!column || column.type === 'relation') {
        return '';
    }

    const {name, type} = column;

    return (
        <>
            <div style={{maxWidth: fullWidth ? 'none': '550px'}}>
                {
                    type === 'password' && (
                        <PasswordField
                            validation={validation}
                            name={name}
                            margin={margin}
                            disabled={disabled}
                            onBlur={onChange}
                            {...props}
                            >
                            {t(name)}
                        </PasswordField>
                    )
                }
                {
                    ['int', 'float', 'decimal', 'price'].includes(type) && (
                        <NumberField
                            validation={validation}
                            name={name}
                            type={type}
                            margin={margin}
                            disabled={disabled}
                            maxDecimals={column?.constraints?.maxDecimals}
                            onBlur={onChange}
                            {...props}
                            >
                            {t(name)}
                        </NumberField>
                    )
                }
                {
                    ['text', 'text_link', 'email'].includes(type) && (
                        <TextField
                            validation={validation}
                            name={name}
                            type="text"
                            isLink={type === 'text_link'}
                            margin={margin}
                            disabled={disabled}
                            onBlur={onChange}
                            {...props}
                            >
                            {t(name)}
                        </TextField>
                    )
                }

                {
                    (type === 'textarea') && (
                        <TextareaField
                            validation={validation}
                            name={name}
                            margin={margin}
                            disabled={disabled}
                            onBlur={onChange}
                            {...props}
                            >
                            {t(name)}
                        </TextareaField>
                    )
                }
                {
                    (type === 'date' || type === 'datetime') && (
                        <DatePickerField
                            validation={validation}
                            name={name}
                            margin={margin}
                            disabled={disabled}
                            enableTime={type === 'datetime'}
                            onChange={onChange}
                            {...props}
                        >
                            {t(name)}
                        </DatePickerField>
                    )
                }
                {
                    (type === 'bool') && (
                        <BoolField
                            validation={validation}
                            name={name}
                            margin={margin}
                            size="md"
                            disabled={disabled}
                            onChange={onChange}
                            {...props}
                        >
                            {t(name)}
                        </BoolField>
                    )
                }
                {
                    (type === 'choice' && column?.choices) && (
                        column?.multiple ? (
                            <SelectMultiField
                                name={name}
                                validation={validation}
                                choices={column.choices}
                                margin={margin}
                                disabled={disabled}
                                onChange={onChange}
                                defaultFilters={defaultFilters}
                                {...props}
                            >
                                {t(name)}
                            </SelectMultiField>
                        ): (
                            <SelectField
                                name={name}
                                validation={validation} 
                                choices={column.choices}
                                margin={margin}
                                disabled={disabled}
                                onChange={onChange}
                                defaultFilters={defaultFilters}
                                {...props}
                            >
                                {t(name)}
                            </SelectField>
                        )
                    )
                }
                {
                    (type === 'choice' && column?.endpoint && column?.labelProperty) && (
                        column?.showFullChoiceList ? (
                            <EntitySelectFieldWithFormik
                                multiple={column?.multiple}
                                endpoint={column.endpoint}
                                name={name}
                                validation={validation}
                                labelProperty={column.labelProperty}
                                complementLabelProperty={column.complementLabelProperty}
                                margin={margin}
                                disabled={disabled}
                                onSelect={onChange}
                                defaultFilters={defaultFilters}
                                {...props}
                            >
                                {t(name)}
                            </EntitySelectFieldWithFormik>
                        ): (
                            <EntitySuggestFieldWithFormik
                                multiple={column?.multiple}
                                endpoint={column.endpoint}
                                name={name}
                                validation={validation}
                                labelProperty={column.labelProperty}
                                complementLabelProperty={column.complementLabelProperty}
                                margin={margin}
                                disabled={disabled}
                                maxSuggestedItems={column?.maxSuggestedItems}
                                onSelect={onChange}
                                defaultFilters={defaultFilters}
                                {...props}
                            >
                                {t(name)}
                            </EntitySuggestFieldWithFormik>
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
                            name={name}
                            disabled={disabled}
                            margin={margin}
                            type={column?.entityAttachmentType}
                            onChange={onChange}
                            {...props}
                        >
                            {t(name)}
                        </ImageUploadField>
                    )
                }
                {
                    type === 'html' && (
                        <HtmlTextField
                            name={name}
                            validation={validation}
                            disabled={disabled}
                            margin={margin}
                            toolsConfig={column?.toolsConfig}
                            onBlur={onChange}
                            {...props}
                        >
                            {t(name)}
                        </HtmlTextField>
                    )
                }
                {
                    type === 'address' && (
                        <AddressField
                            name={name}
                            validation={validation}
                            disabled={disabled}
                            margin={margin}
                            onChange={onChange}
                            {...props}
                        >
                            {t(name)}
                        </AddressField>
                    )
                }
            </div>
        </>
    )
}
