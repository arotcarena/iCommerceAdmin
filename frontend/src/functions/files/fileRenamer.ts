export const renameFile = (filename: string): string => {
    // Extraire l'extension du nom de fichier
    const indexExtension = filename.lastIndexOf('.');
    if (indexExtension === -1) {
        // Si l'extension est absente, renvoyer le nom de fichier inchangé
        return filename;
    }

    // Séparer le nom de fichier et son extension
    const nameWithoutExtension = filename.substring(0, indexExtension);
    const extension = filename.substring(indexExtension);
    
    // Extraire le numéro (s'il existe) avant l'extension
    let number = '';
    const nameWithoutNumber = nameWithoutExtension.replace(/\((\d+)\)$/, function(match) {
        number = match.substring(1, 2);
        return '';
    });
    
    // Si un numéro a été trouvé, ajouter 1 à ce numéro
    if (number !== '') {
        number = (parseInt(number) + 1).toString();
    } else {
        // Sinon, initialiser à 1
        number = '1';
    }

    // Reconstruire le nom de fichier avec le nouveau numéro
    const newName = nameWithoutNumber + '(' + number + ')' + extension;

    return newName;
}