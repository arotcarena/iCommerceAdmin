import { t } from 'i18next';
import { TabColumn, ValidationConstraints } from 'type/superCrudTypes';
import * as Yup from 'yup';


export const needValidationSchema = (column: TabColumn): boolean => {
    const {type} = column;

    if(type === 'image') {
        return false;
    }
    if(column?.constraints || ['email', 'password', 'int', 'float', 'price', 'text'].includes(type)) {
        return true;
    }
    return false;
}


export const createFieldValidationSchema = (type: string, validationConstraints?: ValidationConstraints, multiple: boolean = false, endpoint?: string): any => {

    let schema: {
        [key: string]: any
    } = Yup;

    if(['text', 'textarea', 'html'].includes(type)) {
        schema = schema.string();
    } else if(['int', 'float', 'decimal', 'price'].includes(type)) {
        schema = schema.number().nullable();
        if(!validationConstraints || !Object.keys(validationConstraints).includes('required')) {
            schema = schema.nullable();
        }
    } else if(type === 'email') {
        schema = schema.string().email(t('assert.email'));
    } else if(type === 'password') {
        schema = schema.string()
                        .min(8, t('assert.minLength', {count: 8}))
                        .matches(RegExp('(.*[a-z].*)'), t('assert.atLeast.lowercase'))
                        .matches(RegExp('(.*[A-Z].*)'), t('assert.atLeast.uppercase'))
                        .matches(RegExp('(.*[0-9].*)'), t('assert.atLeast.number'))
                        .matches(RegExp('(.*[!@#$%^&*()_+\\-=\\[\\]{};:"\\\\|,.<>\\/?].*)'), t('assert.atLeast.specialCharacter'))
                        ;
    } else if(['relation', 'address'].includes(type)) {
        schema = schema.object();
    } else if(type === 'choice') {
        if(multiple) {
            schema = schema.array();
        } else {
            if(endpoint) {
                schema = schema.object();
            } else {
                schema = schema.string();
            }
        }
    } else {
        schema = schema.string();
    }
    
    if(!validationConstraints) {
        return schema;
    }

    for(const [constraintName, constraintValue] of Object.entries(validationConstraints)) {
        switch(constraintName) {
            case 'required':
                schema = schema.required(t('assert.required'));
                break;
            case 'min':
                const minTransKey = type === 'text' ? 'assert.minLength': 'assert.minNumber';
                schema = schema.min(constraintValue, t(minTransKey, {count: constraintValue}));
                break;
            case 'max':
                const maxTransKey = type === 'text' ? 'assert.maxLength': 'assert.maxNumber';
                schema = schema.max(constraintValue, t(maxTransKey, {count: constraintValue}));
                break;
            default:
                break;
        }
    }
    return schema;
}
