import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import logo from "../../assets/images/custom/logo/main-logo.png";
import { useTranslation } from 'react-i18next';
import { AppConfig } from 'config/AppConfig';

export const ParticlesAuth = ({ children }: any) => {
    const {t} = useTranslation();

    return (
        <React.Fragment>
            <div className="auth-page-wrapper pt-5">
                <div className="auth-one-bg-position auth-one-bg" id="auth-particles">

                    <div className="bg-overlay"></div>

                    <div className="shape">
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 1440 120">
                            <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"></path>
                        </svg>
                    </div>
                </div>

                <div className="auth-page-content">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="text-center mb-4 text-white-50">
                                    <div className="auth-logo-wrapper">
                                        <div className="auth-logo">
                                            <div style={{margin: '30px'}}>
                                                <img src={logo} alt={t('logo')} height={50} />
                                                <div className="company-choice-item-title">
                                                    {AppConfig.COMPANY_NAME}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="mt-3 fs-15 fw-medium">{AppConfig.COMPANY_NAME} back-office</p>
                                </div>
                            </Col>
                        </Row>

                        {children}

                    </Container>
                </div>

                <footer className="footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="text-center">
                                    <p className="mb-0 text-muted">&copy; {new Date().getFullYear()} {AppConfig.COMPANY_NAME}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </React.Fragment>
    );
};
