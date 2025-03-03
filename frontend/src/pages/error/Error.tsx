import React, { MouseEvent } from 'react';
import { Col, Container, Row } from 'reactstrap';

// Import Images
import error500 from "../../assets/images/error500.png";
import { setHtmlTitle } from 'functions/dom/setHtmlTitle';
import { FallbackProps } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';
import { generateUrl } from 'functions/router/urlGenerator';
import { useTranslation } from 'react-i18next';


export const Error = ({error, resetErrorBoundary}: FallbackProps) => {
    const {t} = useTranslation();
    
    setHtmlTitle(t('internal_server_error'));

    const navigate = useNavigate();

    const handleClick = (e: MouseEvent) => {
        resetErrorBoundary();
        navigate(generateUrl('home'));
    }

    return (
        <React.Fragment>
            <div className="auth-page-wrapper py-5 d-flex justify-content-center align-items-center min-vh-90">
                <div className="auth-page-content overflow-hidden p-0">
                    <Container fluid={true}>
                        <Row className="justify-content-center">
                            <Col xl={4} className="text-center">
                                <div className="error-500 position-relative">
                                    <img style={{maxHeight: '300px'}} src={error500} alt="" className="img-fluid error-500-img error-img" />
                                    <h1 className="title text-primary">500</h1>
                                </div>
                                <div>
                                    <h4>{t('internal_server_error')}</h4>
                                    <p className="text-muted w-75 mx-auto">{t(error.message)}</p>
                                    <button type="button" onClick={handleClick} className="btn btn-primary"><i className="mdi mdi-home me-1"></i>{t('back_home')}</button>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </React.Fragment>
    );
};
