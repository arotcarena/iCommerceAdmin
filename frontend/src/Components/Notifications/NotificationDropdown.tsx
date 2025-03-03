import React, { useState } from 'react';
import { Dropdown, DropdownToggle } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { NotificationsMenu } from './NotificationsMenu';
import { useCountUnreadNotifications } from 'functions/customHooks/api/queries/notificationQueries';
import { AppConfig } from 'config/AppConfig';

export const NotificationDropdown = () => {
    const {t} = useTranslation();

    //Dropdown Toggle
    const [isNotificationDropdown, setIsNotificationDropdown] = useState<boolean>(false);
    const toggleNotificationDropdown = () => {
        setIsNotificationDropdown(!isNotificationDropdown);
    };

    //notifications query
    const countUnreadNotifications = useCountUnreadNotifications();
    const {data: unreadNotificationsCount} = useQuery({
        queryKey: ['count_unread_notifications'],
        queryFn: countUnreadNotifications,
        initialData: null,
        refetchInterval: AppConfig.NOTIFICATIONS_API_CALL_INTERVAL // this query is the only one that we want to refresh automatically (others are refreshed only when click on dropdown)
    });

    return (
        <React.Fragment>
            <Dropdown isOpen={isNotificationDropdown} toggle={toggleNotificationDropdown} className="topbar-head-dropdown ms-1 header-item">
                <DropdownToggle type="button" tag="button" className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle">
                    <i className='bx bx-bell fs-22'></i>
                    {
                        unreadNotificationsCount && unreadNotificationsCount > 0 ? (
                            <span className="position-absolute topbar-badge translate-middle badge rounded-pill bg-danger">
                                {unreadNotificationsCount}
                                <span className="visually-hidden">{t('unread_messages')}</span>
                            </span>
                        ): ''
                    }
                </DropdownToggle>
                <NotificationsMenu 
                    unreadNotificationsCount={unreadNotificationsCount}
                />
            </Dropdown>
        </React.Fragment>
    );
};
