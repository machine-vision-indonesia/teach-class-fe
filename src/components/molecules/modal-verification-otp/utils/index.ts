/**
 * Retrieves the Two-Factor Authentication (TFA) token from local storage.
 *
 * This function checks if the code is running in a browser environment
 * (i.e., `window` is defined) and returns the TFA token stored in local storage.
 * If `window` is not defined, it returns `null`, making it safe to use in both
 * server-side and client-side environments.
 *
 * @returns {string | null} The TFA token if found, otherwise `null`.
 */
export const getTFAToken = () => {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem('tfa_token');
  }
  return null;
};

/**
 * Removes the Two-Factor Authentication (TFA) token from local storage.
 *
 * This function checks if the code is running in a browser environment
 * (i.e., `window` is defined) and removes the TFA token from local storage.
 * If `window` is not defined, it safely does nothing, making it compatible
 * with both server-side and client-side environments.
 */
export const removeTFAToken = () => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem('tfa_token');
  }
};
