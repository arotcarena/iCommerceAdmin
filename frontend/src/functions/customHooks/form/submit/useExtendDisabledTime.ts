import { useEffect, useState } from "react";

export const useExtendDisabledTime = (isDisabled: boolean, wait: number = 5000): boolean => {
    const [isDisabledExtended, setIsDisabledExtended] = useState<boolean>(false);
    useEffect(() => {
        if(isDisabled) {
            setIsDisabledExtended(true);
        } else {
            setTimeout(() => {
                setIsDisabledExtended(false);
            }, wait);
        }
    }, [isDisabled]);

    return isDisabledExtended;
}
