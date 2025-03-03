import { t } from "i18next";
import { CustomFetchError } from "../customFetch/customFetch";
import { ConstraintViolationType } from "type/formTypes";

export const resolveConstraintsViolationMessage = (e: {data: {violations?: ConstraintViolationType[]}}, field: string): string => {
    let errorMessage = t('error.server');
    if(e instanceof CustomFetchError && e.status === 422 && e.data.violations.length > 0) {
        const violation = e.data.violations.find((violation: ConstraintViolationType) => violation.propertyPath === field);
        if(violation) {
            errorMessage = t(violation.message);
        } else {
            errorMessage = e.data.violations.map((violation: ConstraintViolationType) => (
                t(violation.propertyPath) + ' : ' + t(violation.message)
            )).join(' | ');
        }
    }
    return errorMessage;
}
