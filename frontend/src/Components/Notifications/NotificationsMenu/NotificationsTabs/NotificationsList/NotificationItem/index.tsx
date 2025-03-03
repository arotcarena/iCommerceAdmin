import { Notification } from "type/entityTypes";
import { NavLink } from "reactstrap";
import { DateDistanceShow } from "UI/Show/DateDistanceShow";
import { useToggleNotificationStatus } from "functions/customHooks/api/queries/notificationQueries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createExcerpt } from "functions/stringHelpers/excerptMaker";
import { useOpenState } from "functions/customHooks/state/useOpenState";
import { NotificationModal } from "./NotificationModal";
import { useTranslation } from "react-i18next";

type Props = {
    notification: Notification,
    localToggleNotificationStatus: (id: number) => void,
};

const notificationContentmaxCharacters = 92;

export const NotificationItem = ({
    notification,
    localToggleNotificationStatus,
}: Props) => {
    const {t} = useTranslation();
    const toggleNotificationStatus = useToggleNotificationStatus();
    const queryClient = useQueryClient();
    const {mutate, isPending} = useMutation({
        mutationKey: ['notification_update', notification.id],
        mutationFn: () => toggleNotificationStatus(notification),
        onSuccess: () => {
            localToggleNotificationStatus(notification.id);
            queryClient.invalidateQueries({
                queryKey: ['count_unread_notifications']
            });
        }
    });

    const [modalIsOpen, openModal, closeModal] = useOpenState(false);
    const handleClick = () => {
        //open modal only if notification content is excerpted
        if(notification.description.length > notificationContentmaxCharacters) {
            openModal();
        }
    };

    return (
        <div 
            className="text-reset notification-item d-block dropdown-item" 
            onClick={handleClick} 
            style={{cursor: (notification.description.length > notificationContentmaxCharacters) ? 'pointer': 'default'}}
            title={(notification.description.length > notificationContentmaxCharacters) ? t('view_all'): ''}
        >
            <div className="d-flex">
                <div className="flex-grow-1">
                    <NavLink to="#" className="stretched-link">
                        <h6 className={'mt-0 mb-1 fs-13' + (notification.status === 'unread' ? ' fw-bold': ' text-muted')}>{notification.title}</h6>
                    </NavLink>
                    <div className={'fs-13' + (notification.status === 'unread' ? ' fw-semibold': ' text-muted')}>
                        <p className="mb-1">{createExcerpt(notification.description, notificationContentmaxCharacters)}</p>
                    </div>
                    {
                        notification.createdAt && (
                            <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                <span>
                                    <i className="mdi mdi-clock-outline"></i>{' '}
                                    <DateDistanceShow
                                        dateString={notification.createdAt} 
                                    />
                                </span>
                            </p>
                        )
                    }
                </div>
                <div className="px-2 fs-15">
                    <div className="form-check notification-check" title={t(notification.status === 'read' ? 'mark_as_unread': 'mark_as_read')}>
                        <input
                            onClick={e => e.stopPropagation()} 
                            onChange={() => mutate()} 
                            className="form-check-input" 
                            type="checkbox" 
                            value="" 
                            id="all-notification-check01" 
                            checked={notification.status === 'read'}
                        />
                        <label className="form-check-label" htmlFor="all-notification-check01"></label>
                    </div>
                </div>
            </div>
            <NotificationModal
                notification={notification}
                isOpen={modalIsOpen}
                close={closeModal}
            />
        </div>
    )
}
