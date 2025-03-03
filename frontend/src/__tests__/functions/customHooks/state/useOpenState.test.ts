import { act, renderHook } from "@testing-library/react";
import { useOpenState } from "functions/customHooks/state/useOpenState";

type UseOpenStateResult = {
    current: [
        isOpen: boolean,
        open: () => void,
        close: () => void
    ]
};

describe('useOpenState', () => {

    const setUp = (initialIsOpen: boolean = false): UseOpenStateResult => {
        const {result} = renderHook(() => {
            return useOpenState(initialIsOpen);
        });

        return result;
    }

    it('should have correct initialState open', () => {
        const result = setUp(true);
        const isOpen = result.current[0];

        expect(isOpen).toBeTruthy();
    })

    it('should have correct initialState close', () => {
        const result = setUp(false);
        const isOpen = result.current[0];

        expect(isOpen).toBeFalsy();
    })

    it('should open when is closed and do open', () => {
        const result = setUp(false);

        const open = result.current[1];
        act(() => open());

        const isOpen = result.current[0];
        expect(isOpen).toBeTruthy();
    })

    it('should close when is open and do close', () => {
        const result = setUp(false);

        const close = result.current[2];
        act(() => close());

        const isOpen = result.current[0];
        expect(isOpen).toBeFalsy();
    })

    it('should stay open when is open and do open', () => {
        const result = setUp(true);

        const open = result.current[1];
        act(() => open());

        const isOpen = result.current[0];
        expect(isOpen).toBeTruthy();
    })

    it('should stay closed when is closed and do close', () => {
        const result = setUp(false);

        const close = result.current[2];
        act(() => close());

        const isOpen = result.current[0];
        expect(isOpen).toBeFalsy();
    })
})