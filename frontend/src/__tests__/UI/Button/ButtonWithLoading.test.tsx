import { render, screen } from "@testing-library/react"
import { ButtonWithLoading } from "UI/Button/ButtonWithLoading"

describe('ButtonWithLoading', () => {
    it('should display Loader when loading', () => {
        render(
            <ButtonWithLoading
                color="primary"
                isLoading={true}
            />
        );
        expect(screen.getByText('loading...')).toBeInTheDocument();
    })
})