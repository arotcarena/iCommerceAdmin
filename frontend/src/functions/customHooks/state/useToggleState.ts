import { useState } from "react"

export const useToggleState = (
    initialState: boolean = false
): [
    state: boolean,
    toggle: () => void
] => {
    const [state, setState] = useState<boolean>(initialState);

    const toggle = () => {
        setState(!state);
    }

    return [state, toggle];
}