import { render } from "@testing-library/react"
import { PasswordRequirements } from "UI/Info/PasswordRequirements"

describe('PasswordRequirements', () => {
    it('should render correctly', () => {
        const {container} = render(<PasswordRequirements />);

        expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="p-3 bg-light mb-2 rounded"
  >
    <h5
      class="fs-13"
    >
      info.password_must_contain
    </h5>
    <p
      class="invalid fs-12 mb-2"
      id="pass-length"
    >
      info.minimum_characters
    </p>
    <p
      class="invalid fs-12 mb-2"
      id="pass-lower"
    >
      info.minimum_one_lowercase
    </p>
    <p
      class="invalid fs-12 mb-2"
      id="pass-upper"
    >
      info.minimum_one_uppercase
    </p>
    <p
      class="invalid fs-12 mb-0"
      id="pass-number"
    >
      info.minimum_one_number
    </p>
  </div>
</div>
`);
    })
})
