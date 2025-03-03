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

export const BankAccountsForm = ({
    validation,
    columns,
    disabled,
    isPending,
    onClose,
}: Props) => {
    return (
        <form onSubmit={validation.handleSubmit}>
            <Row>
                <Col className="col-12 col-xl-3">
                    <CrudFormField
                        column={columns.find(col => col.name === 'name')}
                        validation={validation}
                        margin={4}
                        disabled={disabled}
                    />
                </Col>
                <Col className="col-12 col-xl-3">
                    <CrudFormField
                        column={columns.find(col => col.name === 'ref')}
                        validation={validation}
                        margin={4}
                        disabled={disabled}
                    />
                </Col>
                <Col className="col-12 col-xl-3">
                    <CrudFormField
                        column={columns.find(col => col.name === 'ribBankCode')}
                        validation={validation}
                        margin={4}
                        disabled={disabled}
                    />
                </Col>
                <Col className="col-12 col-xl-3">
                    <CrudFormField
                        column={columns.find(col => col.name === 'ribDeskCode')}
                        validation={validation}
                        margin={4}
                        disabled={disabled}
                    />
                </Col>
            </Row>
            <Row>
                <Col className="col-12 col-xl-4">
                    <CrudFormField
                        column={columns.find(col => col.name === 'ribAccountNumber')}
                        validation={validation}
                        margin={4}
                        disabled={disabled}
                    />
                </Col>
                <Col className="col-12 col-xl-2">
                    <CrudFormField
                        column={columns.find(col => col.name === 'ribKey')}
                        validation={validation}
                        margin={4}
                        disabled={disabled}
                    />
                </Col>
                <Col className="col-12 col-xl-4">
                    <CrudFormField
                        column={columns.find(col => col.name === 'iban')}
                        validation={validation}
                        margin={4}
                        disabled={disabled}
                    />
                </Col>
                <Col className="col-12 col-xl-2">
                    <CrudFormField
                        column={columns.find(col => col.name === 'bic')}
                        validation={validation}
                        margin={4}
                        disabled={disabled}
                    />
                </Col>
            </Row>
            <Row>
                <Col className="col-12 col-xl-2">
                    <CrudFormField
                        column={columns.find(col => col.name === 'currency')}
                        validation={validation}
                        margin={4}
                        disabled={disabled}
                    />
                    <div className="mt-5">
                        <CrudFormField
                            column={columns.find(col => col.name === 'isDefault')}
                            validation={validation}
                            margin={4}
                            disabled={disabled}
                        />
                        <CrudFormField
                            column={columns.find(col => col.name === 'isEnabled')}
                            validation={validation}
                            margin={4}
                            disabled={disabled}
                            size="md"
                        />
                    </div>
                </Col>
                <Col className="col-12 col-xl-4 ms-5">
                    <CrudFormField
                        column={columns.find(col => col.name === 'domiciliation')}
                        validation={validation}
                        margin={4}
                        disabled={disabled}
                    />
                </Col>
                <Col className="col-12 col-xl-4">
                    <CrudFormField
                        column={columns.find(col => col.name === 'accountingAccountNumber')}
                        validation={validation}
                        margin={4}
                        disabled={disabled}
                    />
                    <CrudFormField
                        column={columns.find(col => col.name === 'accountingJournal')}
                        validation={validation}
                        margin={4}
                        disabled={disabled}
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
