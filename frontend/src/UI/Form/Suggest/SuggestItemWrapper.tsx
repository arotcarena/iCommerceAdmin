import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
    isSelected: boolean,
    suggest: any,
    onSelect: (suggest: any) => void,
    isSelectable?: boolean,
    notSelectableLabel?: string,
}>;

export const SuggestItemWrapper = ({
    isSelected,
    suggest,
    onSelect,
    isSelectable = false,
    notSelectableLabel,
    children
}: Props) => {

    const handleClick = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        if(isSelectable) {
            onSelect(suggest);
        }
    }

    return (
        <div
            role="button"
            style={{pointerEvents: isSelectable ? 'all': 'none', opacity: isSelectable ? 1: .3}}
            className={'suggest-item d-flex justify-content-between align-items-center' + (isSelected ? ' active': '') + (!isSelectable ? ' bg-transparent-hover': '')}
            onClick={handleClick}
        >
            <span>{children}</span>
            {
                !isSelectable && notSelectableLabel && (
                    <span className="fw-medium" style={{fontSize: '.7em'}}>
                        <i className="ri-error-warning-line"></i>{' '}
                        {notSelectableLabel}
                    </span>
                )
            }
        </div>
    )
}
