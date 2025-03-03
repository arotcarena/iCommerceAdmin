import { PropsWithChildren, createContext, useContext } from "react";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Alerts } from "UI/Alert/Alerts";
import { AppConfig } from "config/AppConfig";

export type AppAlert = {
    id: string,
    color: string,
    message: TrustedHTML|string
};

type AlertUtils = {
    createAlert: ((color: string, message: TrustedHTML|string, timeout?: number|false) => void),
    removeAlert: (id: string) => void,
    resetAlerts: () => void
}

type ContextType = {
    current: AlertUtils|null
};

const AlertContext = createContext<ContextType|null>(null);


export const AlertContextProvider = ({children}: PropsWithChildren) => {
    return (
        <AlertContext.Provider value={{current: null}}>
            <AlertsWrapper />
            {children}
        </AlertContext.Provider>
    )
}

export const useAlertContext = (): ContextType => {
    const context = useContext(AlertContext);
    if(!context) {
        throw new Error('To use alert context, your component must be wrapped by <AlertContextProvider>');
    }
    return context;
}


export const useAlert = (): AlertUtils => {
    const context = useAlertContext();
    if(!context.current) {
        throw new Error('Alert Context is not loaded. Alert component must load Alert Context with functions createAlert and removeAlert.');
    }
    return {
        createAlert: context.current.createAlert,
        removeAlert: context.current.removeAlert,
        resetAlerts: context.current.resetAlerts
    };
}


const AlertsWrapper = () => {

    const [alerts, setAlerts] = useState<AppAlert[]>([]);

    const createAlert = (
        color: string,
        message: TrustedHTML|string,
        timeout: number|false = AppConfig.ALERT_DURATION,
    ): void => {
        const id = uuidv4();
        setAlerts(alerts => {
            return [
                // if same alert already exists, remove it
                ...alerts.filter((alert: AppAlert) => alert.color !== color || alert.message !== message),
                { id, color, message }
            ];
        });
        if(typeof timeout === 'number') {
            setTimeout(() => {
                removeAlert(id);
            }, timeout);
        }
    };

    const removeAlert = (id: string): void => {
        setAlerts(alerts => alerts.filter(alert => alert.id !== id));
    };

    const resetAlerts = (): void => {
        setAlerts([]);
    }

    const alertContext = useAlertContext();
    alertContext.current = {
        createAlert, removeAlert, resetAlerts
    };

    return (
        <Alerts alerts={alerts} removeAlert={removeAlert} />
    )
}