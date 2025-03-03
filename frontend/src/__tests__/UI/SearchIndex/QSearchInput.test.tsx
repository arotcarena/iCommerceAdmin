import { render, screen } from "@testing-library/react"
import { QSearchInput } from "UI/SearchIndex/QSearchInput"

describe('QSearchInput', () => {

    const setUp = (q: string): HTMLElement => {
        const {container} = render(
            <QSearchInput
                q={q}
                setFilterValue={() => {}}
            />
        );
        return container;
    }

    it('should not display close button when field is empty', () => {
        const container = setUp('');

        expect(container.querySelector('.ri-close-line')).toBeNull();
    })

    it('should display close button when field is filled', () => {
        const container = setUp('something');

        expect(container.querySelector('.ri-close-line')).toBeInTheDocument();
    })
})
