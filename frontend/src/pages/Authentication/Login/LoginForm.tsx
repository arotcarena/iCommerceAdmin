import React from "react";
import { ParticlesAuth } from "../ParticlesAuth";
import { Alert, Card, CardBody, Col, Form, Row } from "reactstrap";
import { TextField } from "UI/Form/FormFieldWithFormik/TextField";
import { PasswordField } from "UI/Form/FormFieldWithFormik/PasswordField";
import { Link } from "react-router-dom";
import { generateUrl } from "functions/router/urlGenerator";
import { ButtonWithLoading } from "UI/Button/ButtonWithLoading";
import * as Yup from 'yup';
import { LoginData } from "type/formTypes";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";

type Props = {
    onSubmit: (formData: LoginData) => void,
    isLoading: boolean,
    errorMessage: string|null
}

export const LoginForm = ({
    onSubmit,
    isLoading,
    errorMessage
}: Props) => {
    const {t} = useTranslation();

    const validation: any = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().required(t('assert.required')),
            password: Yup.string().required(t('assert.required')),
        }),
        onSubmit
    });

    return (
        <React.Fragment>
            <ParticlesAuth>
                <Row className="justify-content-center">
                    <Col md={8} lg={6} xl={5}>
                        <Card className="mt-4">
                            <CardBody className="p-4">
                                <div className="text-center mt-2">
                                    <h5 className="text-primary">{t('welcome_back')}</h5>
                                    <p className="text-muted">{t('login_to_continue')}</p>
                                </div>
                                {
                                    errorMessage && (
                                        <Alert color="danger" className="ms-2 me-2">{t(errorMessage)}</Alert>
                                    )
                                }
                                <div className="p-2 mt-4">
                                    <Form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            validation.handleSubmit();
                                            return false;
                                        }}
                                    >
                                        <div className="mb-3">
                                            <TextField
                                                name="email"
                                                validation={validation}
                                                placeholder={t('enter_email')}
                                                type="email"
                                            >
                                                {t('email')}
                                            </TextField>
                                        </div>

                                        <div className="mb-3">
                                            <div className="float-end">
                                                <Link to={generateUrl('forgotten_password')} className="text-muted">{t('forgot_password')}</Link>
                                            </div>
                                            <PasswordField
                                                name="password"
                                                validation={validation}
                                                placeholder={t('enter_password')}
                                            >
                                                {t('password')}
                                            </PasswordField>
                                        </div>

                                        <div className="mt-4">
                                            <ButtonWithLoading
                                                isLoading={isLoading}
                                                color="success"
                                                large={true}
                                            >
                                                {t('login')}
                                            </ButtonWithLoading>
                                        </div>
                                    </Form>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </ParticlesAuth>
        </React.Fragment>
    );
}
