import React, { useMemo } from 'react';
import { Card, CardBody, Col, Row, Form } from 'reactstrap';
import { ParticlesAuth } from './ParticlesAuth';

//formik
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ButtonWithLoading } from 'UI/Button/ButtonWithLoading';
import { PasswordField } from 'UI/Form/FormFieldWithFormik/PasswordField';
import { PasswordRequirements } from 'UI/Info/PasswordRequirements';
import { PasswordRememberedLink } from 'UI/Link/PasswordRememberedLink';
import { usePostPassword } from 'functions/customHooks/api/queries/authQueries';
import { useMutation } from '@tanstack/react-query';
import { PasswordCreateData } from 'type/formTypes';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAlert } from 'Components/Contexts/AlertContext';
import { generateUrl } from 'functions/router/urlGenerator';

function PasswordReset() {
    const {t} = useTranslation();
    const history = useNavigate();
    const {createAlert} = useAlert();
    
    const [urlSearchParams] = useSearchParams();
    const token = urlSearchParams.get('token');
    if(!token) {
        throw new Error(t('error.invalidSecurityLink'));
    }

    const postPassword = usePostPassword();
    const {mutate, isPending} = useMutation({
        mutationFn: (formData: PasswordCreateData) => postPassword(formData, token),
        onSuccess: (response: any) => {
            createAlert('success', t(response?.message ?? 'success.passwordCreated'));
            history(generateUrl('profile'));
        },
        onError: (e: any) => {
            //invalid token
            if(e.status === 403) {
                createAlert('danger', t(e?.data?.message ?? 'error.invalidSecurityLink'));
                history(generateUrl('login'));
                return;
            }
            //invalid form
            if(e?.data?.errors?.violations) {
                for(const violation of e.data.errors.violations) {
                    validation.setFieldError(violation.propertyPath, t(violation.title));
                }
            }
        }
    });

    const validation = useFormik({
        initialValues: {
            newPassword: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
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
        onSubmit: (formData: PasswordCreateData) => {
            mutate(formData);
        }
    });

    return (
        <ParticlesAuth>
            <Row className="justify-content-center">
                <Col md={8} lg={6} xl={5}>
                    <Card className="mt-4">

                        <CardBody className="p-4">
                            <div className="text-center mt-2">
                                <h5 className="text-primary">{t('password_create')}</h5>
                            </div>

                            <div className="p-2">
                                <Form onSubmit={validation.handleSubmit} action="/auth-signin-basic">
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
                                        >
                                            {t('password_reset')}
                                        </ButtonWithLoading>
                                    </div>
                                </Form>
                            </div>
                        </CardBody>
                    </Card>
                    <div className="mt-4 text-center">
                        <PasswordRememberedLink />
                    </div>
                </Col>
            </Row>
        </ParticlesAuth>
    );
};

export default PasswordReset;
