import { TITLE_COMPANY_SEPARATOR, setHtmlTitle, setHtmlTitleCompany } from "functions/dom/setHtmlTitle";

describe('setHtmlTitle', () => {
    it('should set correct title', () => {
        setHtmlTitle('test');
        expect(document.title).toContain('test');
    })

    it('should set correct company name', () => {
        setHtmlTitleCompany('company');
        expect(document.title).toContain('company')
    })

    it('should preserve title when set company name', () => {
        document.title = 'old company name' + TITLE_COMPANY_SEPARATOR + 'title test';
        setHtmlTitleCompany('new company name');
        expect(document.title).toContain('title test');
    })

    it('should preserve company name when set title', () => {
        document.title = 'company name' + TITLE_COMPANY_SEPARATOR + 'title';
        setHtmlTitle('new title');
        expect(document.title).toContain('company name');
    })

    it('should not preserve separator if there is one in company', () => {
        const companyName = 'new company name' + TITLE_COMPANY_SEPARATOR + 'end of name';
        setHtmlTitleCompany(companyName);
        expect(document.title).not.toContain(companyName);
    })

    it('should not preserve separator if there is one in company', () => {
        const companyName = 'new company name' + TITLE_COMPANY_SEPARATOR + 'end of name';
        setHtmlTitleCompany(companyName);
        expect(document.title).not.toContain(companyName);
        expect(document.title).toContain('new company name');
    })

    it('should not preserve separator if there is one in title', () => {
        const title = 'new title' + TITLE_COMPANY_SEPARATOR + 'end of title';
        setHtmlTitleCompany(title);
        expect(document.title).not.toContain(title);
        expect(document.title).toContain('new title');
    })

    it('should correctly transform only title when set title', () => {
        document.title = 'company' + TITLE_COMPANY_SEPARATOR + 'old title';
        setHtmlTitle('new title');
        expect(document.title).toEqual('company' + TITLE_COMPANY_SEPARATOR + 'new title');
    });

    it('should correctly transform only company when set company', () => {
        document.title = 'old company' + TITLE_COMPANY_SEPARATOR + 'title';
        setHtmlTitleCompany('new company');
        expect(document.title).toEqual('new company' + TITLE_COMPANY_SEPARATOR + 'title');
    });
})
