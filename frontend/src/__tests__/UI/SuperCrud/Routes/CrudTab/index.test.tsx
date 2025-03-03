import { within } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { SuperCrudProvider } from "Components/Contexts/SuperCrudContext";
import { CrudTab } from "UI/SuperCrud/Routes/CrudTab"
import { resetStoredFormData } from "functions/storage/form/formDataStorage";
import { useState } from "react";
import { getByQuerySelector } from "testUtils/helpers/domHelpers";
import { renderIntegrated } from "testUtils/renderIntegrated";
import { Item, PaginatedType } from "type/searchTypes";
import { TabColumn } from "type/superCrudTypes";

type Props = {
    result: PaginatedType<Item>,
    initialColumns: TabColumn[]
};

describe('CrudTab', () => {
    afterEach(() => {
        resetStoredFormData('User');
    });

    const emptyResult = {
        items: [],
        count: 0,
        maxPage: 1,
        perPage: 20,
        currentPage: 1
    };

    const testColumns: TabColumn[] = [
        {name: 'column1', type: 'text', isVisible: false},
        {name: 'column2', type: 'int', isVisible: true},
        {name: 'column3', type: 'textarea', isVisible: true},
    ];

    const TestWrapper = ({
        result,
        initialColumns
    }: Props) => {
        const [columns, setColumns] = useState<TabColumn[]>(initialColumns);

        return (
            <SuperCrudProvider
                title="title"
                items={result.items}
                isLoading={false}
                columns={columns}
                basePath="/"
                writeEndpoint="endpoint"
                showEndpoint="endpoint"
                forceFetch={() => {}}
                entity="User"
                hasLineCreate={false}
                globalContext={{
                    isEditable: true,
                    labelProperty: 'id',
                    isDeletable: true
                }}
            >
                <CrudTab
                    columns={columns}
                    setColumns={setColumns}
                    filters={{}}
                    setFilterValue={(key: string, value: any) => {}}
                    countFilters={0}
                    resetFilters={() => {}}
                    resetFilter={(filter: string) => {}}
                    result={result}
                    handlePageChange={(page: number) => {}}
                    defaultItemsPerPage={10}
                    canShowFilter={(name: string) => true}
                />
            </SuperCrudProvider>
        )
    };

    const setUp = (result: PaginatedType<Item>, columns: TabColumn[]): HTMLElement => {
        const {container} = renderIntegrated(
            <TestWrapper
                result={result}
                initialColumns={columns}
            />
        )
        return container;
    };

    //columns
    it('should display only columns with isVisible true', () => {
        const container = setUp(emptyResult, testColumns);
        const thElements = container.querySelectorAll('th');
        expect(thElements.length).toEqual(2 + 2); // add 2 because of checkbox and controls
    })

    it('should not display columnsSelector by default', () => {
        const container = setUp(emptyResult, testColumns);
        expect(container.querySelector('.columns-selector ul')).toBeNull();
    })

    it('should display column when check this column in ColumnsSelector', async () => {
        const container = setUp(emptyResult, testColumns);

        await clickOnColumnsSelectorOpener(container);

        const columnsSelector = getByQuerySelector(container, '.columns-selector');

        const columnsSelectorItem = within(columnsSelector).getByText('column1');
        await userEvent.click(columnsSelectorItem);

        const table = getByQuerySelector(container, 'table');
        expect(within(table).getByText('column1')).toBeInTheDocument();
    })

    it('should not display column when uncheck this column in ColumnsSelector', async () => {
        const container = setUp(emptyResult, testColumns);

        await clickOnColumnsSelectorOpener(container);

        const columnsSelector = getByQuerySelector(container, '.columns-selector');

        const columnsSelectorItem = within(columnsSelector).getByText('column2');
        await userEvent.click(columnsSelectorItem);
        
        const table = getByQuerySelector(container, 'table');
        expect(within(table).queryByText('column2')).not.toBeInTheDocument();
    })

    //tab
    it('should not display tab when no columns are passed', () => {
        const container = setUp(emptyResult, []);
        expect(container.querySelector('table')).toBeNull();
    })

    //helpers
    const clickOnColumnsSelectorOpener = async (container: HTMLElement) => {
        const opener = getByQuerySelector(container, '.columns-selector-opener');
        await userEvent.click(opener);
    }
})

    