import { ReactNode } from "react";

type Props = {
    message: ReactNode,
};
  
const BasicLineInfoCard = ({
    message,
    icon,
    additionalClass,
}: Props & {icon: string, additionalClass?: string}) => {

    return (
        <button type="button" style={{cursor: 'default'}} className={'line-alert me-2 mb-0' + (additionalClass ? ' ' + additionalClass: '')}>
            <>
                <i className={icon}></i>{' '}
                {message}
            </>
        </button>
    );
}



export const LineInfoCard = ({
    message,
}: Props) => {
    return (
        <BasicLineInfoCard
            icon="ri-information-line"
            message={message}
            additionalClass="alert alert-light text-dark"
        />
    );
}

export const LineAlertCard = ({
    message,
}: Props) => {
    return (
        <BasicLineInfoCard
            icon="ri-alert-line ri-xl"
            message={message}
            additionalClass="alert alert-danger"
        />
    );
}
