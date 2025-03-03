import { render, screen } from "@testing-library/react"
import { Error } from "pages/error/Error"
import { MemoryRouter } from "react-router-dom";

describe('Error', () => {

    const setUp = (): HTMLElement => {
        const {container} = render(
            <MemoryRouter basename="/">
                <Error error={{message: 'Error message'}} resetErrorBoundary={() => {}} />
            </MemoryRouter>
        );

        return container;
    }

    it('should display error message', () => {
        setUp();

        expect(screen.getByText('Error message')).toBeInTheDocument();
    })

    it('should display 500', () => {
        setUp();

        expect(screen.getByText('500')).toBeInTheDocument();
    })

    it('should render correctly', () => {
        const container = setUp();

        expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="auth-page-wrapper py-5 d-flex justify-content-center align-items-center min-vh-90"
  >
    <div
      class="auth-page-content overflow-hidden p-0"
    >
      <div
        class="container-fluid"
      >
        <div
          class="justify-content-center row"
        >
          <div
            class="text-center col-xl-4"
          >
            <div
              class="error-500 position-relative"
            >
              <img
                alt=""
                class="img-fluid error-500-img error-img"
                src="error500.png"
                style="max-height: 300px;"
              />
              <h1
                class="title text-primary"
              >
                500
              </h1>
            </div>
            <div>
              <h4>
                Erreur interne du serveur !
              </h4>
              <p
                class="text-muted w-75 mx-auto"
              >
                Error message
              </p>
              <button
                class="btn btn-primary"
                type="button"
              >
                <i
                  class="mdi mdi-home me-1"
                />
                back_home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`);
    })
})