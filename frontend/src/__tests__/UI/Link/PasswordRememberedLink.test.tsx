import { render } from "@testing-library/react"
import { PasswordRememberedLink } from "UI/Link/PasswordRememberedLink"
import { MemoryRouter } from "react-router-dom";

describe('PasswordRememberedLink', () => {
    it('should render correctly', () => {
        const {container} = render(
            <MemoryRouter basename="/">
                <PasswordRememberedLink />
            </MemoryRouter>
        );

        expect(container).toMatchInlineSnapshot(`
<div>
  <p
    class="mb-0"
  >
    wait_remember_my_password
     
    <a
      class="fw-semibold text-primary text-decoration-underline"
      href="/login"
    >
       
      click_here
       
    </a>
  </p>
</div>
`);
    })
})
