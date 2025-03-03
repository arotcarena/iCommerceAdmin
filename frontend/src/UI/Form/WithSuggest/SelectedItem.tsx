import { PropsWithChildren } from "react";

type SelectedItemProps = PropsWithChildren<{
    id: number,
    onRemove: (id: number) => void
}>;

export const SelectedItem = ({
    id,
    onRemove,
    children
}: SelectedItemProps) => {

    const handleClick = (e: any) => {
        e.preventDefault();
        onRemove(id);
    }

    return (
        <div className="input-selected-item">
            <div className="input-selected-item-label">{children}</div>
            <button type="button" onClick={handleClick} className="input-selected-item-closer" aria-label={'Remove ' + children}>
                <i className="ri-close-line"></i>
            </button>
        </div>
    )
}


export const SelectedItemDisabled = ({children}: PropsWithChildren) => {
    return (
        <div className="input-selected-item">
            <div className="input-selected-item-label pe-2">{children}</div>
        </div>
    )
}