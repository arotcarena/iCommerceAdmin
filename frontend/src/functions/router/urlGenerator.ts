import { AppConfig } from "config/AppConfig";
import {authRoutes, publicRoutes} from "../../Routes/routes"; 

export const generateUrl = (
    name: string, 
    params?: {[key: string]: string|number},
    isAbsolute: boolean = false
): string => {
    const allRoutes = publicRoutes.concat(authRoutes);
    const route = allRoutes.find(route => route.name === name);

    const prefix: string = isAbsolute ? AppConfig.SITE_URL: '';
    
    let path = route?.path ?? '#';
    if(path?.includes('/*')) {
        path = path.replace('/*', '');
    }

    
    //params resolution
    if(params) {
        /** params that are not in the path */
        let additionalParams = [];
        for(const [key, value] of Object.entries(params)) {
            if(path.includes(':'+key)) {
                path = path.replace(':'+key, value.toString());
            } else {
                additionalParams.push(key + '=' + value);
            }
        }
        if(additionalParams.length > 0) {
            path += '?' + additionalParams.join('&');
        }
    }

    if(path.includes(':')) {
        //eslint-disable-next-line
        path = path.replaceAll(/\/:[^\/?]*(\?|$)/g, '$1');
    }
    
    return prefix + path;
}

