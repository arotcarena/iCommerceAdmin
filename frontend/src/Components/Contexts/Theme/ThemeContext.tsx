import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { LAYOUT_MODE_TYPES, LAYOUT_POSITION_TYPES, LAYOUT_SIDEBAR_TYPES, LAYOUT_TOPBAR_THEME_TYPES, LAYOUT_TYPES, LAYOUT_WIDTH_TYPES, LEFT_SIDEBAR_IMAGE_TYPES, LEFT_SIDEBAR_SIZE_TYPES, LEFT_SIDEBAR_VIEW_TYPES, PERLOADER_TYPES, SIDEBAR_VISIBILITY_TYPES } from "./themeConstants";
import { changeLayout, changeLayoutMode, changeLayoutPosition, changeLayoutWidth, changeLeftsidebarSizeType, changeLeftsidebarViewType, changePreLoader, changeSidebarImageType, changeSidebarTheme, changeSidebarVisibility, changeTopbarTheme } from "functions/storage/theme/themeSettingsHtml";
import { changeThemeSetting, getThemeSettings } from "functions/storage/theme/themeSettingsStorage";

export const initialTheme = {
    layoutType: LAYOUT_TYPES.VERTICAL,
    leftSidebarType: LAYOUT_MODE_TYPES.LIGHTMODE,
    layoutModeType: LAYOUT_SIDEBAR_TYPES.LIGHT,
    layoutWidthType: LAYOUT_WIDTH_TYPES.FLUID,
    layoutPositionType: LAYOUT_POSITION_TYPES.FIXED,
    topbarThemeType: LAYOUT_TOPBAR_THEME_TYPES.LIGHT,
    leftsidbarSizeType: LEFT_SIDEBAR_SIZE_TYPES.DEFAULT,
    leftSidebarViewType: LEFT_SIDEBAR_VIEW_TYPES.DEFAULT,
    leftSidebarImageType: LEFT_SIDEBAR_IMAGE_TYPES.NONE,
    preloader: PERLOADER_TYPES.DISABLE,
    sidebarVisibilitytype: SIDEBAR_VISIBILITY_TYPES.SHOW
};

export type ThemeType = {
    layoutType: string,
    leftSidebarType: string,
    layoutModeType: string,
    layoutWidthType: string,
    layoutPositionType: string,
    topbarThemeType: string,
    leftsidbarSizeType: string,
    leftSidebarViewType: string,
    leftSidebarImageType: string,
    preloader: string,
    sidebarVisibilitytype: string,
};

type ThemeContextType = {
    theme: ThemeType,
    setThemeValue: (key: string, value: string) => void
};

const ThemeContext = createContext<ThemeContextType|null>(null);


export const ThemeProvider = ({children}: PropsWithChildren) => {

    const [theme, setTheme] = useState<ThemeType>(getThemeSettings() ?? initialTheme);

    const setThemeValue = (key: string, value: string) => {
        //store in html element attributes
        switch(key) {
            case 'layoutType':
                changeLayout(value);
                break;
            case 'layoutModeType':
                changeLayoutMode(value);
                break;
            case 'leftSidebarType':
                changeSidebarTheme(value);
                break;
            case 'layoutWidthType':
                changeLayoutWidth(value);
                break;
            case 'layoutPositionType':
                changeLayoutPosition(value);
                break;
            case 'topbarThemeType':
                changeTopbarTheme(value);
                break;
            case 'leftSidebarImageType':
                changeSidebarImageType(value);
                break;
            case 'preloader':
                changePreLoader(value);
                break;
            case 'leftsidbarSizeType':
                changeLeftsidebarSizeType(value);
                break;
            case 'leftSidebarViewType':
                changeLeftsidebarViewType(value);
                break;
            case 'sidebarVisibilitytype':
                changeSidebarVisibility(value);
                break;
            default:
                break;
        }

        //store in ThemeContext
        setTheme(theme => ({
            ...theme,
            [key]: value
        }));
        //store in localStorage
        changeThemeSetting(key, value);
    };

    //initialize html attributes
    useEffect(() => {
        changeLayout(theme.layoutType);  
        changeLayoutMode(theme.layoutModeType);
        changeSidebarTheme(theme.leftSidebarType);
        changeLayoutWidth(theme.layoutWidthType);
        changeLayoutPosition(theme.layoutPositionType);
        changeTopbarTheme(theme.topbarThemeType);
        changeSidebarImageType(theme.leftSidebarImageType);
        changePreLoader(theme.preloader);
        changeLeftsidebarSizeType(theme.leftsidbarSizeType);
        changeLeftsidebarViewType(theme.leftSidebarViewType);
        changeSidebarVisibility(theme.sidebarVisibilitytype);
        //eslint-disable-next-line
    }, []);

    return (
        <ThemeContext.Provider value={{theme, setThemeValue}}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if(!context) {
        throw new Error('To use theme context, your component must be wrapped by <ThemeProvider>');
    }
    return context;
}