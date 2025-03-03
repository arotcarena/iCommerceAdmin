import { EntityType } from "./entityTypes";
import { Currency } from "./mainTypes";
import { Item } from "./searchTypes";

export type OrderItem = {
    id: number,
    itemId: number,
    itemRef: string,
    itemDesignation?: string,
    itemDescription?: string,
    itemIsAvailable?: boolean,
    itemIsEnabled?: boolean,
    packaging: number,
    unitPriceExcludingTaxes: number,
    unitPriceDiscountedExcludingTaxes: number,
    quantity: number,
    totalPriceExcludingTaxes: number,
    discount: number,
    engravingOrderItemId?: number,
    location?: string, //deliveryNoteItem has no location
    complaintOriginOrderPickupAgent?: string,
    complaintOriginDeliveryNote?: EntityType,
};

export type OrderItemCheckable = OrderItem & {
    orderPickupAgent: {
        id: number,
        fullName: string,
    }|null,
    deliveryNoteId: number,
    deliveryNoteRef: string,
};

export type OrderTotalsPricing = {
    reference: string,
    totalHt: number,
    totalTTC: number,
    totalTVA: number,
    shippingAmountExcludingTaxes: number,
    shippingVatRate: number,
    shippingAmountIncludingTaxes: number,
    totalWeight?: number,
    loyaltyDiscountExcludingTaxes?: number,
    fixedCostsExcludingTaxes?: number,
    totalExcludingTaxesWithDiscount?: number,
    totalIncludingTaxesWithDiscount?: number,
    totalVatWithDiscount?: number,
};

export type OrderPricing = {
    items: OrderItem[],
    order?: OrderTotalsPricing,
    deliveryNote?: OrderTotalsPricing,
    proposal?: OrderTotalsPricing,
    invoice?: OrderTotalsPricing,
};

export type OrderItemGroup = {
    itemRef: string,
    orderItems: OrderItem[],
    engravingOrderItem?: OrderItem|null
};

export type OrderInfos = {
    id: number,
    reference: string,
    date: string,
    totalExcludingTaxes: number,
    correctShippingAmountExcludingTaxes: number,
    currency: Currency,
};

export type CustomerInfos = {
    id: number,
    customerCode: string,
    thirdPartCategory: string,
    billingMethod: string,
};

export type DeliveryNotesShippedData = {
    [customerName: string]: {
        customerInfos: CustomerInfos,
        groups: {
            [orderReference: string]: {
                orderInfos: OrderInfos,
                items: Item[],
            }
        }
    }
};

export type InvoiceToRemind = {
    id: number,
    amountIncludingTaxes: number,
    dueDate: string,
    nbDaysLate: string,
    lastReminderDate: string,
    reference: string,
    remainingAmount: string,
    remindLvl: number,
};

export type CustomersToRemindData = {
    [customerName: string]: {
        customer: {
            emailForInvoice: string,
            id: number,
            name: string,
            currency?: Currency,
        },
        invoices: InvoiceToRemind[]
    }
};
