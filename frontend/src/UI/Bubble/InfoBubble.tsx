import { PropsWithChildren } from "react"

type Props = PropsWithChildren<{
    hasInfoIcon?: boolean,
    isBottom?: boolean
}>;

export const InfoBubble = ({
    children,
    isBottom = false,
    hasInfoIcon = true
}: Props) => {
    return (
        <div className={'info-bubble' + (isBottom ? ' bottom': '')}>
            {
                hasInfoIcon && (
                    <i className="ri-information-line"></i>
                )
            }
            <span style={{whiteSpace: 'nowrap'}}>
                {children}
            </span>
        </div>
    )
}
