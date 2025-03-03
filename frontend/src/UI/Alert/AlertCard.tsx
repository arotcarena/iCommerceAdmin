import { AppAlert } from "Components/Contexts/AlertContext";
import { MouseEvent } from "react";
import { UncontrolledAlert } from "reactstrap";


export const AlertCard = ({
    alert,
    onClose
}: {
    alert: AppAlert, 
    onClose: (id: string) => void
}) => {

    const handleClick = (e: MouseEvent) => {
        const eventTarget = e.target;
        if(eventTarget instanceof Element && eventTarget.classList.contains('btn-close')) {
            onClose(alert.id);
        }
    }
    
    const htmlContent: ({__html: string|TrustedHTML}) | null = alert.message ? {__html: alert.message}: null;

    let color = alert.color;
    if(color === 'info') {
        color = 'secondary';
    }

    return (
        <UncontrolledAlert onClick={handleClick} color={color} className="alert-border-left" style={{display: 'flex', alignItems: 'center'}}>
            <AlertIcon color={alert.color} />
            <span>
                {
                    htmlContent && (
                        <div dangerouslySetInnerHTML={htmlContent}>
                        </div>
                    )
                }
            </span>
        </UncontrolledAlert>
    )
}

const AlertIcon = ({color}: {color: string}) => {
    switch(color) {
        case 'primary':
            return <i className="ri-user-smile-line me-3 align-middle fs-16"></i>
        case 'success':
            return <i className="ri-check-line me-3 align-middle fs-16"></i>
        case 'danger':
            return <i className="ri-error-warning-line me-3 align-middle fs-16"></i>
        case 'warning':
            return <i className="ri-alert-line me-3 align-middle fs-16"></i>
        case 'info':
            return <i className="ri-information-line me-3 align-middle fs-16"></i>;
        default:
            return;
    }
}
