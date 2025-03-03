import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { SuperCrudProvider } from "Components/Contexts/SuperCrudContext";
import { ColumnsSelector } from "UI/SuperCrud/Routes/CrudTab/ColumnsSelector";
import { useToggleState } from "functions/customHooks/state/useToggleState";
import { resetStoredFormData } from "functions/storage/form/formDataStorage";
import { useState } from "react";
import { TabColumn } from "type/superCrudTypes";

describe('ColumnsSelector', () => {
    afterEach(() => {
        resetStoredFormData('User');
    });
    const TestWrapper = ({initialIsOpen}: {initialIsOpen?: boolean}) => {
        const [columns, setColumns] = useState<TabColumn[]>([
            {name: 'column1', type: 'text', isVisible: false},
            {name: 'column2', type: 'int', isVisible: true},
            {name: 'column3', type: 'textarea', isVisible: true},
        ]);
        const [isOpen, toggleOpen] = useToggleState(initialIsOpen || false);

        return (
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
              <ColumnsSelector
                  isOpen={isOpen}
                  toggleOpen={toggleOpen}
                  columns={columns}
                  setColumns={setColumns}
              />
            </SuperCrudProvider>
        )
    };

    const setUp = (
        initialIsOpen?: boolean
    ): HTMLElement => {
        const {container} = render(
            <TestWrapper initialIsOpen={initialIsOpen} />
        )

        return container;
    };

    it('should be open', () => {
        setUp(true);
        expect(screen.getByText('column1')).toBeInTheDocument();
    })
    
    it('should be closed', () => {
        setUp(false);
        expect(screen.queryByText('column1')).toBeNull();
    })

    it('should render correctly when open', () => {
        const container = setUp(true);

        expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="columns-selector open"
  >
    <button
      class="btn columns-selector-opener i-text"
      type="button"
    >
      <i
        class="ri-arrow-right-s-line icon-arrow h4 page-sticky pt-4"
      />
    </button>
    <ul
      class="pt-4 ms-2 me-2 mb-4 page-sticky list-group"
    >
      <h3
        class="h3 mt-0 ms-2 mb-2"
      >
        column
      </h3>
      <label
        class="d-flex list-group-item"
      >
        <input
          class="form-check-input me-1 form-check-input"
          type="checkbox"
        />
        column1
      </label>
      <label
        class="d-flex list-group-item"
      >
        <input
          checked=""
          class="form-check-input me-1 form-check-input"
          type="checkbox"
        />
        column2
      </label>
      <label
        class="d-flex list-group-item"
      >
        <input
          checked=""
          class="form-check-input me-1 form-check-input"
          type="checkbox"
        />
        column3
      </label>
    </ul>
  </div>
</div>
`);
    })

    it('should render correctly when closed', () => {
        const container = setUp(false);

        expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="columns-selector"
  >
    <button
      class="btn columns-selector-opener i-text"
      type="button"
    >
      <i
        class="ri-arrow-left-s-line icon-arrow h4 page-sticky pt-4"
      />
    </button>
  </div>
</div>
`);
    })

    it('should open correctly', async () => {
        setUp(false);
        await userEvent.click(screen.getByRole('button'));
        expect(screen.getByText('column1')).toBeInTheDocument();
    })

    it('should close correctly', async () => {
        setUp(true);
        await userEvent.click(screen.getByRole('button'));
        expect(screen.queryByText('column1')).toBeNull();
    })
})