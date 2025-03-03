import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useFormik } from "formik";
import { createFieldValidationSchema } from "functions/form/validation/schemaConstructor";
import { useState } from "react";
import { ValidationConstraints } from "type/superCrudTypes";
import * as Yup from 'yup';

type Props = {
    data: any, 
    type: string, 
    validationConstraints?: ValidationConstraints
}

const TestElement = ({data, type, validationConstraints}: Props) => {
    const [isSuccess, setSuccess] = useState(false);
    const validation = useFormik({
        initialValues: {
          data
        },
        validationSchema: Yup.object({
            data: createFieldValidationSchema(type, validationConstraints)
        }),
        onSubmit: values => {
            setSuccess(true);
        },
      });
      
    return (
        <form onSubmit={validation.handleSubmit}>
            {
                isSuccess && <div>Success</div>
            }
            <input 
                type="text"
                name="data"
                value={validation.values.data}
                onChange={validation.handleChange}
            />

            {
                validation.errors.data && <div>Error</div>
            }
            <button type="submit">Submit</button>
        </form>
    );
}


describe('schemaConstructor', () => {
    const setUp = (
        data: any, 
        type: string, 
        validationConstraints?: ValidationConstraints

    ): HTMLElement => {
        const {container} = render(
            <TestElement data={data} type={type} validationConstraints={validationConstraints} />
        )
        
        return container;    
    };

    it('should stop invalid email', async () => {
        setUp('invalidemail.fr', 'email');

        await userEvent.click(screen.getByText('Submit'));

        expect(screen.getByText('Error')).toBeInTheDocument();
        expect(screen.queryByText('Success')).toBeNull();
    })

    it('should stop required field if blank', async () => {
        setUp('', 'text', {required: true});

        await userEvent.click(screen.getByText('Submit'));

        expect(screen.getByText('Error')).toBeInTheDocument();
        expect(screen.queryByText('Success')).toBeNull();
    })

    it('should accept required field if not blank', async () => {
        setUp('a', 'text', {required: true});

        await userEvent.click(screen.getByText('Submit'));

        expect(screen.getByText('Success')).toBeInTheDocument();
        expect(screen.queryByText('Error')).toBeNull();
    })

    it('should stop field with less than min characters', async () => {
        setUp('a', 'text', {min: 2});

        await userEvent.click(screen.getByText('Submit'));

        expect(screen.getByText('Error')).toBeInTheDocument();
        expect(screen.queryByText('Success')).toBeNull();
    })

    it('should stop field with more than max characters', async () => {
        setUp('0123456789789', 'text', {max: 10});

        await userEvent.click(screen.getByText('Submit'));

        expect(screen.getByText('Error')).toBeInTheDocument();
        expect(screen.queryByText('Success')).toBeNull();
    })

    it('should accept field with correct characters number', async () => {
        setUp('0123456', 'text', {max: 10, min: 2});

        await userEvent.click(screen.getByText('Submit'));

        expect(screen.getByText('Success')).toBeInTheDocument();
        expect(screen.queryByText('Error')).toBeNull();
    })

    it('should stop invalid password without lowercase', async () => {
        setUp('PASSWORD1234!', 'password');

        await userEvent.click(screen.getByText('Submit'));

        expect(screen.getByText('Error')).toBeInTheDocument();
        expect(screen.queryByText('Success')).toBeNull();
    })

    it('should stop invalid password without uppercase', async () => {
        setUp('password1234!', 'password');

        await userEvent.click(screen.getByText('Submit'));

        expect(screen.getByText('Error')).toBeInTheDocument();
        expect(screen.queryByText('Success')).toBeNull();
    })

    it('should stop invalid password without special character', async () => {
        setUp('Password123456', 'password');

        await userEvent.click(screen.getByText('Submit'));

        expect(screen.getByText('Error')).toBeInTheDocument();
        expect(screen.queryByText('Success')).toBeNull();
    })

    it('should stop invalid password without min characters', async () => {
        setUp('Pass1!', 'password');

        await userEvent.click(screen.getByText('Submit'));

        expect(screen.getByText('Error')).toBeInTheDocument();
        expect(screen.queryByText('Success')).toBeNull();
    })

    it('should accept valid password', async () => {
        setUp('Password1234!', 'password');

        await userEvent.click(screen.getByText('Submit'));

        expect(screen.getByText('Success')).toBeInTheDocument();
        expect(screen.queryByText('Error')).toBeNull();
    })
})