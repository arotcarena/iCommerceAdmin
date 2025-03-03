import { useEffect } from "react"

export const useLineCreateFocus = (
    tr: null|HTMLTableRowElement
): void => {
    useEffect(() => {
        if(tr) {
            const inputs = tr.querySelectorAll<HTMLElement>('input, select, .address-add-button');

            const handleKeyDown = (e: any) => {
                if(e.key === 'Tab') {
                    e.preventDefault();
                    const index = Array.from(inputs).indexOf(e.target);
                    if(e.shiftKey) {
                        if(index > 0) {
                            inputs[index - 1].focus();
                        }
                    } else {
                        if(index < (inputs.length - 1)) {
                            inputs[index + 1].focus();
                        }
                    }
                }
            }
            tr.addEventListener('keydown', handleKeyDown);

            return () => tr.removeEventListener('keydown', handleKeyDown);
        }
    }, [tr]);
}