import { Card, Col, Row } from "reactstrap"
import { UploadedFile } from "type/formTypes"
import { DeleteModal } from "UI/Modal/DeleteModal"
import { useOpenState } from "functions/customHooks/state/useOpenState"
import { useTranslation } from "react-i18next"
import { getEntityAttachmentUrl } from "functions/files/entityAttachmentUrlResolver"

type Props = {
    uploadedFile: UploadedFile,
    onRemove: (file: UploadedFile) => void,
    disabled?: boolean
}

export const ImageCard = ({
    uploadedFile,
    onRemove,
    disabled = false
}: Props) => {
    const {t} = useTranslation();

    const handleRemove = async () => {
        await onRemove(uploadedFile);
        closeDeleteModal();
    };

    const [deleteModalIsOpen, openDeleteModal, closeDeleteModal] = useOpenState(false);

    return (
        <>
            <DeleteModal
                show={deleteModalIsOpen}
                onDeleteClick={handleRemove}
                onCloseClick={closeDeleteModal}
            >
                {t('confirm.file_removal', {filename: uploadedFile.name})}
            </DeleteModal>
            <Card
                className="mt-1 mb-0 pe-4 shadow-none border dz-processing dz-image-preview dz-success dz-complete position-relative image-card"
            >
                <div className="p-2">
                    <Row className="align-items-center">
                        <Col className="col-auto">
                            <img
                                data-dz-thumbnail=""
                                height="80"
                                className="avatar-sm rounded bg-light"
                                alt={uploadedFile.name}
                                src={getEntityAttachmentUrl(uploadedFile.id)}
                            />
                        </Col>
                        <Col className="pe-0 image-card-text">
                            <div className="text-muted font-weight-bold">
                                {uploadedFile.name}
                            </div>
                            <p className="mb-0">
                                <strong>
                                    {uploadedFile?.size || ''}
                                </strong>
                            </p>
                        </Col>
                        {
                            !disabled && (
                                <button type="button" style={{right: '0', top: '0', width: 'auto', padding: '5px 7px'}} className="btn btn-hover position-absolute" onClick={openDeleteModal}>
                                    <i className="ri-close-line ri-xl"></i>
                                </button>
                            )
                        }
                    </Row>
                </div>
            </Card>
        </>
    )
}