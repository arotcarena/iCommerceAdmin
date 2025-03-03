import { useQuery } from "@tanstack/react-query";
import { useLoadUser } from "./api/queries/authQueries";
import { User } from "type/entityTypes";



export const useGetUser = (): {
    user: User|null,
    isLoading: boolean
} => {
    const loadUser = useLoadUser();
    const {data: user, isFetching: isLoading} = useQuery({
        queryKey: ['me'],
        queryFn: loadUser,
        initialData: null
    });
    
    return {
        user,
        isLoading
    }
};