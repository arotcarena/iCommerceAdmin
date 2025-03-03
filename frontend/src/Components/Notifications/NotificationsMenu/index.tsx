import React, { useState } from 'react';
import { DropdownMenu, TabContent } from 'reactstrap';


//SimpleBar
import { NotificationsTabsNav } from "./NotificationsTabsNav";
import { NotificationsList } from './NotificationsTabs/NotificationsList';

type Props = {
    unreadNotificationsCount: number|null,
};

export const NotificationsMenu = ({
    unreadNotificationsCount,
}: Props) => {
    const [activeTab, setActiveTab] = useState<string>('notification');
    const toggleTab = (tab: string) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

    return (
        <DropdownMenu className="dropdown-menu-lg dropdown-menu-end p-0">
            <NotificationsTabsNav
                countUnread={unreadNotificationsCount ?? 0}
                activeTab={activeTab}
                toggleTab={toggleTab}
            />
            <TabContent activeTab={activeTab}>
                <NotificationsList key="notification" />
                <NotificationsList key="message" type="message" />
                <NotificationsList key="alert" type="alert" />
            </TabContent>
        </DropdownMenu>
    )
}
