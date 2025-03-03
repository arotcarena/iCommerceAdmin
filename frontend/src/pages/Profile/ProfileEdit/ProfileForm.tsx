import { DynamicFormField } from "UI/Form/DynamicFormField";
import { FormSubmitGroup } from "UI/Form/Submit/FormSubmitGroup";
import { Col, Row } from "reactstrap";
import { TabColumn } from "type/superCrudTypes";

type Props = {
    validation: any,
    columns: TabColumn[],
    disabled?: boolean,
    isPending?: boolean,
    onClose?: () => void
};

export const ProfileForm = ({validation, columns, disabled = false, isPending, onClose}: Props) => {

    return (
        <form onSubmit={validation.handleSubmit}>
            <Row className="mb-4 align-items-end">
                <Col>
                    <Row>
                        <Col className="col-md-4 col-xl-4">
                            <DynamicFormField
                                column={columns.find(col => col.name === 'civility')}
                                validation={validation}
                                disabled={disabled}
                                margin={2}
                            />
                        </Col>
                    </Row>
                    <DynamicFormField
                        column={columns.find(col => col.name === 'firstName')}
                        validation={validation}
                        disabled={disabled}
                        margin={2}
                    />
                    <DynamicFormField
                        column={columns.find(col => col.name === 'lastName')}
                        validation={validation}
                        disabled={disabled}
                    />
                    <DynamicFormField
                        column={columns.find(col => col.name === 'jobTitle')}
                        validation={validation}
                        disabled={disabled}
                    />
                </Col>
                <Col className="col-12 col-md-5 ms-4">
                    <DynamicFormField
                        column={columns.find(col => col.name === 'avatar')}
                        validation={validation}
                        disabled={disabled}
                    />
                </Col>
            </Row>
            <DynamicFormField
                column={columns.find(col => col.name === 'email')}
                validation={validation}
                disabled={disabled}
                fullWidth={true}
            />
            <DynamicFormField
                column={columns.find(col => col.name === 'emailSignature')}
                validation={validation}
                disabled={disabled}
                fullWidth={true}
            />

            <Row>
                <Col className="col-12 col-md-3">
                    <DynamicFormField
                        column={columns.find(col => col.name === 'agentId')}
                        validation={validation}
                        margin={4}
                        disabled={true}
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