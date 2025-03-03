import React from 'react';
import { Card, CardBody, Col, Row, Form } from 'reactstrap';

//formik
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ButtonWithLoading } from 'UI/Button/ButtonWithLoading';
import { PasswordField } from 'UI/Form/FormFieldWithFormik/PasswordField';
import { PasswordRequirements } from 'UI/Info/PasswordRequirements';
import { useUpdatePassword } from 'functions/customHooks/api/queries/authQueries';
import { useMutation } from '@tanstack/react-query';
import { PasswordChangeData } from 'type/formTypes';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'Components/Contexts/AlertContext';
import { generateUrl } from 'functions/router/urlGenerator';
import { BreadCrumb } from 'UI/Common/BreadCrumb';
import { CustomFetchError } from 'functions/api/customFetch/customFetch';

function PasswordChange() {
    const {t} = useTranslation();
    const history = useNavigate();
    const {createAlert} = useAlert();

    const updatePassword = useUpdatePassword();
    const {mutate, isPending} = useMutation({
        mutationFn: (formData: PasswordChangeData) => updatePassword(formData),
        onSuccess: (response: any) => {
            createAlert('success', t(response?.message ?? 'success.passwordUpdated'));
            history(generateUrl('profile'));
        },
        onError: (e: any) => {
            if(e instanceof CustomFetchError && e?.data?.errors?.violations) {
                for(const violation of e.data.errors.violations) {
                    validation.setFieldError(violation.propertyPath, t(violation.title));
                }
            }
        }
    });

    const validation = useFormik({
        initialValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            oldPassword: Yup.string()
                .required(t('assert.required')),
            newPassword: Yup.string()
                .min(8, t('assert.min', {count: 8}))
                .matches(RegExp('(.*[a-z].*)'), t('assert.atLeast.lowercase'))
                .matches(RegExp('(.*[A-Z].*)'), t('assert.atLeast.uppercase'))
                .matches(RegExp('(.*[0-9].*)'), t('assert.atLeast.number'))
                .required(t('assert.required')),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('newPassword'), ""], t('assert.match_password'))
                .required(t('assert.required'))
        }),
        onSubmit: (formData: PasswordChangeData) => {
            mutate(formData);
        }
    });

    return (
        <div>
            <BreadCrumb title="change_password" breadcrumbItems={[
                    {label: 'profile', route: 'profile'}
                ]} 
            />
            <Row className="justify-content-center">
                <Col md={8} lg={6} xl={5}>
                    <Card className="mt-4">

                        <CardBody className="p-4">
                            <div className="text-center mt-2">
                                <h5 className="text-primary">{t('change_password')}</h5>
                                <p className="text-muted">{t('info.new_password_must_be_different')}</p>
                            </div>

                            <div className="p-2">
                                <Form onSubmit={validation.handleSubmit}>

                                    <div className="mb-3">
                                        <PasswordField
                                            name="oldPassword"
                                            validation={validation}
                                            placeholder={t('old_password')}
                                        >
                                            {t('old_password')}
                                        </PasswordField>
                                    </div>

                                    <div className="mb-3">
                                        <PasswordField
                                            name="newPassword"
                                            validation={validation}
                                            placeholder={t('enter_password')}
                                            info={t('info.at_least_characters', {count: 8})}
                                        >
                                            {t('password')}
                                        </PasswordField>
                                    </div>

                                    <div className="mb-3">
                                        <PasswordField
                                            name="confirmPassword"
                                            validation={validation}
                                            placeholder={t('confirm_password')}
                                        >
                                            {t('confirm_password')}
                                        </PasswordField>
                                    </div>

                                    {
                                        !validation.isValid && <PasswordRequirements />
                                    }

                                    <div className="mt-4">
                                        <ButtonWithLoading
                                            color="success"
                                            isLoading={isPending}
                                            large={true}
                                            data-testid="submit_button"
                                        >
                                            {t('change_password')}
                                        </ButtonWithLoading>
                                    </div>
                                </Form>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default PasswordChange;
