export const resolveUniqueString = (
    value: string,
    existingValues: string[],
    counter: number = 0,
): string => {
    const testValue = counter > 0 ? value + ' (' + counter + ')': value;
    if(existingValues.includes(testValue)) {
        counter++;
        return resolveUniqueString(value, existingValues, counter);
    }
    return testValue;
}
