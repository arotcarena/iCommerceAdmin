import { render, screen } from "@testing-library/react"
import { Error404 } from "pages/error/Error404";
import { MemoryRouter } from "react-router-dom";

describe('Error', () => {

    const setUp = (): HTMLElement => {
        const {container} = render(
            <MemoryRouter basename="/">
              <Error404 />
            </MemoryRouter>
        );

        return container;
    }

    it('should display 404', () => {
        setUp();
        expect(screen.getByText('404')).toBeInTheDocument();
    })

    it('should render correctly', () => {
        const container = setUp();
        expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="auth-page-wrapper"
  >
    <div
      class="auth-page-wrapper pt-5"
    >
      <div
        class="auth-one-bg-position auth-one-bg"
        id="auth-particles"
      >
        <div
          class="bg-overlay"
        />
        <div
          class="shape"
        >
          <svg
            version="1.1"
            viewBox="0 0 1440 120"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <path
              d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"
            />
          </svg>
        </div>
      </div>
      <div
        class="auth-page-content"
      >
        <div
          class="container"
        >
          <div
            class="row"
          >
            <div
              class="col-lg-12"
            >
              <div
                class="text-center mb-4 text-white-50"
              >
                <div
                  class="auth-logo-wrapper"
                >
                  <div
                    class="auth-logo"
                  >
                    <div
                      style="margin: 20px;"
                    >
                      <img
                        alt="logo"
                        height="50"
                        src="main-logo.png"
                      />
                    </div>
                  </div>
                </div>
                <p
                  class="mt-3 fs-15 fw-medium"
                >
                  Cocktailissimo
                   back-office
                </p>
              </div>
            </div>
          </div>
          <div
            class="auth-page-content"
          >
            <div
              class="container"
            >
              <div
                class="row"
              >
                <div
                  class="col-lg-12"
                >
                  <div
                    class="text-center pt-4"
                  >
                    <div
                      class=""
                    >
                      <img
                        alt=""
                        class="error-basic-img move-animation"
                        src="error.svg"
                        style="max-height: 300px;"
                      />
                    </div>
                    <div
                      class="mt-n4"
                    >
                      <h1
                        class="display-1 fw-medium"
                      >
                        404
                      </h1>
                      <h3
                        class="text-uppercase"
                      >
                        error.page_not_found
                         😭
                      </h3>
                      <p
                        class="text-muted mb-4"
                      >
                        error.page_not_available
                      </p>
                      <a
                        class="btn btn-primary"
                        href="/"
                      >
                        <i
                          class="mdi mdi-home me-1"
                        />
                        back_to_home
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer
        class="footer"
      >
        <div
          class="container"
        >
          <div
            class="row"
          >
            <div
              class="col-lg-12"
            >
              <div
                class="text-center"
              >
                <p
                  class="mb-0 text-muted"
                >
                  © 
                  2025
                   
                  Cocktailissimo
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</div>
`






);
    })
})
