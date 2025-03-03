import { act, renderHook } from "@testing-library/react";
import { useToggleState } from "functions/customHooks/state/useToggleState";

type UseToggleStateResult = {
    current: [
        state: boolean,
        toggle: () => void
    ]
};

describe('useToggleState', () => {

    const setUp = (initialState: boolean = false): UseToggleStateResult => {
        const {result} = renderHook(() => {
            return useToggleState(initialState);
        });

        return result;
    }

    it('should have correct initialState true', () => {
        const result = setUp(true);
        const state = result.current[0];

        expect(state).toBeTruthy();
    })

    it('should have correct initialState false', () => {
        const result = setUp(false);
        const state = result.current[0];

        expect(state).toBeFalsy();
    })

    it('should become true when is false and do toggle', () => {
        const result = setUp(false);

        const toggle = result.current[1];
        act(() => toggle());

        const state = result.current[0];
        expect(state).toBeTruthy();
    })

    it('should become false when is true and do toggle', () => {
        const result = setUp(true);

        const toggle = result.current[1];
        act(() => toggle());

        const state = result.current[0];
        expect(state).toBeFalsy();
    })
})