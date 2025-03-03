export const TITLE_COMPANY_SEPARATOR = ' - ';

export const setHtmlTitle = (newTitle: string): void => {
    //if company name contains ' - ' we replace with ", " to avoid confusion
    newTitle = newTitle.replace(TITLE_COMPANY_SEPARATOR, ', ');

    const fullTitle = document.title;
    const company = fullTitle.split(TITLE_COMPANY_SEPARATOR)[0];
    document.title = company + TITLE_COMPANY_SEPARATOR + newTitle;
}

export const setHtmlTitleCompany = (company: string): void => {
    //if company name contains ' - ' we remove last part to avoid long names and confusion with title_company_separator
    company = company.split(TITLE_COMPANY_SEPARATOR)[0];

    const fullTitle = document.title;
    const pureTitle = fullTitle.split(TITLE_COMPANY_SEPARATOR)[1];
    document.title = company + TITLE_COMPANY_SEPARATOR + pureTitle;
}
