import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TextField } from "UI/Form/FormFieldWithFormik/TextField";
import { useFormValidation } from "functions/customHooks/form/useFormValidation"
import { renderIntegrated } from "testUtils/renderIntegrated";
import { TabColumn, TabItemType } from "type/superCrudTypes";

type TestComponentProps = {
    columns: TabColumn[],
    name: string,
    mutationFn: (formData: any) => Promise<any>,
    handleSubmitSuccess: () => void,
    item?: TabItemType
}

const TestComponent = ({
    columns,
    name,
    mutationFn, 
    handleSubmitSuccess,
    item
}: TestComponentProps) => {
    const {isPending, validation} = useFormValidation(columns, mutationFn, handleSubmitSuccess, item);

    return (
        <>
            {
                isPending && <div>Loading...</div>
            }
            <form onSubmit={validation.handleSubmit}>
                <TextField
                    name={name}
                    validation={validation}
                >
                    test
                </TextField>
                <button type="submit" data-testid="submit">Submit</button>
            </form>
        </>
    )
}


describe('useFormValidation', () => {
    const setUp = (
        columns: TabColumn[],
        name: string,
        item?: TabItemType,
        mutationFn?: (formData: any) => Promise<any>,
        handleSubmitSuccess?: () => void
    ): HTMLElement => {

        const {container} = renderIntegrated(
                <TestComponent
                    mutationFn={mutationFn || jest.fn()}
                    handleSubmitSuccess={handleSubmitSuccess || jest.fn()}
                    columns={columns}
                    name={name}
                    item={item}
                />
        );
        return container;
    }

    it('should display default item', () => {
        setUp(
            [{name: 'field', type: 'text', isVisible: true}],
            'field',
            {id: 4, field: 'test_value'}
        );

        expect(screen.getByDisplayValue('test_value')).toBeInTheDocument();
    })

    it('should display invalid feedback when constraint passed by TabColumn is not respected', async () => {
        const container = setUp(
            [{name: 'field', type: 'text', constraints: {required: true}, isVisible: true}],
            'field'
        );

        await userEvent.click(screen.getByTestId('submit'));

        expect(container.querySelector('.invalid-feedback')).not.toBeNull();
    })

    it('should not display invalid feedback when constraint passed by TabColumn is respected', async () => {
        const container = setUp(
            [{name: 'field', type: 'text', constraints: {required: true}, isVisible: true}],
            'field',
            {id: 1, field: 'some value'}
        );

        await userEvent.click(screen.getByTestId('submit'));

        expect(container.querySelector('.invalid-feedback')).toBeNull();
    })

    it('should call mutation function with correct formData when submit a valid data', async () => {
        const mutationFn = jest.fn();
        const container = setUp(
            [{name: 'field', type: 'text', constraints: {required: true}, isVisible: true}],
            'field',
            {id: 1, field: 'some value'},
            mutationFn
        );
        
        await userEvent.click(screen.getByTestId('submit'));
        
        expect(mutationFn).toHaveBeenCalledWith({id: 1, field: 'some value'});
    })

    it('should call handleSubmitSuccess function when mutation success', async () => {
        const handleSubmitSuccess = jest.fn(); 
        const container = setUp(
            [{name: 'field', type: 'text', constraints: {required: true}, isVisible: true}],
            'field',
            {id: 1, field: 'some value'},
            undefined,
            handleSubmitSuccess
        );

        fetchMock.mockResponse(
            JSON.stringify({}), {status: 200}
        );
        
        await userEvent.click(screen.getByTestId('submit'));
        
        expect(handleSubmitSuccess).toHaveBeenCalled();
    })
})
