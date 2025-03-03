import { generateUrl } from 'functions/router/urlGenerator';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import { BreadcrumbItem } from 'type/mainTypes';

type Props = {
    title: string,
    breadcrumbItems?: BreadcrumbItem[]
    hasHomeItem?: boolean
}

export const BreadCrumb = ({ title, breadcrumbItems = [], hasHomeItem = true }: Props) => {

    const {t} = useTranslation();

    return (
        <React.Fragment>
            <Row className="ms-0 me-0">
                <Col xs={12}>
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between" style={{flexDirection: 'row-reverse'}}>
                        <h4 className="mb-sm-0">{t(title)}</h4>

                        <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                {
                                    (t(title) !== t('dashboard')) && hasHomeItem && (
                                        <li className="breadcrumb-item">
                                            <Link to={generateUrl('home')}>{t('dashboard')}</Link>
                                        </li>
                                    )
                                }
                                {
                                    breadcrumbItems.map((breadcrumbItem, index) => (
                                        <BreadcrumbItemCard key={index} breadcrumbItem={breadcrumbItem} />
                                    ))
                                }
                                {
                                    t(title) !== t('dashboard') && (
                                        <li className="breadcrumb-item active">{t(title)}</li>
                                    )
                                }
                            </ol>
                        </div>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
};


const BreadcrumbItemCard = ({breadcrumbItem}: {breadcrumbItem: BreadcrumbItem}) => {
    const {t} = useTranslation();

    let url: string|null = null;
    if(breadcrumbItem.link) {
        url = breadcrumbItem.link;
    } else if(breadcrumbItem.route) {
        url = generateUrl(breadcrumbItem.route);
    }

    return (
        <li className="breadcrumb-item">
            {
                url ? (
                    <Link to={url}>{t(breadcrumbItem.label)}</Link>
                ): (
                    t(breadcrumbItem.label)
                )
            }
        </li>
    )
}