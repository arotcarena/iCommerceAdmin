import { TextField } from "UI/Form/FormFieldWithFormik/TextField";
import { FormSubmitGroup } from "UI/Form/Submit/FormSubmitGroup";
import { CrudFormField } from "UI/SuperCrud/CrudForm/CrudFormField";
import { useTranslation } from "react-i18next";
import { Col, Row } from "reactstrap";
import { TabColumn } from "type/superCrudTypes";

type Props = {
    validation: any,
    columns: TabColumn[],
    disabled: boolean,
    isPending?: boolean,
    onClose?: () => void,
};

export const AddressSubCrudForm = ({validation, columns, disabled, isPending, onClose}: Props) => {
    const {t} = useTranslation();

    return (
        <form onSubmit={validation.handleSubmit} style={{maxWidth: '850px'}}>
            <Row>
                <Col className="col-12 col-md-6 col-xl-3">
                    <CrudFormField
                        column={columns.find(col => col.name === 'type')}
                        validation={validation}
                        margin={4}
                        disabled={disabled}
                    />
                </Col>
            </Row>
            <Row>
                <Col className="col-12 col-lg-6">
                    <CrudFormField
                        column={columns.find(col => col.name === 'name')}
                        validation={validation}
                        margin={4}
                        disabled={disabled}
                    />
                </Col>
            </Row>

            <Row className="my-2 gap-5">
                <Col className="col-12 col-lg-6">
                    <CrudFormField
                        column={columns.find(col => col.name === 'firstLine')}
                        validation={validation}
                        margin={4}
                        disabled={disabled}
                    />
                    <CrudFormField
                        column={columns.find(col => col.name === 'secondLine')}
                        validation={validation}
                        margin={4}
                        disabled={disabled}
                    />
                    <CrudFormField
                        column={columns.find(col => col.name === 'thirdLine')}
                        validation={validation}
                        margin={4}
                        disabled={disabled}
                    />
                </Col>
                <Col className="col-12 col-lg-5">
                    <Col className="col-6 col-xl-5">
                        <CrudFormField
                            column={columns.find(col => col.name === 'zip')}
                            validation={validation}
                            margin={4}
                            disabled={disabled}
                        />
                    </Col>

                    <CrudFormField
                        column={columns.find(col => col.name === 'city')}
                        validation={validation}
                        margin={4}
                        disabled={disabled}
                    />

                    <CrudFormField
                        column={columns.find(col => col.name === 'country')}
                        validation={validation}
                        margin={4}
                        disabled={disabled}
                    />
                </Col>
            </Row>
            
            <Row className="gap-4">
                <Col className="col-12 col-lg-4">
                    <TextField
                        validation={validation}
                        name="phoneNumber"
                        margin={4}
                    >
                        <i className="ri ri-phone-line"></i>{' '}
                        {t('address_label.phoneNumber')}
                    </TextField>
                </Col>
                <Col className="col-12 col-lg-4">
                    <TextField
                        validation={validation}
                        name="mobileNumber"
                        margin={4}
                    >
                        <i className="ri ri-smartphone-line"></i>{' '}
                        {t('address_label.mobileNumber')}
                    </TextField>
                </Col>
            </Row>

            <CrudFormField
                column={columns.find(col => col.name === 'isDefault')}
                validation={validation}
                margin={4}
                disabled={disabled}
            />


            {
                !disabled && (
                    <FormSubmitGroup
                        onClose={onClose}
                        isPending={isPending}
                    />
                )
            }
        </form>
    )
}
