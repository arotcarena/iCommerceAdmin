import React from 'react';
import { render, screen } from '@testing-library/react';
import { AlertCard } from 'UI/Alert/AlertCard';
import userEvent from '@testing-library/user-event';


describe('AlertCard', () => {
    const alert = {
        id: 'id1',
        message: 'Message',
        color: 'danger'
    };
    const handleClose = jest.fn();

    const setUp = (): HTMLElement => {
      const {container} = render(<AlertCard alert={alert} onClose={handleClose} />);
      return container;
    }

    it('should display message', () => {
        setUp();
        const messageElement = screen.getByText('Message');
        expect(messageElement).toBeInTheDocument();
    });

    it('should render correctly', () => {
        const container = setUp();
        expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="alert-border-left alert alert-danger alert-dismissible fade"
    role="alert"
    style="display: flex; align-items: center;"
  >
    <button
      aria-label="Close"
      class="btn-close"
      type="button"
    />
    <i
      class="ri-error-warning-line me-3 align-middle fs-16"
    />
    <span>
      <div>
        Message
      </div>
    </span>
  </div>
</div>
`
);
    })
});