import { render, screen } from "@testing-library/react"
import { LoginForm } from "pages/Authentication/Login/LoginForm";
import { BrowserRouter } from "react-router-dom";

describe('Login', () => {
    const setUp = ({
        isLoading,
        errorMessage
    }: {
        isLoading: boolean,
        errorMessage: any
    }): HTMLElement => {
        const {container} = render(
            <BrowserRouter basename="/">
              <LoginForm onSubmit={() => {}} isLoading={isLoading} errorMessage={errorMessage} />
            </BrowserRouter>
        );
        return container;
    }

    it('should render correctly', () => {
        const container = setUp({
            isLoading: false,
            errorMessage: null
        });
        expect(container).toMatchInlineSnapshot(`
<div>
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
                    style="margin: 30px;"
                  >
                    <img
                      alt="Logo"
                      height="50"
                      src="france-sport-logo.png"
                    />
                    <div
                      class="company-choice-item-title"
                    >
                      France Sport
                    </div>
                  </div>
                </div>
              </div>
              <p
                class="mt-3 fs-15 fw-medium"
              >
                France Sport
                 back-office
              </p>
            </div>
          </div>
        </div>
        <div
          class="justify-content-center row"
        >
          <div
            class="col-md-8 col-lg-6 col-xl-5"
          >
            <div
              class="mt-4 card"
            >
              <div
                class="p-4 card-body"
              >
                <div
                  class="text-center mt-2"
                >
                  <h5
                    class="text-primary"
                  >
                    Bienvenue !
                  </h5>
                  <p
                    class="text-muted"
                  >
                    Connectez-vous pour continuer
                  </p>
                </div>
                <div
                  class="p-2 mt-4"
                >
                  <form
                    class=""
                  >
                    <div
                      class="mb-3"
                    >
                      <div
                        class=""
                      >
                        <label
                          class="form-label form-label"
                          for="username"
                        >
                          Email
                        </label>
                        <input
                          aria-invalid="false"
                          class="form-control form-control"
                          name="username"
                          placeholder="Entrer votre adresse email"
                          type="email"
                          value=""
                        />
                      </div>
                    </div>
                    <div
                      class="mb-3"
                    >
                      <div
                        class="float-end"
                      >
                        <a
                          class="text-muted"
                          href="/auth/forgotten-password"
                        >
                          Mot de passe oublié ?
                        </a>
                      </div>
                      <div
                        class=""
                      >
                        <label
                          class="form-label form-label"
                          for="password"
                        >
                          Mot de passe
                        </label>
                        <div
                          class="position-relative auth-pass-inputgroup mb-3"
                        >
                          <div
                            class=""
                          >
                            <input
                              aria-invalid="false"
                              class="form-control form-control pe-5 form-control"
                              name="password"
                              placeholder="Entrer votre mot de passe"
                              type="password"
                              value=""
                            />
                          </div>
                          <button
                            class="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted btn-password-show"
                            id="password-addon"
                            type="button"
                          >
                            <i
                              class="ri-eye-fill align-middle"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      class="mt-4"
                    >
                      <button
                        class="btn btn-success w-100 btn btn-success"
                        type="submit"
                      >
                        <span>
                          Se connecter
                        </span>
                      </button>
                    </div>
                  </form>
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
                 
                France Sport
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</div>
`

);
    })

    it('should render error message', () => {
        setUp({
            isLoading: false,
            errorMessage: 'invalid_credentials'
        });
        expect(screen.getByText('invalid_credentials')).toBeInTheDocument();
    })
})