import React, { useEffect } from 'react';
import { useTheme } from 'Components/Contexts/Theme/ThemeContext';

export const NonAuthLayout = ({ children }: any) => {
 
    const {theme: {layoutModeType}} = useTheme();

    useEffect(() => {
        if (layoutModeType === "dark") {
            document.body.setAttribute("data-bs-theme", "dark");
        } else {
            document.body.setAttribute("data-bs-theme", "light");
        }
        return () => {
            document.body.removeAttribute("data-bs-theme")
        }
    }, [layoutModeType]);
    return (
        <div>
            {children}
        </div>
    );
};
