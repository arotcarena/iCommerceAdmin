import { useTranslation } from "react-i18next";
import { Modal, ModalBody } from "reactstrap";
import { Notification } from "type/entityTypes";
import { DateDistanceShow } from "UI/Show/DateDistanceShow";

type Props = {
    notification: Notification,
    isOpen: boolean,
    close: () => void,
};

export const NotificationModal = ({
    notification,
    isOpen,
    close,
}: Props) => {
    const {t} = useTranslation();

    return (
        <Modal size="lg" isOpen={isOpen} toggle={close} centered={true}>
            <ModalBody className="py-3 px-5">
                <div className="mt-2 text-center">
                    <div className="py-2 fs-13 mx-4 mx-sm-5">
                        <h4>{notification.title}</h4>
                    </div>
                    <p>
                        {notification.description}
                    </p>
                    {
                        notification.createdAt && (
                            <p className="fs-11 fw-medium text-uppercase text-muted">
                                <span>
                                    <i className="mdi mdi-clock-outline"></i>{' '}
                                    <DateDistanceShow
                                        dateString={notification.createdAt} 
                                    />
                                </span>
                            </p>
                        )
                    }
                    <button
                        type="button"
                        className="btn w-sm btn-light"
                        data-bs-dismiss="modal"
                        onClick={close}
                    >
                        {t('close')}
                    </button>
                </div>
            </ModalBody>
        </Modal>
    )
}
