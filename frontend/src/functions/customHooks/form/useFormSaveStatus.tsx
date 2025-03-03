import { getSavedDataStored, resetSavedData, storeSavedData } from "functions/storage/form/savedFormDataStorage";
import { useEffect, useState } from "react"

export const useFormSaveStatus = (
    fieldsToIgnore: string[] = []
): {
    isSaved: boolean,
    handleSave: () => void,
    handleChange: (formData: any) => void,
} => {
    const [isSaved, setIsSaved] = useState<boolean>(true);

    const handleChange = (formData: any) => {
        let savedData = getSavedDataStored();
        let data = {...formData};
        for(const fieldToIgnore of fieldsToIgnore) {
            if(data && data[fieldToIgnore]) {
                delete data[fieldToIgnore];
            }
            if(savedData && savedData[fieldToIgnore]) {
                delete savedData[fieldToIgnore];
            }
        }

        if(data && JSON.stringify(savedData) === JSON.stringify(data)) {
            setIsSaved(true);
        } else {
            setIsSaved(false);
        }
    };

    const handleSave = () => {
        setIsSaved(true);
    };

    useEffect(() => {
        resetSavedData();
    }, []);

    return {
        isSaved,
        handleSave,
        handleChange,
    };
};
