import { PropsWithChildren } from "react"
import { useTranslation } from "react-i18next";
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap"

type Props = PropsWithChildren<{
    target: string,
    downloadUrl: string,
    buttonColor: 'primary' | 'secondary' | 'light' | 'dark'
}>;

export const ExportCard = ({
    target,
    downloadUrl,
    buttonColor = 'primary',
    children
}: Props) => {
    const {t} = useTranslation();

    return (
        <Card>
            <CardBody className="p-4">
                <CardTitle className="h5">
                    <span>{t(target)}</span>
                </CardTitle>
                { children }
                <a href={downloadUrl} target="_blank" className={'mt-4 btn btn-' + buttonColor}>
                    <i className="ri-file-download-line"></i>{' '}
                    {t('export')}
                </a>
            </CardBody>
        </Card>
    )
}
