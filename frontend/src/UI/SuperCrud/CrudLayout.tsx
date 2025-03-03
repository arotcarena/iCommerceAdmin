import { useSuperCrud } from "Components/Contexts/SuperCrudContext";
import { PropsWithChildren, ReactNode } from "react"
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, CardHeader, Col, Container, Row } from "reactstrap";

type Props = PropsWithChildren<{
    breadcrumb?: ReactNode,
    isIndexPage?: boolean,
    showCreateButton?: boolean,
    id?: number,
    isSubCrud?: boolean,
    customTitle?: ReactNode,
    customCreateLabel?: string,
}>;

export const CrudLayout = ({
    breadcrumb,
    isIndexPage = true,
    showCreateButton = true,
    id,
    isSubCrud = false,
    customTitle,
    customCreateLabel,
    children
}: Props) => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {basePath, title, disabled, renderAdditionalControl} = useSuperCrud();

    return (
        <Container fluid className="super-crud-layout">
            <Row>
                <Col>
                <Card className="position-relative">
                    <CardHeader 
                        className={'border-0' + (isIndexPage ? '': ' crud-' + (isSubCrud ? 'sub': '') + 'header-sticky' + (isSubCrud ? ' ms-3': ''))}
                    >
                    <div className="d-flex align-items-center w-100">
                        <h5 className="card-title mb-3 mb-md-0 flex-grow-1">
                            <Link to={basePath}>
                                {
                                    breadcrumb && (
                                        <>
                                            <i className="ri-arrow-left-line text-primary"></i>{' '}
                                        </>
                                    )
                                }
                                {
                                    customTitle ?? t(title)
                                }
                            </Link>
                            {breadcrumb}
                        </h5>
                        <div className="flex-shrink-0">
                        <div className="d-flex gap-1 flex-wrap">
                            {
                                isIndexPage && showCreateButton && !disabled && (
                                    <button
                                        type="button"
                                        className="btn btn-primary add-btn"
                                        id="create-btn"
                                        onClick={() => navigate(basePath + '/create')}
                                    >
                                        <i className="ri-add-line align-bottom me-1"></i>{" "}
                                        {customCreateLabel ?? t('create')}
                                    </button>
                                )
                            }
                            {
                                renderAdditionalControl && renderAdditionalControl(id)
                            }
                            {
                                isIndexPage && (
                                    <Button type="button" className="btn btn-success">
                                        <i className="ri-file-download-line align-bottom me-1"></i>{" "}
                                        {t('export')}
                                    </Button>
                                )
                            }
                        </div>
                        </div>
                    </div>
                    </CardHeader>

                    {
                        children
                    }

                </Card>
                </Col>
            </Row>
        </Container>
    )
}
