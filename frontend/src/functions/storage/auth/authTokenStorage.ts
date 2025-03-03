import { AppConfig } from "config/AppConfig";

const REFRESH_AUTH_TOKEN_STORAGE_KEY = 'refresh_auth';
const AUTH_TOKEN_STORAGE_KEY = 'auth';

/**
 * retrieve authentication JWT
 */
export const getAuthToken = (): string|null => {
    const token = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
    if(token) {
        return JSON.parse(token);
    }

    return null;
}

/**
 * retrieve refresh token
 */
export const getRefreshAuthToken = (): string|null => {
    const token = localStorage.getItem(REFRESH_AUTH_TOKEN_STORAGE_KEY);
    if(token) {
        return JSON.parse(token);
    }
    return null;
}

/**
 * store authentication JWT
 */
export const storeAuthToken = (
    token: string,
    rememberMe: boolean = false
): void => {
    //store in localStorage
    localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, JSON.stringify(token));
}

/**
 * store refresh token
 */
export const storeRefreshAuthToken = (
    token: string,
): void => {
    localStorage.setItem(REFRESH_AUTH_TOKEN_STORAGE_KEY, JSON.stringify(token));
}

/**
 * remove auth token (sessionStorage and cookie if exists)
 */
export const destroyAuthToken = (): void => {
    localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
    localStorage.removeItem(REFRESH_AUTH_TOKEN_STORAGE_KEY);
}
