import { TabPane } from "reactstrap";
import { Notification } from "type/entityTypes"
import SimpleBar from "simplebar-react";
import { NotificationItem } from "./NotificationItem";
import { EmptyNotificationsList } from "./EmptyNotificationsList";
import { useEffect, useState } from "react";
import { useLoadNotifications } from "functions/customHooks/api/queries/notificationQueries";
import { Loader } from "UI/Common/Loader";
import { useInView } from "react-intersection-observer";



type Props = {
    type?: string
};

export const NotificationsList = ({
    type
}: Props) => {
    const {ref, inView} = useInView({
        threshold: 0.2,
    });

    const [notifications, setNotifications] = useState<Notification[]>([]);
    const localToggleNotificationStatus = (id: number) => {
        setNotifications(prevNotifications => prevNotifications.map((notif: Notification) => {
            if(notif.id === id) {
                return {
                    ...notif,
                    status: notif.status === 'read' ? 'unread': 'read'
                };
            }
            return notif;
        }));
    }

    const [page, setPage] = useState<number>(1);

    const loadNotifications = useLoadNotifications(type)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isFullLoaded, setIsFullLoaded] = useState<boolean>(false); 

    //initial load
    useEffect(() => {
        loadNewPage();
    }, []);

    useEffect(() => {
        if(inView && !isLoading && !isFullLoaded) {
            loadNewPage();
        }
    }, [inView]);

    const loadNewPage = async () => {
        setIsLoading(true);
        try {
            const data = await loadNotifications(page);
            if(data.items.length > 0) {
                setNotifications(prevNotifications => [...prevNotifications, ...data.items]);
                setPage(prevPage => prevPage + 1);
            } else {
                setIsFullLoaded(true);
            }
        } catch(e) {
            //
        }
        setIsLoading(false);
    }

    return (
        <TabPane tabId={type ?? 'notification'} className="py-2 ps-2">
            {
                notifications.length < 1 ? (
                    isLoading ? (
                        <div className="m-4">
                            <Loader />
                        </div>
                    ): (
                        <EmptyNotificationsList />
                    )
                ): (
                    <SimpleBar style={{ maxHeight: "300px" }} className="pe-2">
                        {
                            notifications.map((notification, index) => (
                                <NotificationItem
                                    key={index}
                                    notification={notification}
                                    localToggleNotificationStatus={localToggleNotificationStatus}
                                />
                            ))
                        }
                        <div id="notifications-list-end" ref={ref} style={{minHeight: '1px'}}>
                            {
                                isLoading && <Loader />
                            }
                        </div>
                    </SimpleBar>
                )
            }
        </TabPane>
    )
}
