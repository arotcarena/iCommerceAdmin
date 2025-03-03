import { AppAlert } from "Components/Contexts/AlertContext";
import { AlertCard } from "./AlertCard";

type Props = {
    alerts: AppAlert[],
    removeAlert: (id: string) => void
};

export const Alerts = ({alerts, removeAlert}: Props) => {
    const wrapperStyle: Object = {zIndex: 10000, position: 'fixed', top: '10px', left: 'auto', width: '600px', maxWidth: '100%', right: '0', padding: '0 10px'};

    if(alerts.length < 1) {
        return;
    }
    return (
        <div style={wrapperStyle}>
            {
                alerts.map(alert => (
                    <AlertCard alert={alert} key={alert.id} onClose={removeAlert} />
                ))
            }
        </div>
    )
}

