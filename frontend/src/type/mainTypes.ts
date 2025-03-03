export type CompanyChoiceType = {
    id: number,
    code: string,
    name: string,
    logo: string|null,
    smallLogo: string|null,
};

export type CompanyType = CompanyChoiceType & {
    isEnabled: boolean,
    logo?: {
        id: number,
        fileName: string,
        filePath: string,
        [key: string]: any,
    },
    smallLogo?: {
        id: number,
        fileName: string,
        filePath: string,
        [key: string]: any,
    }
    [key: string]: any,
};

export type BreadcrumbItem = {
    link?: string,
    label: string,
    route?: string
};

export type Currency = 'EUR' | 'USD';
