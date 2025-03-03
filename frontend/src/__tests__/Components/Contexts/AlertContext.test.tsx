import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { AlertContextProvider, useAlert } from "Components/Contexts/AlertContext"
import { MouseEvent } from "react";


const TestAlertComponent = ({color, message}: {color: string, message: string}) => {

    const {createAlert} = useAlert();

    const handleClick = (e: MouseEvent) => {
        e.preventDefault();
        createAlert(color, message);
    }

    return <button onClick={handleClick}>create alert</button>;
}

describe('AlertContext', () => {
    
    const setUp = (color: string, message: string): HTMLElement => {
        const {container} = render(
            <AlertContextProvider>
                <TestAlertComponent color={color} message={message} />
            </AlertContextProvider>
        );
        return container;
    } 

    it('should create danger alert', async () => {
        const container = setUp('danger', 'There is a danger');
        await userEvent.click(screen.getByText('create alert'));

        expect(screen.getByText('There is a danger')).toBeInTheDocument();
        const alert = screen.getByRole('alert');
        expect(alert.classList).toContain('alert-danger');
    })

    it('should create success alert', async () => {
        const container = setUp('success', 'There is a success alert');
        await userEvent.click(screen.getByText('create alert'));

        expect(screen.getByText('There is a success alert')).toBeInTheDocument();
        const alert = screen.getByRole('alert');
        expect(alert.classList).toContain('alert-success');
    })

    it('should remove alert when click on close', async () => {
        const container = setUp('success', 'There is a success alert');
        await userEvent.click(screen.getByText('create alert'));
        
        expect(screen.getByText('There is a success alert')).toBeInTheDocument();

        const button = container.querySelector('.btn-close');
        if(!button) throw new Error('no close button');
        await userEvent.click(button);

        expect(screen.queryByText('There is a success alert')).toBeNull();
    })
})