import { AddressField, AddressModal } from "UI/Form/FormFieldWithFormik/SubForm/AddressField"
import { AddressForm } from "UI/Form/StandardForm/AddressForm"
import { useTranslation } from "react-i18next"
import { Modal, ModalBody } from "reactstrap"
import { AddressType } from "type/formTypes"

type Props = {
    validation: any,
    closeEdit: () => void,
    onSubmit: () => void,
    multiple: boolean,
    field: string
}

export const TabCellAddressField = ({
    validation,
    closeEdit, 
    onSubmit,
    multiple,
    field
}: Props) => {
    const {t} = useTranslation();

    if(multiple) {
        return (
            <div>Champ adresse multiple à faire</div>
        )
    }

    const handleSubmit = (formData: object) => {
        validation.setFieldValue('value', formData);
        onSubmit();
    }

    return (
        <AddressModal
            modalIsOpen={true}
            closeModal={closeEdit}
            address={validation.values.value}
            onSubmit={handleSubmit}
        >
            {t(field)}
        </AddressModal>
    )
}