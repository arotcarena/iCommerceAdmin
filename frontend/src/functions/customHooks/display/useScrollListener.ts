import { useEffect, useState } from "react"

export const useScrollYListener = (): number => {
    const [y, setY] = useState<number>(window.scrollY);
    
    useEffect(() => {
        document.addEventListener('scroll', handleScrollEvent);
        return () => document.removeEventListener('scroll', handleScrollEvent);
    }, []);

    const handleScrollEvent = () => {
        setY(window.scrollY);
    }

    return y;
}
