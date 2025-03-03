import { FormData } from "type/formTypes";

export const setFormData = (validation: any, formData: FormData): void => {
    validation.resetForm();
    for(const [key, value] of Object.entries(formData)) {
        validation.setFieldValue(key, value);
    }
}
