import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { API_RESET_PASSWORD } from "Routes/apiRoutes";
import { generateUrl } from "functions/router/urlGenerator";
import { t } from "i18next";
import PasswordReset from "pages/Authentication/PasswordReset";
import { getByQuerySelector } from "testUtils/helpers/domHelpers";
import { expectApiRequestCalledWith } from "testUtils/helpers/fetchMockHelpers";
import { renderIntegrated } from "testUtils/renderIntegrated";

describe('PasswordReset', () => {
    const setUp = (hasToken: boolean = true): HTMLElement => {
        const {container} = renderIntegrated(<PasswordReset />, ['/auth/password-reset' + (hasToken ? '?token=test_token': '')], 'en');

        return container;
    };

    it('should throw error when no token', () => {
        expect(() => setUp(false)).toThrow(t('error.invalidSecurityLink', {lng: 'en'}));
    })

    it('should render correctly', () => {
        const container = setUp();

        expect(container).toMatchInlineSnapshot(`
<div>
  <div
    data-testid="location-display"
  >
    /auth/password-reset
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
                    Create new Password
                  </h5>
                </div>
                <div
                  class="p-2"
                >
                  <form
                    action="/auth-signin-basic"
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
                          for="newPassword"
                        >
                          Password
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
                              info="Must be at least 8 characters"
                              name="newPassword"
                              placeholder="Enter password"
                              type="password"
                              value=""
                            />
                          </div>
                          <button
                            class="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted btn-password-show"
                            id="newPassword-addon"
                            type="button"
                          >
                            <i
                              class="ri-eye-fill align-middle"
                            />
                          </button>
                        </div>
                        <div
                          class="form-text"
                          id="newPassword-input"
                        >
                          Must be at least 8 characters
                        </div>
                      </div>
                    </div>
                    <div
                      class="mb-3"
                    >
                      <div
                        class=""
                      >
                        <label
                          class="form-label form-label"
                          for="confirmPassword"
                        >
                          Confirm password
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
                              name="confirmPassword"
                              placeholder="Confirm password"
                              type="password"
                              value=""
                            />
                          </div>
                          <button
                            class="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted btn-password-show"
                            id="confirmPassword-addon"
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
                          Reset password
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

    it('should display invalid-feedback when front validation blank password', async () => {
        const container = setUp();
        
        await submitForm({
            confirm_password: 'otherpassword1A'
        }, container);

        expect(getByQuerySelector(container, 'input[name=newPassword] + .invalid-feedback')).toBeInTheDocument();
    })

    it('should display invalid-feedback when front validation blank confirm_password', async () => {
        const container = setUp();
        
        await submitForm({
            password: 'mypassword1A'
        }, container);

        expect(getByQuerySelector(container, 'input[name=confirmPassword] + .invalid-feedback')).toBeInTheDocument();
    })

    it('should display invalid-feedback when front validation no uppercase letter on password', async () => {
        const container = setUp();
        
        await submitForm({
            password: 'mypassword1',
            confirm_password: 'mypassword1'
        }, container);

        expect(getByQuerySelector(container, 'input[name=newPassword] + .invalid-feedback')).toBeInTheDocument();
    })

    it('should display invalid-feedback when front validation no lowercase letter on password', async () => {
        const container = setUp();
        
        await submitForm({
            password: 'MYPASSWORD1',
            confirm_password: 'MYPASSWORD1'
        }, container);

        expect(getByQuerySelector(container, 'input[name=newPassword] + .invalid-feedback')).toBeInTheDocument();
    })

    it('should display invalid-feedback when front validation no number on password', async () => {
        const container = setUp();
        
        await submitForm({
            password: 'mypasswordA',
            confirm_password: 'mypasswordA'
        }, container);

        expect(getByQuerySelector(container, 'input[name=newPassword] + .invalid-feedback')).toBeInTheDocument();
    })

    it('should display invalid-feedback when front validation password less than 8 characters', async () => {
        const container = setUp();
        
        await submitForm({
            password: 'passwor',
            confirm_password: 'passwor'
        }, container);

        expect(getByQuerySelector(container, 'input[name=newPassword] + .invalid-feedback')).toBeInTheDocument();
    })

    it('should display invalid-feedback when front validation not same passwords', async () => {
        const container = setUp();
        
        await submitForm({
            password: 'mypassword1A',
            confirm_password: 'otherpassword1A'
        }, container);

        expect(getByQuerySelector(container, 'input[name=confirmPassword] + .invalid-feedback')).toBeInTheDocument();
    })

    // it('should not display invalid-feedback when valid fields', async () => {
    //     const container = setUp();

    //     fetchMock.mockResponse(
    //       JSON.stringify({}), {status: 200}
    //     );
        
    //     await submitForm({
    //         password: 'mypassword1A',
    //         confirm_password: 'mypassword1A'
    //     }, container);

    //     const invalidFeedback = container.querySelector('input + .invalid-feedback');
    //     expect(invalidFeedback).toBeNull();
    // })

    // it('should redirect to Profile page when enter valid data', async () => {
    //     const container = setUp();

    //     fetchMock.resetMocks();
    //     fetchMock.mockResponseOnce(
    //         JSON.stringify({}), {status: 200}
    //     );
        
    //     await submitForm({
    //         password: 'mypasswordA1',
    //         confirm_password: 'mypasswordA1'
    //     }, container);

    //     await waitFor(() => {
    //         expect(screen.getByTestId('location-display')).toHaveTextContent(generateUrl('profile'));
    //         expectApiRequestCalledWith(API_RESET_PASSWORD + '/test_token', 'POST', {
    //             newPassword: 'mypasswordA1',
    //             confirmPassword: 'mypasswordA1',
    //         });
    //     }, {timeout: 2000, interval: 1000});
    // })

    it('should display invalid-feedback and not redirect when back validation fails', async () => {
        const container = setUp();

        fetchMock.mockResponses(
          [JSON.stringify({errors: {violations: [{propertyPath: 'newPassword', title: 'assert.match_password'}]}}), {status: 422}]
        );

        await submitForm({
            password: 'mypasswordA11',
            confirm_password: 'mypasswordA1'
        }, container);

        await waitFor(() => {
            expect(getByQuerySelector(container, '.invalid-feedback')).toBeInTheDocument();
            expect(screen.getByTestId('location-display')).not.toHaveTextContent(generateUrl('profile'));
        }, {timeout: 2000, interval: 1000});
    })

    // it('should call correct api endpoint', async () => {
    //     const container = setUp();

    //     fetchMock.mockResponseOnce(
    //         JSON.stringify({}), {status: 200}
    //     );

    //     await submitForm({
    //         password: 'mypasswordA1',
    //         confirm_password: 'mypasswordA1'
    //     }, container);

    //     await waitFor(() => {
    //         expectApiRequestCalledWith(API_RESET_PASSWORD + '/test_token', 'POST', {
    //             newPassword: 'mypasswordA1',
    //             confirmPassword: 'mypasswordA1'
    //         });
    //     }, {timeout: 2000, interval: 1000});
    // })


    //helper
    const submitForm = async ({
        password, 
        confirm_password
    }: {
        password?: string,
        confirm_password?: string
    }, container: HTMLElement) => {
        if(password) {
            await userEvent.type(getByQuerySelector(container, 'input[name=newPassword]'), password);
        }
        if(confirm_password) {
            await userEvent.type(getByQuerySelector(container, 'input[name=confirmPassword]'), confirm_password);
        }
        await userEvent.click(screen.getByText(t('password_reset')));
    }
})
