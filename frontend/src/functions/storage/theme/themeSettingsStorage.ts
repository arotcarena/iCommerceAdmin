import { ThemeType, initialTheme } from "Components/Contexts/Theme/ThemeContext";

export const changeThemeSetting = (key: string, value: any) => {
    let themeSettings = getThemeSettings();
    if(!themeSettings) {
        themeSettings = initialTheme;
    }
    //Change
    themeSettings = {
        ...themeSettings,
        [key]: value
    };
    
    localStorage.setItem('theme', JSON.stringify(themeSettings));
}

export const getThemeSettings = (): ThemeType|null => {
    const themeSettings = localStorage.getItem('theme');
    if(themeSettings) {
        return JSON.parse(themeSettings);
    }
    return null;
}