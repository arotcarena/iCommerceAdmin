import { render, screen } from "@testing-library/react"
import { SuperCrudProvider } from "Components/Contexts/SuperCrudContext";
import { ColumnItem } from "UI/SuperCrud/Routes/CrudTab/ColumnsSelector/ColumnItem";
import { resetStoredFormData } from "functions/storage/form/formDataStorage";
import { TabColumn } from "type/superCrudTypes";

describe('ColumnItem', () => {
    afterEach(() => {
        resetStoredFormData('User');
    });
    const setUp = (
        column: TabColumn,
        onSelect: (column: TabColumn) => void = (column) => {} 
    ): HTMLElement => {
        const {container} = render(
            <SuperCrudProvider
                title="test"
                items={[]}
                isLoading={false}
                columns={[]}
                basePath="/"
                writeEndpoint="/"
                showEndpoint="/"
                forceFetch={() => {}}
                hasLineCreate={false}
                entity="User"
                globalContext={{
                    isEditable: true,
                    isDeletable: true,
                    labelProperty: 'id'
                }}
            >
                <ColumnItem
                    column={column}
                    onSelect={onSelect}
                />
            </SuperCrudProvider>
        )

        return container;
    };

    it('should render correctly', () => {
        const container = setUp({
            name: 'column',
            type: 'text',
            isVisible: true
        });

        expect(container).toMatchInlineSnapshot(`
<div>
  <label
    class="d-flex list-group-item"
  >
    <input
      checked=""
      class="form-check-input me-1 form-check-input"
      type="checkbox"
    />
    column
  </label>
</div>
`);
    })

    it('should display column item with checkbox checked', () => {
        const container = setUp({
            name: 'column',
            type: 'text',
            isVisible: true
        });

        const input = container.querySelector('input');
        if(!input) throw new Error('no checkbox on column item');

        expect(input).toBeChecked();
    })

    it('should display column item with checkbox unchecked', () => {
        const container = setUp({
            name: 'column',
            type: 'text',
            isVisible: false
        });

        const input = container.querySelector('input');
        if(!input) throw new Error('no checkbox on column item');

        expect(input.getAttribute('checked')).toBeNull();
    })
})