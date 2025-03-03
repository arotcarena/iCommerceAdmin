import { render, screen } from "@testing-library/react"
import { DeleteModal } from "UI/Modal/DeleteModal"


describe('DeleteModal', () => {

    const setUp = (
        show: boolean = false,
    ): HTMLElement => {
        const {container} = render(
            <DeleteModal
                show={show}
                onDeleteClick={() => {}}
                onCloseClick={() => {}}
                item={{id: 5, label: 'Label'}}
            />
        );
        return container;
    }

    it('should display confirm button', () => {
        const container = setUp(true);
        expect(screen.getByText('confirm.delete')).toBeInTheDocument();
    })

    it('should display cancel button', () => {
        const container = setUp(true);
        expect(screen.getByText('close')).toBeInTheDocument();
    })
})
