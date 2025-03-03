import { ReactNode } from "react"
import { useTranslation } from "react-i18next"
import { Modal, ModalBody } from "reactstrap"

type Props = {
    close: () => void,
    onSubmit: (formData: any) => void,
    title?: string
    formField: ReactNode,
    hasSubmitControls?: boolean
}

export const ModalField = ({
    close,
    onSubmit,
    title,
    formField,
    hasSubmitControls = true,
}: Props) => {
    const {t} = useTranslation();

    return (
        <Modal isOpen={true} toggle={close} centered={true}>
            <ModalBody className="py-3 px-5">
                <form className="mt-2 mb-2" onSubmit={onSubmit}>
                    {
                        title && <h3 className="text-center mt-2">{title}</h3>
                    }
                    {
                        formField
                    }
                    {
                        hasSubmitControls && (
                            <div className="d-flex gap-2 justify-content-center">
                                <button
                                    type="button"
                                    className="btn w-sm btn-light"
                                    data-bs-dismiss="modal"
                                    onClick={close}
                                >
                                    {t('cancel')}
                                </button>
                                <button
                                    type="submit"
                                    className="btn w-sm btn-success"
                                >
                                    {t('submit')}
                                </button>
                            </div>
                        )
                    }
                </form>
            </ModalBody>
        </Modal>
    )
}