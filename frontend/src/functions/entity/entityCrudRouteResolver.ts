import { generateUrl } from "functions/router/urlGenerator"
import { API_USERS } from "Routes/apiRoutes";

export const resolveEntityCrudRoute = (endpoint: string): string|null => {
    let routeName: string|null = null;
    switch(endpoint) {
        case API_USERS:
            routeName = 'users';
            break;
    }

    if(routeName) {
        return generateUrl(routeName);
    }
    return null;
}
