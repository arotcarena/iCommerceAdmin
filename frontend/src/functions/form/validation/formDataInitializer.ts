export const initializeFormData = (
    validation: any,
    newValues: {[key: string]: any},
    removeTouched: boolean = false,
    forceRemoveTouched: boolean = false,// if this is true, will remove touched again after delay
    removeTouchedDelay: number = 300,//ms
) => {

    const mustDisplayValidation = removeTouched ? false: undefined;

    for(const [field, value] of Object.entries(newValues)) {
        validation.setFieldValue(field, value);
        validation.setFieldTouched(field, mustDisplayValidation, mustDisplayValidation);
    }

    if(forceRemoveTouched) {
        setTimeout(() => {
            for(const [field, value] of Object.entries(newValues)) {
                validation.setFieldTouched(field, false, false);
            }
        }, removeTouchedDelay);
    }
};
