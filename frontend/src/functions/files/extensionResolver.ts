export const getFileExtension = (fileName: string): string => {
    const parts = fileName.split('.');
    return parts[parts.length - 1];
}

export const getFileNameWithoutExtension = (fileName: string): string => {
    const extension = getFileExtension(fileName);
    return fileName.replace('.' + extension, '');
}

export const getFileNameWithoutDirectory = (fileName: string): string => {
    const parts = fileName.split('/');
    return parts[parts.length - 1];
}