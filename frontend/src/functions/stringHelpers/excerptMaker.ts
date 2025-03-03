export const createExcerpt = (text: string, count: number): string => {
    if(text.length < count) {
        return text;
    }
    const cutIndex = text.indexOf(' ', count);
    //if no space truncate word 
    if(cutIndex === -1) {
        return text.substring(0, count) + '...';
    }
    return text.substring(0, cutIndex) + '...';
}