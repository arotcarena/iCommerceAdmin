import { render, within } from "@testing-library/react"
import { InputIcons, InputIconsDisabled } from "UI/Form/WithSuggest/InputIcons"
import { getByQuerySelector } from "testUtils/helpers/domHelpers";

describe('InputIcons', () => {
    const setUp = (
        isLoading: boolean,
        mainRemoveIsOpen: boolean
    ): HTMLElement => {
        const {container} = render(
            <InputIcons
                isLoading={isLoading}
                onMainRemove={() => {}}
                mainRemoveIsOpen={mainRemoveIsOpen}
            />
        );

        return container;
    }
    
    it('should render loader if isLoading', () => {
        const container = setUp(true, false);
        expect(within(container).getByText('Loading...')).toBeInTheDocument();

        const container2 = setUp(true, true);
        expect(within(container2).getByText('Loading...')).toBeInTheDocument();
    })

    it('should render close button if main remove is open', () => {
        const container = setUp(false, true);
        expect(getByQuerySelector(container, 'button.input-closer')).toBeInTheDocument();
    })

    it('should not render close button if main remove is open but is loading', () => {
        const container = setUp(true, true);
        expect(container.querySelector('button.input-closer')).toBeNull();
    })

    it('should render expand button', () => {
        const container = setUp(false, false);
        expect(getByQuerySelector(container, 'button.input-expand')).toBeInTheDocument();

        const container2 = setUp(true, true);
        expect(getByQuerySelector(container2, 'button.input-expand')).toBeInTheDocument();
    })
})

describe('InputIconsDisabled', () => {
    it('should render correctly', () => {
        const {container} = render(<InputIconsDisabled />);

        expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="input-icons"
  >
    <div
      class="input-icons-separator-wrapper"
    >
      <div
        class="input-icons-separator"
      />
    </div>
    <button
      class="btn input-expand"
      type="button"
    >
      <i
        class="ri-arrow-down-s-line ri-xl"
      />
    </button>
  </div>
</div>
`);
    })
})
