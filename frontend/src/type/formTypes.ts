import { EntityType } from "./entityTypes"
import { Item } from "./searchTypes"

export type FormData = {
    [key: string]: any
}

export type ChoicesType = {
    [label: string]: string|number
}

export type SelectOption = {
    label: string,
    value: any,
}

export type FilterSelectOption = {
    label: string,
    value: string|number|null,
};

export type SortOption = {
    label: string,
    value: string,
};

export type File = {
    path: string,
    name: string,
    type: string,
    size: number
};

/**
 * Most of the time, we use id and not src to get file url
 * with method getEntityAttachmentUrl(id)
 */
export type UploadedFile = {
    id: number,
    src: string, // path
    name: string,
    size?: string
};

export type Base64File = {
    src: string, // base64 string
    name: string,
    size?: string
};

export type LoginData = {
    email: string,
    password: string,
};

export type PasswordChangeData = {
    oldPassword: string,
    newPassword: string, 
    confirmPassword: string
};

export type PasswordCreateData = {
    newPassword: string, 
    confirmPassword: string,
};

export type ConstraintViolationType = {
    propertyPath: string,
    message: string,
    code: string
};

export type AddressType = {
    '@id'?: string,
    name: string,
    firstLine: string,
    secondLine?: string,
    thirdLine?: string,
    zip: string,
    city: string,
    country: {
        id: number,
        name: string,
        iso2: string,
    },
    phoneNumber?: string,
    mobileNumber?: string
};

export type OrderItemData = {
    item: string, //IRI
    quantity: number,
    engraving: string, //engraving item IRI
};

export type OrderTotals = {
    totalArticlesExcludingTaxes: string,
    totalArticlesIncludingTaxes: string,
    totalArticlesVat: string,
    shippingAmountExcludingTaxes: string,
    shippingVatRate: number,
    shippingAmountIncludingTaxes: string,
    totalIncludingTaxes: string,
    totalExcludingTaxesWithDiscount?: string,
    totalIncludingTaxesWithDiscount?: string,
    totalVatWithDiscount?: string,
};

export type InvoiceTotals = {
    totalExcludingTaxes: string,
    totalIncludingTaxes: string,
    totalVat: string,
    totalExcludingTaxesWithDiscount?: string,
    totalIncludingTaxesWithDiscount?: string,
    totalVatWithDiscount?: string,
    shippingAmountExcludingTaxes: string,
    shippingVatRate: number,
    shippingAmountIncludingTaxes: string,
    loyaltyDiscountExcludingTaxes: string,
    fixedCostsExcludingTaxes: string,
};

export type EntityFieldValue = EntityType|EntityType[]|null|undefined;

export type InvoicePdfOptions = {
    showHeaderProductsOrigin: null|boolean,
    showHsCode: null|boolean,
    showDiscountRate: null|boolean,
    showShipping: null|boolean,
    showDiscountColumn: null|boolean,
};

export type BankAmount = {
    id: string,
    bankAccount: Item, // BankAccount entity
    amount: number
};
