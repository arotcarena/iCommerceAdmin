import { convertPaginatedResponse } from "../../../api/convertor/apiPlatformConversion/paginatedResponseConvertor";
import { ApiPlatformPaginatedType, PaginatedType } from "type/searchTypes";
import { API_NOTIFICATIONS } from "Routes/apiRoutes";
import { Notification, NotificationStatus } from "type/entityTypes";
import { useApiRequest } from "../useApiRequest";

export const useCountUnreadNotifications = (): (() => Promise<number>) => {
    const doApiRequest = useApiRequest();

    const countUnreadNotifications = async (): Promise<number> => {
        try {
            const response = await doApiRequest<ApiPlatformPaginatedType>(API_NOTIFICATIONS, {status: 'unread'}, 'GET');
            // convert apiplatform paginated response to standard paginated response
            const pagination = convertPaginatedResponse(response);
            return pagination.count;
        } catch(e) {
            throw e;
        }
    };

    return countUnreadNotifications;
};

export const useLoadNotifications = (
    type?: string, 
    limit: number = 20
): ((page?: number) => Promise<PaginatedType<Notification>>) => {
    const doApiRequest = useApiRequest();

    const loadNotifications = async (page: number = 1): Promise<PaginatedType<Notification>> => {
        let params: object = {
            'order[createdAt]': 'DESC',
            itemsPerPage: limit,
            page,
        };
        if(type) {
            params = {...params, type};
        }

        try {
            const response = await doApiRequest<ApiPlatformPaginatedType>(API_NOTIFICATIONS, params, 'GET');
            //convert apiplatform paginated response to standard paginated response
            return convertPaginatedResponse(response);
        } catch(e) {
            throw e;
        }
    };
    return loadNotifications;
};

export const useToggleNotificationStatus = (): ((notification: Notification) => Promise<any>) => {
    const doApiRequest = useApiRequest();

    const toggleNotificationStatus = (notification: Notification): Promise<any> => {
        const newStatus: NotificationStatus = notification.status === 'read' ? 'unread': 'read';
        return doApiRequest<any>(API_NOTIFICATIONS + '/' + notification.id, {status: newStatus}, 'PATCH');
    };

    return toggleNotificationStatus;
};


export const useLoadNotification = (): ((id: number) => Promise<Notification>) => {
    const doApiRequest = useApiRequest();

    const showNotification = (id: number): Promise<Notification> => {
        return doApiRequest<Notification>(API_NOTIFICATIONS + '/' + id, {}, 'GET');
    };

    return showNotification;
};
