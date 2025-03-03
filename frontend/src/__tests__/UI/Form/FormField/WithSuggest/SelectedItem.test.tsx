import { render } from "@testing-library/react"
import { SelectedItem, SelectedItemDisabled } from "UI/Form/WithSuggest/SelectedItem"

describe('selectedItem', () => {
    it('should render correctly', () => {
        const {container} = render(
            <SelectedItem id={3} onRemove={(id: number) => {}}>
                test
            </SelectedItem>
        );

        expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="input-selected-item"
  >
    <div
      class="input-selected-item-label"
    >
      test
    </div>
    <button
      aria-label="Remove test"
      class="input-selected-item-closer"
      type="button"
    >
      <i
        class="ri-close-line"
      />
    </button>
  </div>
</div>
`);
    })
})

describe('selectedItemDisabled', () => {
    it('should render correctly', () => {
        const {container} = render(
            <SelectedItemDisabled>
                test
            </SelectedItemDisabled>
        );

        expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="input-selected-item"
  >
    <div
      class="input-selected-item-label pe-2"
    >
      test
    </div>
  </div>
</div>
`








);
    })
})
