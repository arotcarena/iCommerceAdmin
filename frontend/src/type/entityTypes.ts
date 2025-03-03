import { Item } from "./searchTypes";

export type ApiEntityContext = {
    [key: string]: any
};

export type EntityType = {
    '@id': string,
    '@type'?: string,
    id: number,
    [key: string]: any,
};

export type User = {
    '@id': string,
    '@type'?: string,
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    fullName: string,
    roles: string[],
    [key: string]: any
};

export type EntityAttachment = {
    id: number,
    filePath: string,
    fileName: string,
    type?: string,
    description?: string,
    public?: boolean, 
    [key: string]: any
};

export type Notification = {
    id: number,
    toUser: string,
    type: NotificationType,
    status: NotificationStatus,
    title: string,
    description: string,
    createdAt?: string
};
export type NotificationType = 'message' | 'alert';
export type NotificationStatus = 'unread' | 'read';

export type PaymentDetailData = {
    amount?: number,
    invoiceId?: number,
    creditNoteId?: number,
    depositId?: number,
    overPaidId?: number,
    type: string,
    linkedObject?: Item, // invoice of creditNote
    applyDiscount?: boolean,
    gapAmount?: number,
};

export type PaymentDetail = PaymentDetailData & {
    id: string|number,
};
