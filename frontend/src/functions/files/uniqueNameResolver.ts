export const resolveUniqueName = (
    name: string,
    existingNames: string[],
    renamer: (name: string) => string
): string => {
    if(existingNames.includes(name)) {
        const newName = renamer(name);
        return resolveUniqueName(newName, existingNames, renamer);
    }
    return name;
};
