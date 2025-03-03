import { Link } from "react-router-dom"
import { Col, Container, Row } from "reactstrap"
import { ParticlesAuth } from "../Authentication/ParticlesAuth";

// Import Images
import error from "../../assets/images/error.svg";
import { useTranslation } from "react-i18next";
import { generateUrl } from "functions/router/urlGenerator";

export const Error403 = () => {
    const {t} = useTranslation();

    return (
        <div className="auth-page-wrapper">
            <ParticlesAuth>
                <div className="auth-page-content">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="text-center pt-4">
                                    <div className="">
                                        <img style={{maxHeight: '300px'}} src={error} alt="" className="error-basic-img move-animation" />
                                    </div>
                                    <div className="mt-n4">
                                        <h1 className="display-1 fw-medium">403</h1>
                                        <h3 className="text-uppercase">{t('error.forbidden')} 😭</h3>
                                        <p className="text-muted mb-4">{t('error.access_restricted')}</p>
                                        <Link to={generateUrl('home')} className="btn btn-primary"><i className="mdi mdi-home me-1"></i>{t('back_to_home')}</Link>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </ParticlesAuth>
        </div>
    )
}
