/**
 * assert if there is an error and return error
 */
export const getError = async (callback: () => void) => {
    let error = null;
    try {
        callback();
    } catch(e) {
        error = e;
    }
    expect(error).not.toBeNull();
    return error;
}

/**
 * assert if there is an error and return error
 */
export const getAsyncError = async (callback: () => Promise<void>): Promise<any> => {
    let error = null;
    try {
        await callback();
    } catch(e) {
        error = e;
    }
    expect(error).not.toBeNull();
    return error;
}