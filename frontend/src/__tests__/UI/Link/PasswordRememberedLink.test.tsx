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
    Attendez, je me souviens de mon mot de passe...
     
    <a
      class="fw-semibold text-primary text-decoration-underline"
      href="/login"
    >
       
      Cliquez ici
       
    </a>
  </p>
</div>
`);
    })
})
