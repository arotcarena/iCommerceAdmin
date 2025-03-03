export const lightSearchedPart = (text?: string|null, search?: string|null): string|null => {

    if(!search || !text) {
        return null;
    }

    const textLowercase = text.toLowerCase();
    const searchLowercase = search.toLowerCase();

    if(!textLowercase.includes(searchLowercase)) {
        return null;
    }

    const parts = textLowercase.split(searchLowercase);
    const partOneLength = parts[0].length;
    const searchLength = search.length;

    return text.substring(0, partOneLength) + 
            '<strong style="background-color: yellow;">' + 
            text.substring(partOneLength, partOneLength + searchLength) + 
            '</strong>' + text.substring(partOneLength + searchLength);
};
