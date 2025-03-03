import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { SuperCrudProvider } from "Components/Contexts/SuperCrudContext"
import { CrudForm } from "UI/SuperCrud/CrudForm"
import { resetStoredFormData } from "functions/storage/form/formDataStorage"
import { fakeThreeColumns } from "testUtils/fakeData/columns/fakeColumns"
import { fakeUser } from "testUtils/fakeData/entities/fakeUser"
import { getByQuerySelector } from "testUtils/helpers/domHelpers"
import { renderIntegrated } from "testUtils/renderIntegrated"
import { Item } from "type/searchTypes"

describe('CrudForm', () => {
    afterEach(() => {
        resetStoredFormData('Test');
    });

    const mutationFn = jest.fn((formData: any) => new Promise((res, rej) => res('')));

    const setUp = (item?: Item): HTMLElement => {
        const {container} = renderIntegrated(
            (
                <SuperCrudProvider
                    title={'title'}
                    items={[]}
                    isLoading={false}
                    columns={fakeThreeColumns}
                    basePath="/"
                    writeEndpoint="/"
                    showEndpoint="/"
                    entity="Test"
                    forceFetch={() => {}}
                    hasLineCreate={false}
                    globalContext={{
                      isEditable: true,
                      isDeletable: true,
                      labelProperty: 'id'
                    }}
                    >
                    <CrudForm 
                        item={item}
                        mutationFn={mutationFn}
                        handleSubmitSuccess={() => {}}
                        onClose={() => {}}
                        columns={fakeThreeColumns}
                    />
                </SuperCrudProvider>
            ),
            ['/'],
            'en'
        );

        return container;
    }

    it('should display fields with column.isEditable false as disabled fields', () => {
        const container = setUp(fakeUser);

        expect(getByQuerySelector(container, 'input[name=email]')?.getAttribute('disabled')).toBeNull();
        expect(getByQuerySelector(container, 'input[name=firstName]')?.getAttribute('disabled')).toBeNull();
        expect(getByQuerySelector(container, 'input[name=lastName]')?.getAttribute('disabled')).toEqual('');
    })

    it('should be empty if no item is passed', () => {
        const container = setUp();

        container.querySelectorAll('input').forEach(input => {
            expect(input.value).toEqual('');
        })
    })

    it('should be filled with item passed as param', () => {
        setUp(fakeUser);

        expect(screen.getByDisplayValue(fakeUser.email)).toBeInTheDocument();
        expect(screen.getByDisplayValue(fakeUser.firstName)).toBeInTheDocument();
    })

    it('should render correctly', () => {
        const container = setUp(fakeUser);
        expect(container).toMatchInlineSnapshot(`
<div>
  <div
    data-testid="location-display"
  >
    /
  </div>
  <div
    style="opacity: 1;"
  >
    <form>
      <div
        style="max-width: 550px;"
      >
        <div
          class="mt-4 mb-4"
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
            placeholder=""
            type="text"
            value="johnfake@mail.com"
          />
        </div>
      </div>
      <div
        style="max-width: 550px;"
      >
        <div
          class="mt-4 mb-4"
        >
          <label
            class="form-label form-label"
            for="firstName"
          >
            First Name
          </label>
          <input
            aria-invalid="false"
            class="form-control form-control"
            name="firstName"
            placeholder=""
            type="text"
            value="John"
          />
        </div>
      </div>
      <div
        style="max-width: 550px;"
      >
        <div
          class="mt-4 mb-4"
        >
          <label
            class="form-label form-label"
            for="lastName"
          >
            Last Name
          </label>
          <input
            aria-invalid="false"
            class="form-control form-control"
            disabled=""
            name="lastName"
            placeholder=""
            type="text"
            value="Fake"
          />
        </div>
      </div>
      <div
        class="d-flex gap-1 flex-wrap form-submit-group"
      >
        <button
          class="btn btn-light"
          type="button"
        >
          Cancel
        </button>
        <button
          class="btn btn-success btn btn-success"
          data-testid="submit_button"
          type="submit"
        >
          <span>
            Submit
          </span>
        </button>
      </div>
    </form>
  </div>
</div>
`);
    })

    it('should display invalid-feedback when required field is blank', async () => {
        const container = setUp();
        await submitForm('', 'firstName', container);
        expect(getByQuerySelector(container, 'input[name=email] + .invalid-feedback')).toBeInTheDocument();
    })

    it('should display invalid-feedback when invalid email', async () => {
        const container = setUp();
        await submitForm('invalidemail.com', 'firstName', container);
        expect(getByQuerySelector(container, 'input[name=email] + .invalid-feedback')).toBeInTheDocument();
    })

    it('should display invalid-feedback when field is too long', async () => {
        const container = setUp();
        await submitForm('email@email.fr', 'firstNameLongerThan10Characters', container);
        expect(getByQuerySelector(container, 'input[name=firstName] + .invalid-feedback')).toBeInTheDocument();
    })

    it('should display invalid-feedback when field is too short', async () => {
        const container = setUp();
        await submitForm('email@email.fr', 'f', container);
        expect(getByQuerySelector(container, 'input[name=firstName] + .invalid-feedback')).toBeInTheDocument();
    })

    it('should call mutationFn with correct param when submitted', async () => {
        setUp(fakeUser);
        await userEvent.click(screen.getByTestId('submit_button'));
        expect(mutationFn).toHaveBeenCalledWith(fakeUser);
    })

    const submitForm = async (
        email: string,
        firstName: string,
        container: HTMLElement
    ): Promise<void> => {
        const emailField = getByQuerySelector(container, 'input[name=email]');
        const firstNameField = getByQuerySelector(container, 'input[name=firstName]');

        await userEvent.clear(emailField);
        await userEvent.clear(firstNameField);
        if(email) {
            await userEvent.type(emailField, email);
        }
        if(firstName) {
            await userEvent.type(firstNameField, firstName);
        }

        await userEvent.click(screen.getByTestId('submit_button'));
    }
})