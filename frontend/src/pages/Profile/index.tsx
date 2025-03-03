import {
  Container,
  Card,
  CardBody,
  Spinner,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

import { setHtmlTitle } from "functions/dom/setHtmlTitle";
import { useTranslation } from "react-i18next";
import { useGetUser } from "functions/customHooks/useGetUser";
import { ProfileEdit } from "./ProfileEdit";
import { Link } from "react-router-dom";
import { generateUrl } from "functions/router/urlGenerator";
import { UserCard } from "./UserCard";
import { BreadCrumb } from "UI/Common/BreadCrumb";

function Profile() {
    const {t} = useTranslation();
    setHtmlTitle(t('profile'));

    const {user, isLoading} = useGetUser();

    return (
        <>
            <BreadCrumb title="profile" />
            <Container fluid>
                {
                    isLoading && <Spinner className="m-4" style={{opacity: '.5'}} />
                }
                {
                    !isLoading && !user && (
                        <div className="alert alert-danger m-4">{t('error.loading_data')}</div>
                    )
                }
                {
                    user && (
                        <>
                            <Row className="d-flex align-items-stretch">
                                <Col className="col-12 col-xl-6">
                                    <UserCard user={user} />
                                </Col>
                                <Col>
                                    <Card>
                                        <CardBody>
                                            <CardTitle className="mb-4 h5">
                                                <i className="mdi mdi-security me-1"></i>
                                                <span>{t('security')}</span>
                                            </CardTitle>
                                            <Link to={generateUrl('change_password')} className="btn btn-outline-secondary">
                                                <i className="mdi mdi-account-lock-open"></i>{' '}
                                                {t('change_password')}
                                            </Link>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                            <ProfileEdit user={user} />
                        </>
                    )
                }
            </Container>
        </>
    );
};


export default Profile;