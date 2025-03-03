import { useEffect, useState } from "react"

export const useWindowWidthListener = (): number => {
    const [width, setWidth] = useState<number>(window.innerWidth);
    
    useEffect(() => {
        window.addEventListener('resize', handleResizeEvent);
        return () => window.removeEventListener('resize', handleResizeEvent);
    }, []);

    const handleResizeEvent = () => {
        setWidth(window.innerWidth);
    }

    return width;
}
