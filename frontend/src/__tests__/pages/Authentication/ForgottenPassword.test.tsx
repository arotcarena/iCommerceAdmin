import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { API_FORGOTTEN_PASSWORD } from "Routes/apiRoutes";
import { generateUrl } from "functions/router/urlGenerator";
import ForgottenPassword from "pages/Authentication/ForgottenPassword";
import { getByQuerySelector } from "testUtils/helpers/domHelpers";
import { expectApiRequestCalledWith } from "testUtils/helpers/fetchMockHelpers";
import { renderIntegrated } from "testUtils/renderIntegrated";

describe('ForgottenPassword', () => {
    const setUp = (): HTMLElement => {
        const {container} = renderIntegrated(<ForgottenPassword />);

        return container;
    };   

    it('should render correctly', () => {
        const container = setUp();

        expect(container).toMatchInlineSnapshot(`
<div>
  <div
    data-testid="location-display"
  >
    /
  </div>
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
                      alt="Logo"
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
                    Forgot Password?
                  </h5>
                  <p
                    class="text-muted"
                  >
                    Reset password
                  </p>
                  <i
                    class="ri-mail-send-line display-5 text-success"
                  />
                </div>
                <div
                  class="border-0 alert-warning text-center mb-2 mx-2 alert alert-success fade"
                  role="alert"
                >
                  Enter your email and instructions will be sent to you!
                </div>
                <div
                  class="p-2"
                >
                  <form
                    class=""
                  >
                    <div
                      class="mb-4"
                    >
                      <div
                        class=""
                      >
                        <label
                          class="form-label form-label"
                          for="email"
                        >
                          Email
                        </label>
                        <input
                          aria-invalid="false"
                          class="form-control form-control"
                          name="email"
                          placeholder="Enter email"
                          type="email"
                          value=""
                        />
                      </div>
                    </div>
                    <div
                      class="text-center mt-4"
                    >
                      <button
                        class="btn btn-success w-100 btn btn-success"
                        type="submit"
                      >
                        <span>
                          Send Reset Link
                        </span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div
              class="mt-4 text-center"
            >
              <p
                class="mb-0"
              >
                Wait, I remember my password...
                 
                <a
                  class="fw-semibold text-primary text-decoration-underline"
                  href="/login"
                >
                   
                  Click here
                   
                </a>
              </p>
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
`







);
    })

    it('should display invalid-feedback when front validation blank email', async () => {
        const container = setUp();
        
        await userEvent.click(screen.getByRole('button'));

        expect(getByQuerySelector(container, 'input[name=email] + .invalid-feedback')).toBeInTheDocument();
    })

    it('should display invalid-feedback when front validation invalid email', async () => {
        const container = setUp();
        
        await userEvent.type(getByQuerySelector(container, 'input'), 'invalidemail.fr');
        await userEvent.click(screen.getByRole('button'));

        expect(getByQuerySelector(container, 'input[name=email] + .invalid-feedback')).toBeInTheDocument();
    })

    it('should not display invalid-feedback when valid email', async () => {
        const container = setUp();
        
        fetchMock.mockResponse(
          JSON.stringify({}), {status: 200}
        );
        
        await userEvent.type(getByQuerySelector(container, 'input'), 'valid@email.fr');
        await userEvent.click(screen.getByRole('button'));

        const invalidFeedback = container.querySelector('input[name=email] + .invalid-feedback');
        expect(invalidFeedback).toBeNull();
    })

    it('should redirect to login when enter valid data', async () => {
        const container = setUp();

        fetchMock.mockResponseOnce(
            JSON.stringify({}), {status: 200}
        );

        await userEvent.type(getByQuerySelector(container, 'input'), 'valid@email.fr');
        await userEvent.click(screen.getByRole('button'));

        await waitFor(() => {
            expect(screen.getByTestId('location-display')).toHaveTextContent(generateUrl('login'));
            expectApiRequestCalledWith(API_FORGOTTEN_PASSWORD, 'POST', {
              email: 'valid@email.fr',
              target: generateUrl('password_reset', {}, true)
            });
        }, {timeout: 5000, interval: 1000});
    })

    it('should display alert danger when back validation fails', async () => {
        const container = setUp();

        fetchMock.mockResponseOnce(
            JSON.stringify({message: 'assert.unknown_email'}),
            {status: 500}
        );

        await userEvent.type(getByQuerySelector(container, 'input'), 'valid@email.fr');
        await userEvent.click(screen.getByRole('button'));

        await waitFor(() => {
            expect(getByQuerySelector(container, '.alert.alert-danger')).toBeInTheDocument();
            expectApiRequestCalledWith(API_FORGOTTEN_PASSWORD, 'POST', {
              email: 'valid@email.fr',
              target: generateUrl('password_reset', {}, true)
            });
        }, {timeout: 5000, interval: 1000});
    })

    it('should redirect to login when enter valid email', async () => {
        const container = setUp();

        fetchMock.mockResponseOnce(
            JSON.stringify({}), {status: 200}
        );

        await userEvent.type(getByQuerySelector(container, 'input'), 'valid@email.fr');
        await userEvent.click(screen.getByRole('button'));

        await waitFor(() => {
            expect(screen.getByTestId('location-display')).toHaveTextContent(generateUrl('login'));
            expectApiRequestCalledWith(API_FORGOTTEN_PASSWORD, 'POST', {
              email: 'valid@email.fr',
              target: generateUrl('password_reset', {}, true)
            });
        }, {timeout: 5000, interval: 1000});
    })

    it('should call correct api endpoint', async () => {
        const container = setUp();

        fetchMock.mockResponseOnce(
            JSON.stringify({}), {status: 200}
        );

        await userEvent.type(getByQuerySelector(container, 'input'), 'valid@email.fr');
        await userEvent.click(screen.getByRole('button'));

        await waitFor(() => {
          expectApiRequestCalledWith(API_FORGOTTEN_PASSWORD, 'POST', {
            email: 'valid@email.fr',
            target: generateUrl('password_reset', {}, true)
          });
        }, {timeout: 5000, interval: 1000});
    })
})
