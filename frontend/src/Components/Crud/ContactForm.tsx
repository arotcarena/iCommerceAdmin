import { FormSubmitGroup } from "UI/Form/Submit/FormSubmitGroup";
import { CrudFormField } from "UI/SuperCrud/CrudForm/CrudFormField";
import { Col, Row } from "reactstrap";
import { TabColumn } from "type/superCrudTypes";

type Props = {
    validation: any,
    columns: TabColumn[],
    disabled: boolean,
    isPending?: boolean,
    onClose?: () => void,
};

export const ContactForm = ({
    validation, 
    columns, 
    disabled, 
    isPending, 
    onClose, 
}: Props) => {

    return (
        <form onSubmit={validation.handleSubmit} style={{maxWidth: '850px'}}>
            <Row className="mb-4">
                <Col className="col-12 col-lg-4">
                    <CrudFormField
                        column={columns.find(col => col.name === 'type')}
                        validation={validation}
                        disabled={disabled}
                        margin={2}
                    />
                </Col>
            </Row>
            <Row>
                <Col className="col-6 col-sm-4 col-md-3 col-lg-2">
                    <CrudFormField
                        column={columns.find(col => col.name === 'civility')}
                        validation={validation}
                        disabled={disabled}
                        margin={2}
                    />
                </Col>
                <Col className="col-12 col-md-4 col-lg-5">
                    <CrudFormField
                        column={columns.find(col => col.name === 'firstName')}
                        validation={validation}
                        disabled={disabled}
                        margin={2}
                    />
                </Col>
                <Col className="col-12 col-md-5">
                    <CrudFormField
                        column={columns.find(col => col.name === 'lastName')}
                        validation={validation}
                        disabled={disabled}
                        margin={2}
                    />
                </Col>
            </Row>
            <Row>
                <Col className="col-12 col-md-6">
                    <CrudFormField
                        column={columns.find(col => col.name === 'jobTitle')}
                        validation={validation}
                        disabled={disabled}
                        margin={2}
                    />
                </Col>
                <Col>
                    <CrudFormField
                        column={columns.find(col => col.name === 'thirdPart')}
                        validation={validation}
                        disabled={disabled}
                        margin={2}
                    />
                </Col>
            </Row>
            <Row  className="mt-3">
                <Col className="col-12 col-lg-6">
                    <CrudFormField
                        column={columns.find(col => col.name === 'email')}
                        validation={validation}
                        disabled={disabled}
                        margin={2}
                    />
                </Col>
                <Col>
                    <CrudFormField
                        column={columns.find(col => col.name === 'mobileNumber')}
                        validation={validation}
                        disabled={disabled}
                        margin={2}
                    />
                </Col>
            </Row>
            <Row>
                <Col className="col-12 col-lg-6">
                    <CrudFormField
                        column={columns.find(col => col.name === 'phoneNumber')}
                        validation={validation}
                        disabled={disabled}
                        margin={2}
                    />
                </Col>
                <Col>
                    <CrudFormField
                        column={columns.find(col => col.name === 'faxNumber')}
                        validation={validation}
                        disabled={disabled}
                        margin={2}
                    />
                </Col>
            </Row>
            <Row className="mb-5">
                <Col className="col-12 col-lg-6">
                    <CrudFormField
                        column={columns.find(col => col.name === 'address')}
                        validation={validation}
                        disabled={disabled}
                        margin={4}
                    />
                </Col>
            </Row>
                   
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
