import { PropsWithChildren } from "react"
import { useTranslation } from "react-i18next";
import { Button, Spinner } from "reactstrap"

type Props = PropsWithChildren<{
    color: string,
    type?: any,
    isLoading?: boolean,
    large?: boolean,
    [key: string]: any
}>;

export const ButtonWithLoading = ({
    color = 'primary',
    type = 'submit',
    isLoading = false,
    large = false,
    children,
    ...props
}: Props) => {

    const {t} = useTranslation();

    return (
        <Button 
            color={color}
            disabled={isLoading && true}
            className={'btn btn-' + color + (large ? ' w-100': '')}
            type={type}
            {...props}
        >
            {
                isLoading && (
                    <Spinner size="sm" className='me-2'>{t('loading') + '...'}</Spinner>
                )
            }
            <span>{children}</span>
        </Button>
    )
}