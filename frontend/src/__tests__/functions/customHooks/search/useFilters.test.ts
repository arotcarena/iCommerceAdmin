import { act, renderHook } from "@testing-library/react"
import { useFilters } from "functions/customHooks/search/useFilters"
import { FiltersType } from "type/searchTypes"

type UseFiltersResult = {
    current: {
        filters: FiltersType,
        setFilterValue: (field: string, value: any) => void,
        countFilters: number,
        resetFilters: () => void,
        changePage: (page: number) => void
    }
};

describe('useFilters', () => {

    const setUp = (initialFilters: FiltersType = {}): UseFiltersResult => {
        const {result} = renderHook(() => {
            return useFilters(initialFilters);
        });

        return result;
    }

    it('should not count page filter', () => {
        const result = setUp();

        act(() => {
            result.current.setFilterValue('page', 4);
        });

        expect(result.current.countFilters).toEqual(0);
    })

    it('should not count itemsPerPage filter', () => {
        const result = setUp();

        act(() => {
            result.current.setFilterValue('itemsPerPage', 10);
        });

        expect(result.current.countFilters).toEqual(0);
    })

    it('should count sort filter', () => {
        const result = setUp();

        act(() => {
            result.current.setFilterValue('sortBy', 'email_ASC');
        });

        expect(result.current.countFilters).toEqual(1);
    })

    it('should count correctly filters', () => {
        const result = setUp();

        act(() => {
            result.current.setFilterValue('page', 4);
            result.current.setFilterValue('email', 'email@test.fr');
            result.current.setFilterValue('price', 15);
            result.current.setFilterValue('sortBy', 'email_ASC');
            result.current.setFilterValue('category', 'table');
        });

        expect(result.current.countFilters).toEqual(4);
    })

    it('should count 2 filters for max_field and min_field', () => {
        const result = setUp();

        act(() => {
            result.current.setFilterValue('max_price', 4);
            result.current.setFilterValue('min_price', 2);
        });

        expect(result.current.countFilters).toEqual(2);
    })

    it('should set correct filter value when do setFilterValue', () => {
        const result = setUp();

        act(() => {
            result.current.setFilterValue('max_price', 4);
            result.current.setFilterValue('email', 'email@test.fr');
        });

        expect(result.current.filters.max_price).toEqual(4);
        expect(result.current.filters.email).toEqual('email@test.fr');
    })

    it('should reset filters when do resetFilters', () => {
        const result = setUp({value: 'initialFilterTest'});

        act(() => {
            result.current.setFilterValue('field', 'value');
        })

        act(() => {
            result.current.resetFilters();
        })

        expect(JSON.stringify(result.current.filters)).toEqual(JSON.stringify({value: 'initialFilterTest'}));
    })

    it('should reset count when do resetFilters', () => {
        const result = setUp();

        act(() => {
            result.current.setFilterValue('field', 'value');
        })

        act(() => {
            result.current.resetFilters();
        })

        expect(result.current.countFilters).toEqual(0);
    })

    it('should not count initialFilters in countFilters', () => {
        const result = setUp({value: 'initialValue', field: 'otherInitialValue'});

        act(() => {
            result.current.setFilterValue('field', 'value');
        })

        expect(result.current.countFilters).toEqual(1);
    })

    it('should correctly change page filter when do pageChange', () => {
        const result = setUp();

        act(() => {
            result.current.changePage(5);
        })

        expect(result.current.filters.page).toEqual(5);
    })
})