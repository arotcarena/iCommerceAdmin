import { render } from "@testing-library/react"
import { SuperCrudProvider } from "Components/Contexts/SuperCrudContext";
import { FilterCard } from "UI/SearchIndex/FilterControls/FilterCard";
import { fakeThreeColumns } from "testUtils/fakeData/columns/fakeColumns";

describe('FilterCard', () => {
    it('should render correctly', () => {
        const {container} = render(
            <SuperCrudProvider
                title={'title'}
                items={[]}
                isLoading={false}
                columns={fakeThreeColumns}
                basePath="/"
                writeEndpoint="/"
                showEndpoint="/"
                entity="Test"
                forceFetch={() => {}}
                hasLineCreate={false}
                globalContext={{
                  isDeletable: true,
                  isEditable: true,
                  labelProperty: 'id'
                }}
            >
                <FilterCard
                    name="email"
                    value="test"
                    onReset={(name: string) => {}}
                />
            </SuperCrudProvider>
        );

        expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="filter-card card mb-3 position-relative"
    style="max-width: 18rem;"
  >
    <div
      class="card-body"
    >
      <i
        class="ri-filter-fill ri-lg"
      />
       
      email
      <button
        class="btn position-absolute"
        style="top: -5px; right: -5px;"
        type="button"
      >
        <i
          class="ri-close-line ri-xl"
        />
      </button>
    </div>
    <div
      class="filter-value-wrapper"
    />
  </div>
</div>
`);
    })
})