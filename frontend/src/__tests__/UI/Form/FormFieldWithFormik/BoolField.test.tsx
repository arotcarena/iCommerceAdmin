import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { BoolField } from "UI/Form/FormFieldWithFormik/BoolField"
import { useFormik } from "formik"
import * as Yup from 'yup';

type TestWrapperProps = {
    validationSchema: any,
    initialValue?: boolean
};

const TestWrapper = ({
    validationSchema,
    initialValue = false,
}: TestWrapperProps) => {

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            test: initialValue
        },
        validationSchema: Yup.object({
            test: validationSchema
        }),
        onSubmit: (formData: object) => {}
    });

    return (
        <form onSubmit={validation.handleSubmit}>
            <BoolField 
                name="test"
                validation={validation}
            />
            <button type="submit" data-testid="button">Submit</button>
        </form>
    )
}

describe('BoolField', () => {
    const setUp = (
        validationSchema: any,
        initialValue: boolean = false,
    ): HTMLElement => {

        const {container} = render(
            <TestWrapper 
                validationSchema={validationSchema}
                initialValue={initialValue}
            />
        );
        return container;
    }

    it('should display invalid feedback when not checked while check is required', async () => {
        const validationSchema = Yup.bool().isTrue();
        const container = setUp(validationSchema, false);
        await userEvent.click(screen.getByTestId('button'));

        expect(container.querySelector('.invalid-feedback')).not.toBeNull();
    })

    it('should display invalid feedback when checked while no check is required', async () => {
        const validationSchema = Yup.bool().isFalse();
        const container = setUp(validationSchema, true);
        await userEvent.click(screen.getByTestId('button'));

        expect(container.querySelector('.invalid-feedback')).not.toBeNull();
    })

    it('should not display invalid feedback when not checked and check is not required', async () => {
        const validationSchema = Yup.bool();
        const container = setUp(validationSchema, false);
        await userEvent.click(screen.getByTestId('button'));

        expect(container.querySelector('.invalid-feedback')).toBeNull();
    })

    it('should not display invalid feedback when checked and check is required', async () => {
        const validationSchema = Yup.bool().isTrue();
        const container = setUp(validationSchema, true);
        await userEvent.click(screen.getByTestId('button'));

        expect(container.querySelector('.invalid-feedback')).toBeNull();
    })
})
