import { act, renderHook } from "@testing-library/react";
import { usePagination } from "functions/customHooks/usePagination";

type UsePaginationResult = {
    current: {
        countPages: number,
        hasPrevious: boolean,
        hasNext: boolean,
        goToPrevious: () => void,
        goToNext: () => void,
        pageLinks: number[]
    }
};

const handleChange = jest.fn((page: number) => {});

describe('usePagination', () => {
    const setUp = (
        page: number,
        itemsPerPage: number,
        totalItems: number,
        linksToShow: number = 3
    ): UsePaginationResult => {
        const {result} = renderHook(() => {
            return usePagination(page, itemsPerPage, totalItems, handleChange, linksToShow);
        });

        return result;
    }

    it('should have previous page when page > 1', () => {
        const result = setUp(2, 10, 100);

        expect(result.current.hasPrevious).toBeTruthy();
    })
    
    it('should not have previous page when page = 1', () => {
        const result = setUp(1, 10, 100);

        expect(result.current.hasPrevious).toBeFalsy();
    })

    it('should have next page when sufficient items', () => {
        const result = setUp(3, 10, 100);

        expect(result.current.hasNext).toBeTruthy();
    })

    it('should not have next page when unsufficient items', () => {
        const result = setUp(3, 10, 25);

        expect(result.current.hasNext).toBeFalsy();

        const result2 = setUp(3, 50, 140);

        expect(result2.current.hasNext).toBeFalsy();
    })

    it('should call onChange with previous page when do goToPrevious and previous page exists', () => {
        const result = setUp(3, 10, 100);

        act(() => result.current.goToPrevious());

        expect(handleChange).toHaveBeenCalledWith(2);
    })

    it('should not call onChange with previous page when do goToPrevious and no previous page exists', () => {
        const result = setUp(1, 10, 100);

        act(() => result.current.goToPrevious());

        expect(handleChange).not.toHaveBeenCalled();
    })

    it('should call onChange with next page when do goToNext and next page exists', () => {
        const result = setUp(3, 10, 100);

        act(() => result.current.goToNext());

        expect(handleChange).toHaveBeenCalledWith(4);
    })

    it('should not call onChange with next page when do goToNext and no next page exists', () => {
        const result = setUp(3, 10, 25);

        act(() => result.current.goToNext());

        expect(handleChange).not.toHaveBeenCalled();
    })

    it('should return correct pages count', () => {
        const result = setUp(1, 10, 25);
        expect(result.current.countPages).toEqual(3);

        const result2 = setUp(5, 20, 115);
        expect(result2.current.countPages).toEqual(6);
    })

    it('should return correct page links', () => {
        const result = setUp(1, 10, 25, 3);
        expect(JSON.stringify(result.current.pageLinks)).toEqual(JSON.stringify([1, 2, 3]));

        const result2 = setUp(5, 20, 115, 5);
        expect(JSON.stringify(result2.current.pageLinks)).toEqual(JSON.stringify([1, 2, 3, 4, 5, 6]));

        const result3 = setUp(12, 20, 1000, 5);
        expect(JSON.stringify(result3.current.pageLinks)).toEqual(JSON.stringify([1, 8, 9, 10, 11, 12, 13, 14, 15, 16, 50]));
    })
})