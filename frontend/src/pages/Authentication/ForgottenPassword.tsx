import React from 'react';
import { Alert, Card, CardBody, Col, Row, Form } from 'reactstrap';
import { ParticlesAuth } from './ParticlesAuth';

//formik
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ButtonWithLoading } from 'UI/Button/ButtonWithLoading';
import { TextField } from 'UI/Form/FormFieldWithFormik/TextField';
import { PasswordRememberedLink } from 'UI/Link/PasswordRememberedLink';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'Components/Contexts/AlertContext';
import { useTranslation } from 'react-i18next';
import { generateUrl } from 'functions/router/urlGenerator';
import { useForgottenPasswordRequest } from 'functions/customHooks/api/queries/authQueries';

function ForgottenPassword() {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {createAlert} = useAlert();
    
    const forgottenPasswordRequest = useForgottenPasswordRequest();
    const {mutate, isPending} = useMutation({
        mutationFn: (formData: {email: string}) => forgottenPasswordRequest(formData.email),
        onSuccess: (response: any) => {
            let message = t('success.reset_password_link_sent');
            if(response?.hours_before_expire) {
                message += ' ' + t('info.link_expire_at', {hours: response.hours_before_expire});
            }
            createAlert('success', message);
            navigate(generateUrl('login'));
        },
    });

    const validation = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().required(t('assert.required'))
                .email(t('assert.email')),
        }),
        onSubmit: (formData: {email: string}) => {
            mutate(formData)
        }
    });

    return (
        <ParticlesAuth>
            <Row className="justify-content-center">
                <Col md={8} lg={6} xl={5}>
                    <Card className="mt-4">
                        <CardBody className="p-4">
                            <div className="text-center mt-2">
                                <h5 className="text-primary">{t('question.forgot_password')}</h5>
                                <p className="text-muted">{t('password_reset')}</p>

                                <i className="ri-mail-send-line display-5 text-success"></i>
                            </div>

                            <Alert className="border-0 alert-warning text-center mb-2 mx-2" role="alert">
                                {t('info.enter_email_to_receive_instructions')}
                            </Alert>
                            <div className="p-2">
                                <Form onSubmit={validation.handleSubmit}>
                                    <div className="mb-4">
                                        <TextField
                                            name="email"
                                            type="email"
                                            placeholder={t('enter_email')}
                                            validation={validation}
                                        >   
                                            {t('email')}
                                        </TextField>
                                    </div>

                                    <div className="text-center mt-4">
                                        <ButtonWithLoading
                                            color="success"
                                            isLoading={isPending}
                                            large={true}
                                        >
                                            {t('send_reset_link')}
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

export default ForgottenPassword;
