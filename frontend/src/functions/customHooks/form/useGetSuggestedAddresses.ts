import { useQuery } from "@tanstack/react-query";
import { useLoadAddresses } from "../api/queries/addressQueries";

export const useGetSuggestedAddresses = (
    suggestedAddressesFilters?: {[key: string]: any}
) => {
    const loadAddresses = useLoadAddresses();
    const {data, isLoading} = useQuery({
        queryKey: ['suggested_addresses', JSON.stringify(suggestedAddressesFilters)],
        queryFn: () => {
            if(suggestedAddressesFilters) {
                return loadAddresses(suggestedAddressesFilters);
            }
            return null;
        },
        initialData: null,
    });

    return {
        suggestedAddresses: data,
        suggestedAddressesIsLoading: isLoading
    };
}
