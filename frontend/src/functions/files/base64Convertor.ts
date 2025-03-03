import { Base64File, File, UploadedFile } from "type/formTypes";
import { formatBytes } from "./sizeConvertor";

const fileToBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
}

export const convertFileToBase64 = async (file: File): Promise<Base64File> => {
    try {
        const convertedFile = await fileToBase64(file);
        if(!convertedFile || typeof convertedFile !== 'string') {
            throw new Error('file to base64 conversion error');
        }
        return {
            src: convertedFile,
            name: file.name,
            size: formatBytes(file.size)
        };
    } catch(e: any) {
        throw e;
    }
}
