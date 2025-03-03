import { useState } from "react"

export const useOpenState = (
    initialValue: boolean = false
): [
    isOpen: boolean,
    open: () => void,
    close: () => void
] => {
    const [isOpen, setOpen] = useState<boolean>(initialValue);
    
    const open = (): void => {
        setOpen(true);
    };

    const close = (): void => {
        setOpen(false);
    }

    return [isOpen, open, close];
}