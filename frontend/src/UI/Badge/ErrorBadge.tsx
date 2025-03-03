import { PropsWithChildren } from "react"

export const ErrorBadge = ({
    children,
}: PropsWithChildren) => {
    return (
        <div style={{padding: '1px 4px', fontSize: '0.85em'}} className="alert alert-danger my-0">
            <i className="ri-error-warning-line"></i>{' '}
            {children}
        </div>
    )
};
