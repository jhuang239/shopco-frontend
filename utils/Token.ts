/**
 * Utility for managing authentication tokens
 * Supports both localStorage and cookies storage methods
 */

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

/**
 * Save authentication token
 * @param token - The token to save
 * @param useLocalStorage - Whether to use localStorage (true) or cookies (false)
 * @param expiryDays - Number of days until cookie expires (only for cookie storage)
 */
export const saveToken = (
    token: string,
    useLocalStorage: boolean = true,
    expiryHours: number = 1
): void => {
    if (!isBrowser) return;

    if (useLocalStorage) {
        localStorage.setItem('auth_token', token);
    } else {
        const expiryDate = new Date();
        expiryDate.setTime(expiryDate.getTime() + expiryHours * 60 * 60 * 1000);
        document.cookie = `auth_token=${token}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Strict`;
    }
};

/**
 * Get the saved authentication token
 * @param useLocalStorage - Whether to retrieve from localStorage or cookies
 * @returns The stored token or null if not found
 */
export const getToken = (useLocalStorage: boolean = true): string | null => {
    if (!isBrowser) return null;

    if (useLocalStorage) {
        return localStorage.getItem('auth_token');
    } else {
        const cookies = document.cookie.split(';');
        const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('auth_token='));
        return tokenCookie ? tokenCookie.split('=')[1] : null;
    }
};

/**
 * Remove the saved authentication token
 * @param useLocalStorage - Whether to remove from localStorage or cookies
 */
export const removeToken = (useLocalStorage: boolean = true): void => {
    if (!isBrowser) return;

    if (useLocalStorage) {
        localStorage.removeItem('auth_token');
    } else {
        document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
};

/**
 * Check if the token is expired
 * @param token - The token to check (if not provided, will attempt to get from storage)
 * @param useLocalStorage - Whether to retrieve from localStorage or cookies if token not provided
 * @returns Boolean indicating if token is expired (true) or valid (false)
 */
export const isTokenExpired = (token?: string, useLocalStorage: boolean = true): boolean => {
    if (!isBrowser) return true;

    try {
        // Use provided token or get from storage
        const tokenToCheck = token || getToken(useLocalStorage);

        if (!tokenToCheck) return true;

        // Decode JWT token
        const base64Url = tokenToCheck.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64).split('').map(c => {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join('')
        );

        const { exp } = JSON.parse(jsonPayload);

        // Check if expiration timestamp exists and is in the past
        return !exp || Date.now() >= exp * 1000;
    } catch (error) {
        // If token is malformed or can't be decoded, consider it expired
        return true;
    }
};