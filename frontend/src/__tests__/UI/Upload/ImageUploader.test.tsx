import { render, screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { AlertContextProvider } from "Components/Contexts/AlertContext";
import { API_ENTITY_ATTACHMENT_DOWNLOAD, API_ENTITY_ATTACHMENTS } from "Routes/apiRoutes";
import { ImageUploader } from "UI/Upload/ImageUploader"
import { AppConfig } from "config/AppConfig";
import { t } from "i18next";
import { ReactNode, useState } from "react";
import { MemoryRouter } from "react-router-dom";
import { getByQuerySelector } from "testUtils/helpers/domHelpers";
import { expectApiRequestCalledWith } from "testUtils/helpers/fetchMockHelpers";
import { UploadedFile } from "type/formTypes";

type TestWrapperProps = {
    defaultValue?: UploadedFile[],
    multiple?: boolean,
    acceptedFormats?: string[],
    minSize?: number,
    maxSize?: number,
    maxCount?: number,
    errors?: ReactNode,
}


describe('ImageUploader', () => {

    const TestWrapper = ({
        defaultValue = [],
        multiple,
        acceptedFormats,
        minSize,
        maxSize,
        maxCount,
        errors
    }: TestWrapperProps) => {
        const [value, setValue] = useState<UploadedFile[]>(defaultValue);
        const handleChange = (uploadedFiles: UploadedFile[]) => setValue(uploadedFiles);

        return (
            <AlertContextProvider>
                <ImageUploader
                    multiple={multiple}
                    value={value}
                    onChange={handleChange}
                    acceptedFormats={acceptedFormats}
                    minSize={minSize}
                    maxSize={maxSize}
                    maxCount={maxCount}
                    errors={errors}
                />
            </AlertContextProvider>
        )
    }

    const setUp = (
        defaultValue?: UploadedFile[],
        multiple?: boolean,
        acceptedFormats?: string[],
        minSize?: number,
        maxSize?: number,
        maxCount?: number,
        errors?: ReactNode,
    ): HTMLElement => {
        const {container} = render(
            <MemoryRouter basename="/">
                <TestWrapper
                    defaultValue={defaultValue}
                    multiple={multiple}
                    acceptedFormats={acceptedFormats}
                    minSize={minSize}
                    maxSize={maxSize}
                    maxCount={maxCount}
                    errors={errors}
                />
            </MemoryRouter>
        );

        return container;
    }

    it('should display dropzone', () => {
        const container = setUp();

        expect(getByQuerySelector(container, '.dropzone')).toBeInTheDocument();
    })

    it('should display file when default file is passed', () => {
        setUp([{ id: 111, src: 'path/to/file.png', name: 'file.png' }]);

        expect(screen.getByText('file.png')).toBeInTheDocument();
        expect(screen.getByRole('img')).toBeInTheDocument();
        expect(screen.getByRole('img')).toHaveAttribute('src', AppConfig.API_BASE_URL + API_ENTITY_ATTACHMENT_DOWNLOAD + '/111');
    })

    it('should display multiple files when default files are passed', () => {
        setUp([
            { id: 111, src: 'path/to/file.png', name: 'file.png' },
            { id: 222, src: 'path/to/other-file.png', name: 'other-file.png' },
        ], true);

        expect(screen.getByText('file.png')).toBeInTheDocument();
        expect(screen.getByText('other-file.png')).toBeInTheDocument();

        const imgs = screen.getAllByRole('img');
        expect(imgs.length).toEqual(2);

        const file = imgs[0];
        const otherFile = imgs[1];

        expect(file).toBeInTheDocument();
        expect(otherFile).toBeInTheDocument();

        expect(file).toHaveAttribute('src', AppConfig.API_BASE_URL + API_ENTITY_ATTACHMENT_DOWNLOAD + '/111');
        expect(otherFile).toHaveAttribute('src', AppConfig.API_BASE_URL + API_ENTITY_ATTACHMENT_DOWNLOAD + '/222');
    })

    it('should display confirmation modal when click on remove button', async () => {
        setUp([{ id: 1, src: 'path/to/file.png', name: 'file.png' }]);

        const fileCard = screen.getByText('file.png').parentElement?.parentElement;
        if(!fileCard) throw new Error('no file card');
        await userEvent.click(within(fileCard).getByRole('button'));

        expect(screen.getByText(t('confirm.delete')));
        expect(screen.getByText(t('close')));
    })

    it('should call api delete entity_attachment endpoint when confirm delete', async () => {
        setUp([{ id: 999, src: 'path/to/file.png', name: 'file.png' }]);

        const fileCard = screen.getByText('file.png').parentElement?.parentElement;
        if(!fileCard) throw new Error('no file card');

        await userEvent.click(within(fileCard).getByRole('button'));
        await userEvent.click(screen.getByText(t('confirm.delete')));

        await waitFor(() => {
            expectApiRequestCalledWith(API_ENTITY_ATTACHMENTS + '/' + 999, 'DELETE', {});
        }, {timeout: 2000});
    })

    it('should remove file when confirm delete and api return no error', async () => {
        setUp([{ id: 1, src: 'path/to/file.png', name: 'file.png' }]);

        const fileCard = screen.getByText('file.png').parentElement?.parentElement;
        if(!fileCard) throw new Error('no file card');

        fetchMock.resetMocks();
        fetchMock.mockResponse(
            JSON.stringify({}), {status: 200}
        );
        
        await userEvent.click(within(fileCard).getByRole('button'));
        await userEvent.click(screen.getByText(t('confirm.delete')));

        await waitFor(() => {
            expect(screen.queryByText('file.png')).toBeNull();
        }, {timeout: 2000});
    })

    it('should not remove file when confirm delete and api return error', async () => {
        setUp([{ id: 1, src: 'path/to/file.png', name: 'file.png' }]);

        const fileCard = screen.getByText('file.png').parentElement?.parentElement;
        if(!fileCard) throw new Error('no file card');

        fetchMock.resetMocks();
        fetchMock.mockResponse(
            JSON.stringify({}), {status: 500}
        );
        
        await userEvent.click(within(fileCard).getByRole('button'));
        await userEvent.click(screen.getByText(t('confirm.delete')));

        await waitFor(() => {
            expect(screen.queryByText('file.png')).not.toBeNull();
        }, {timeout: 2000});
    })
})
