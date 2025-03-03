import { Col, Nav, NavItem, NavLink, Row } from 'reactstrap';
import classNames from "classnames";
import { useTranslation } from "react-i18next";

type Props = {
    activeTab: string,
    toggleTab: (tab: string) => void,
    countUnread: number
};

export const NotificationsTabsNav = ({
    activeTab,
    toggleTab,
    countUnread
}: Props) => {
    const {t} = useTranslation();

    return (
        <div className="dropdown-head bg-primary bg-pattern rounded-top">
            <div className="p-3">
                <Row className="align-items-center">
                    <Col>
                        <h6 className="m-0 fs-16 fw-semibold text-white">{t('notifications')}</h6>
                    </Col>
                    {
                        countUnread > 0 && (
                            <div className="col-auto dropdown-tabs">
                                <span className="badge bg-light-subtle text-body fs-13">{t('unread_notifications', {count: countUnread})}</span>
                            </div>
                        )
                    }
                </Row>
            </div>

            <div className="px-2 pt-2">
                <Nav className="nav-tabs dropdown-tabs nav-tabs-custom">
                    <NavItem>
                        <NavLink
                            href="#"
                            className={classNames({ active: activeTab === 'notification' })}
                            onClick={() => { toggleTab('notification'); }}
                        >
                            {t('all')} ({countUnread})
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            href="#"
                            className={classNames({ active: activeTab === 'message' })}
                            onClick={() => { toggleTab('message'); }}
                        >
                            {t('messages')}
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            href="#"
                            className={classNames({ active: activeTab === 'alert' })}
                            onClick={() => { toggleTab('alert'); }}
                        >
                            {t('alerts')}
                        </NavLink>
                    </NavItem>
                </Nav>
            </div>

        </div>
    )
}
