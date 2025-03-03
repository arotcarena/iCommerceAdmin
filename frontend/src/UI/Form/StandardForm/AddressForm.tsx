import { useFormik } from "formik";
import * as Yup from 'yup';
import { PropsWithChildren, ReactNode } from "react";
import { AddressType } from "type/formTypes";
import { TextField } from "../FormFieldWithFormik/TextField";
import { useTranslation } from "react-i18next";
import { CountryField } from "../FormFieldWithFormik/CountryField";
import { Col, Row } from "reactstrap";
import { useGetSuggestedAddresses } from "functions/customHooks/form/useGetSuggestedAddresses";
import { SuggestedAddressesSelector } from "./SuggestedAddressesSelector";


const defaultAddress = {
    name: '',
    firstLine: '',
    secondLine: '',
    thirdLine: '',
    zip: '',
    city: '',
    country: '',
    phoneNumber: '',
    mobileNumber: ''
};

type Props = PropsWithChildren<{
    address?: AddressType
    onSubmit: (formData: object) => void,
    margin?: number,
    button?: ReactNode,
    suggestedAddressesFilters?: {[key: string]: any}
}>;

export const AddressForm = ({
    address,
    onSubmit,
    margin = 4,
    children,
    button,
    suggestedAddressesFilters,
}: Props) => {
    const {t} = useTranslation();

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: address || defaultAddress,
        validationSchema: Yup.object({
            name: Yup.string().required(t('assert.required')),
            firstLine: Yup.string().required(t('assert.required')),
            secondLine: Yup.string().nullable(),
            thirdLine: Yup.string().nullable(),
            zip: Yup.string().required(t('assert.required')),
            city: Yup.string().required(t('assert.required')),
            country: Yup.object().required(t('assert.required')),
            phoneNumber: Yup.string(),
            mobileNumber: Yup.string()
        }),
        onSubmit: async (formData: any) => {
            //remove @id and @type to specify to apiRequest that this must stay an object, 
            //and must not be converted into a simple iri.
            const preparedFormData = {
                id: formData.id,
                name: formData.name,
                firstLine: formData.firstLine,
                secondLine: formData.secondLine,
                thirdLine: formData.thirdLine,
                zip: formData.zip,
                city: formData.city,
                country: formData.country,
                phoneNumber: formData.phoneNumber,
                mobileNumber: formData.mobileNumber,
                type: formData?.type,
                isDefault: formData?.isDefault
            };
            onSubmit(preparedFormData);
        }
    });

    // suggested addresses
    const {suggestedAddresses} = useGetSuggestedAddresses(suggestedAddressesFilters);

    return (
        <form style={{margin: '40px'}} onSubmit={validation.handleSubmit}>

            {children}

            {
                suggestedAddresses && suggestedAddresses.length > 0 && (
                    <div className="mt-5">
                        <SuggestedAddressesSelector
                            suggestedAddresses={suggestedAddresses}
                            validation={validation}
                        />
                        <div className="separator my-4"></div>
                    </div>
                )
            }

            <TextField
                validation={validation}
                name="name"
                margin={margin}
            >
                {t('name')} *
            </TextField>

            <label className="form-label">{t('address')}</label>
            <TextField
                validation={validation}
                name="firstLine"
                margin={0}
                placeholder={t('address_label.firstLine') + ' *'}
            />

            <TextField
                validation={validation}
                name="secondLine"
                margin={margin}
                placeholder={t('address_label.secondLine')}
            />

            <TextField
                validation={validation}
                name="thirdLine"
                margin={margin}
                placeholder={t('address_label.thirdLine')}
            />

            <Row>
                <Col className="col-12 col-md-6 col-xl-2">
                    <TextField
                        validation={validation}
                        name="zip"
                        margin={margin}
                    >
                        <span style={{whiteSpace: 'nowrap'}}>
                            {t('address_label.zip')} *
                        </span>
                    </TextField>
                </Col>
                <Col className="col-12 col-lg-6">
                    <TextField
                        validation={validation}
                        name="city"
                        margin={margin}
                    >
                        {t('address_label.city')} *
                    </TextField>
                </Col>
                <Col className="col-12 col-lg-4">
                    <CountryField
                        validation={validation}
                        name="country"
                        margin={margin}
                    >
                        {t('address_label.country')} *
                    </CountryField>
                </Col>
            </Row>
        
            <Row>
                <Col className="col-12 col-lg-6">
                    <TextField
                        validation={validation}
                        name="phoneNumber"
                        margin={margin}
                    >
                        <i className="ri ri-phone-line"></i>{' '}
                        {t('address_label.phoneNumber')}
                    </TextField>
                </Col>
                <Col className="col-12 col-lg-6">
                    <TextField
                        validation={validation}
                        name="mobileNumber"
                        margin={margin}
                    >
                        <i className="ri ri-smartphone-line"></i>{' '}
                        {t('address_label.mobileNumber')}
                    </TextField>
                </Col>
            </Row>

            {
                button || (
                    <button className={'btn btn-success' + (margin ? (' mt-' + margin + ' mb-' + margin): '')} type="submit">
                        {t('submit')}
                    </button>
                )
            }
        </form>
    )
}