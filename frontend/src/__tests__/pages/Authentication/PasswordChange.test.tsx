import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { API_CHANGE_PASSWORD } from "Routes/apiRoutes";
import { generateUrl } from "functions/router/urlGenerator";
import { t } from "i18next";
import PasswordChange from "pages/Authentication/PasswordChange";
import { getByQuerySelector } from "testUtils/helpers/domHelpers";
import { expectApiRequestCalledWith } from "testUtils/helpers/fetchMockHelpers";
import { renderIntegrated } from "testUtils/renderIntegrated";

describe('PasswordChange', () => {
    const setUp = (): HTMLElement => {
        const {container} = renderIntegrated(<PasswordChange />, ['/'], 'en');

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
  <div>
    <div
      class="ms-0 me-0 row"
    >
      <div
        class="col-12"
      >
        <div
          class="page-title-box d-sm-flex align-items-center justify-content-between"
          style="flex-direction: row-reverse;"
        >
          <h4
            class="mb-sm-0"
          >
            Change Password
          </h4>
          <div
            class="page-title-right"
          >
            <ol
              class="breadcrumb m-0"
            >
              <li
                class="breadcrumb-item"
              >
                <a
                  href="/"
                >
                  Dashboard
                </a>
              </li>
              <li
                class="breadcrumb-item"
              >
                <a
                  href="/profile"
                >
                  Profile
                </a>
              </li>
              <li
                class="breadcrumb-item active"
              >
                Change Password
              </li>
            </ol>
          </div>
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
                Change Password
              </h5>
              <p
                class="text-muted"
              >
                Your new password must be different from previous used password.
              </p>
            </div>
            <div
              class="p-2"
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
                      for="oldPassword"
                    >
                      Old password
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
                          name="oldPassword"
                          placeholder="Old password"
                          type="password"
                          value=""
                        />
                      </div>
                      <button
                        class="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted btn-password-show"
                        id="oldPassword-addon"
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
                    data-testid="submit_button"
                    type="submit"
                  >
                    <span>
                      Change Password
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
`);
    })

    it('should display invalid-feedback when front validation blank password', async () => {
        const container = setUp();
        
        await submitForm({
            oldPassword: 'oldpassword1A',
            confirmPassword: 'otherpassword1A'
        }, container);

        expect(getByQuerySelector(container, 'input[name=newPassword] + .invalid-feedback')).toBeInTheDocument();
    })

    it('should display invalid-feedback when front validation blank confirmPassword', async () => {
        const container = setUp();
        
        await submitForm({
            oldPassword: 'oldpassword1A',
            password: 'mypassword1A'
        }, container);

        expect(getByQuerySelector(container, 'input[name=confirmPassword] + .invalid-feedback')).toBeInTheDocument();
    })

    it('should display invalid-feedback when front validation no uppercase letter on password', async () => {
        const container = setUp();
        
        await submitForm({
            oldPassword: 'oldpasswordA1',
            password: 'mypassword1',
            confirmPassword: 'mypassword1'
        }, container);

        expect(getByQuerySelector(container, 'input[name=newPassword] + .invalid-feedback')).toBeInTheDocument();
    })

    it('should display invalid-feedback when front validation no lowercase letter on password', async () => {
        const container = setUp();
        
        await submitForm({
            oldPassword: 'oldpasswordA1',
            password: 'MYPASSWORD1',
            confirmPassword: 'MYPASSWORD1'
        }, container);

        expect(getByQuerySelector(container, 'input[name=newPassword] + .invalid-feedback')).toBeInTheDocument();
    })

    it('should display invalid-feedback when front validation no number on password', async () => {
        const container = setUp();
        
        await submitForm({
            oldPassword: 'oldpasswordA1',
            password: 'mypasswordA',
            confirmPassword: 'mypasswordA'
        }, container);

        expect(getByQuerySelector(container, 'input[name=newPassword] + .invalid-feedback')).toBeInTheDocument();
    })

    it('should display invalid-feedback when front validation password less than 8 characters', async () => {
        const container = setUp();
        
        await submitForm({
            oldPassword: 'oldpasswordA1',
            password: 'passwor',
            confirmPassword: 'passwor'
        }, container);

        expect(getByQuerySelector(container, 'input[name=newPassword] + .invalid-feedback')).toBeInTheDocument();
    })

    it('should display invalid-feedback when front validation not same passwords', async () => {
        const container = setUp();
        
        await submitForm({
            oldPassword: 'oldpassword1A',
            password: 'mypassword1A',
            confirmPassword: 'otherpassword1A'
        }, container);

        expect(getByQuerySelector(container, 'input[name=confirmPassword] + .invalid-feedback')).toBeInTheDocument();
    })

    it('should not display invalid-feedback when valid fields', async () => {
        const container = setUp();
        
        fetchMock.mockResponse(
          JSON.stringify({}), {status: 200}
        );

        await submitForm({
            oldPassword: 'oldpassword1A',
            password: 'mypassword1A',
            confirmPassword: 'mypassword1A'
        }, container);

        const invalidFeedback = container.querySelector('input + .invalid-feedback');
        expect(invalidFeedback).toBeNull();
    })

    it('should redirect to Profile page when enter valid data', async () => {
        const container = setUp();

        fetchMock.resetMocks();
        fetchMock.mockResponseOnce(
            JSON.stringify({}), {status: 200}
        );
        
        await submitForm({
            oldPassword: 'oldpasswordA1...',
            password: 'mypasswordA1!',
            confirmPassword: 'mypasswordA1!'
        }, container);

        await waitFor(() => {
            expect(screen.getByTestId('location-display')).toHaveTextContent(generateUrl('profile'));
            expectApiRequestCalledWith(API_CHANGE_PASSWORD, 'POST', {
                oldPassword: 'oldpasswordA1...',
                newPassword: 'mypasswordA1!',
                confirmPassword: 'mypasswordA1!'
            });
        }, {timeout: 2000, interval: 1000});
    })

    it('should display invalid-feedback and not redirect when back validation fails', async () => {
        const container = setUp();

        fetchMock.mockResponseOnce(
            JSON.stringify({errors: {violations: [{propertyPath: 'oldPassword', title: 'assert.valid_password'}]}}), {
              status: 422,
            }
        );

        await submitForm({
            oldPassword: 'oldpasswordA1',
            password: 'mypasswordA1',
            confirmPassword: 'mypasswordA1'
        }, container);

        await waitFor(() => {
            expect(getByQuerySelector(container, '.invalid-feedback')).toBeInTheDocument();
            expect(screen.getByTestId('location-display')).not.toHaveTextContent(generateUrl('profile'));
            expectApiRequestCalledWith(API_CHANGE_PASSWORD, 'POST', {
                oldPassword: 'oldpasswordA1',
                newPassword: 'mypasswordA1',
                confirmPassword: 'mypasswordA1'
            });
        }, {timeout: 2000, interval: 1000});
    })

    it('should call correct api endpoint', async () => {
        const container = setUp();

        fetchMock.mockResponseOnce(
            JSON.stringify({}), {status: 200}
        );

        await submitForm({
            oldPassword: 'oldpasswordA1',
            password: 'mypasswordA1',
            confirmPassword: 'mypasswordA1'
        }, container);

        await waitFor(() => {
            expectApiRequestCalledWith(API_CHANGE_PASSWORD, 'POST', {
                oldPassword: 'oldpasswordA1',
                newPassword: 'mypasswordA1',
                confirmPassword: 'mypasswordA1'
            });
        }, {timeout: 2000, interval: 1000});
    })


    //helper
    const submitForm = async ({
        oldPassword, 
        password, 
        confirmPassword
    }: {
        oldPassword?: string,
        password?: string,
        confirmPassword?: string
    }, container: HTMLElement) => {
        if(oldPassword) {
            await userEvent.type(getByQuerySelector(container, 'input[name=oldPassword]'), oldPassword);
        }
        if(password) {
            await userEvent.type(getByQuerySelector(container, 'input[name=newPassword]'), password);
        }
        if(confirmPassword) {
            await userEvent.type(getByQuerySelector(container, 'input[name=confirmPassword]'), confirmPassword);
        }
        await userEvent.click(screen.getByTestId(t('submit_button')));
    }
})
