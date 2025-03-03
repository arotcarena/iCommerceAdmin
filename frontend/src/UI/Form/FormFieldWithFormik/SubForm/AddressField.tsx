import { MouseEvent, PropsWithChildren } from "react";
import { AddressForm } from "../../StandardForm/AddressForm";
import { useOpenState } from "functions/customHooks/state/useOpenState";
import { FormFeedback, Label, Modal, ModalBody } from "reactstrap";
import { AddressCard } from "UI/Card/AddressCard";
import { useTranslation } from "react-i18next";


type Props = PropsWithChildren<{
    validation: any,
    name: string,
    margin?: number,
    disabled?: boolean,
    onChange?: () => void,
    hasInputLabel?: boolean,
    canDelete?: boolean,
    suggestedAddressesFilters?: {[key: string]: any},
}>;

export const AddressField = ({
    validation,
    name,
    margin,
    children,
    disabled = false,
    onChange,
    hasInputLabel = true,
    canDelete = true,
    suggestedAddressesFilters,
}: Props) => {
    const {t} = useTranslation();
    const [formIsOpen, openForm, closeForm] = useOpenState(false);

    const handleSubmit = async (formData: any) => {
        validation.setFieldValue(name, formData);
        closeForm();

        if(onChange) {
            onChange();
        }
    }

    const handleRemove = (e: MouseEvent) => {
        e.preventDefault();
        validation.setFieldValue(name, null);
    }

    return (
        <div className={margin ? 'mt-'+margin+' mb-'+margin+'': ''}>
            {
                hasInputLabel && <Label>{children}</Label>
            }
            {
                validation.values[name] && (
                    <div 
                        className={'small-card position-relative' + (disabled ? ' disabled': '')} 
                        style={{paddingRight: '70px', maxWidth: '350px'}}
                    >
                        <AddressCard 
                            address={validation.values[name]}
                            className={'mt-1 mb-1'}
                        />
                        {
                            !formIsOpen && !disabled && (
                                <div style={{position: 'absolute', top: '8px', bottom: '8px', right: '8px', display: 'flex', 
                                            flexDirection: 'column',  justifyContent: 'space-between', gap: '5px'}}>
                                    <button className="btn btn-outline-light" onClick={openForm} type="button">
                                        <i className="ri-edit-fill ri-xl text-secondary"></i>
                                    </button>
                                    {
                                        canDelete && (
                                            <button className="btn btn-outline-light" onClick={handleRemove} type="button">
                                                <i className="ri-delete-bin-5-fill ri-xl text-secondary"></i>
                                            </button>
                                        )
                                    }
                                </div>
                            )
                        }
                    </div>
                )
            }
            {
                validation.touched[name] && validation.errors[name] && (
                    <>
                        <div className="is-invalid"></div>
                        <FormFeedback type="invalid">{validation.errors[name]}</FormFeedback>
                    </>
                )
            }
            {
                !validation.values[name] && !disabled && (
                    <div className="mt-2">
                        <button className="btn btn-success address-add-button" type="button" onClick={openForm}>
                            <i className="ri-add-fill ri-xl"></i>{' '}
                            {t('add')}
                        </button>
                    </div>
                )
            }

            {
                formIsOpen && !disabled && (
                    <AddressModal 
                        modalIsOpen={formIsOpen}
                        closeModal={closeForm}
                        address={validation.values[name]}
                        onSubmit={handleSubmit}
                        suggestedAddressesFilters={suggestedAddressesFilters}
                    >
                        {children}
                    </AddressModal>
                )
            }
        </div>
    )
}

type AddressModalProps = PropsWithChildren<{
    modalIsOpen: boolean,
    address: any,
    closeModal: () => void,
    onSubmit: (formData: object) => void,
    suggestedAddressesFilters?: {[key: string]: any},
}>;

export const AddressModal = ({
    modalIsOpen,
    address,
    closeModal,
    onSubmit,
    suggestedAddressesFilters,
    children
}: AddressModalProps) => {
    const {t} = useTranslation();

    return (
        <Modal size="lg" isOpen={modalIsOpen} toggle={closeModal} centered={true}>
            <ModalBody className="py-3 px-5">
                <h3 className="text-center" style={{marginBottom: '-10px'}}>{children}</h3>
                <AddressForm
                    address={address}
                    onSubmit={onSubmit}
                    button={(
                        <div style={{marginBottom: '-30px', marginTop: '40px'}} className="d-flex gap-2 justify-content-center">
                            <button
                                type="button"
                                className="btn w-sm btn-light"
                                data-bs-dismiss="modal"
                                onClick={closeModal}
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
                    )}
                    suggestedAddressesFilters={suggestedAddressesFilters}
                />
            </ModalBody>
        </Modal>
    )
}
