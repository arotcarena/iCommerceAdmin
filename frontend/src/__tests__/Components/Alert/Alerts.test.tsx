import { render, screen } from '@testing-library/react';
import { Alerts } from 'UI/Alert/Alerts';
import React from 'react';

describe('Alerts', () => {
    const alerts = [
        {
            id: 'id1',
            message: 'Message 1',
            color: 'danger'
        },
        {
            id: 'id2',
            message: 'Message 2',
            color: 'success'
        },
    ];

    const removeAlert = jest.fn();

    const setUp = (): HTMLElement => {
        const {container} = render(<Alerts alerts={alerts} removeAlert={removeAlert} />);
        return container;
    }

    it('should render all messages', () => {
        setUp();
        expect(screen.getByText('Message 1')).toBeInTheDocument();
        expect(screen.getByText('Message 2')).toBeInTheDocument();
    })

    it('should render correctly', () => {
        const container = setUp();
        expect(container).toMatchInlineSnapshot(`
<div>
  <div
    style="z-index: 10000; position: fixed; top: 10px; width: 600px; max-width: 100%; right: 0px; padding: 0px 10px;"
  >
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
          Message 1
        </div>
      </span>
    </div>
    <div
      class="alert-border-left alert alert-success alert-dismissible fade"
      role="alert"
      style="display: flex; align-items: center;"
    >
      <button
        aria-label="Close"
        class="btn-close"
        type="button"
      />
      <i
        class="ri-check-line me-3 align-middle fs-16"
      />
      <span>
        <div>
          Message 2
        </div>
      </span>
    </div>
  </div>
</div>
`);
    })
});