import { changeHTMLAttribute } from 'functions/dom/htmlAttributesChanger';

/**
 * Changes the layout type
 */
export const changeLayout = (layout: any) => {
    try {
        if (layout === "twocolumn") {
            document.documentElement.removeAttribute("data-layout-width");
        } else if (layout === "horizontal") {
            document.documentElement.removeAttribute("data-sidebar-size");
        } else if (layout === "semibox") {
            changeHTMLAttribute("data-layout-width", "fluid");
            changeHTMLAttribute("data-layout-style", "default");
        }
        changeHTMLAttribute("data-layout", layout);
    } catch (error) { }
};

/**
 * Changes the layout mode
 */
export const changeLayoutMode = (layoutMode : any) => {
    try {
        changeHTMLAttribute("data-bs-theme", layoutMode);
    } catch (error) { }
};

/**
 * Changes the left sidebar theme
 */
export const changeSidebarTheme = (theme : any) => {
    try {
        changeHTMLAttribute("data-sidebar", theme);
    } catch (error) { }
};

/**
 * Changes the layout width
 */
export const changeLayoutWidth = (layoutWidth : any) => {
    try {
        if (layoutWidth === 'lg') {
            changeHTMLAttribute("data-layout-width", "fluid");
        } else {
            changeHTMLAttribute("data-layout-width", "boxed");
        }
    } catch (error) { }
};

/**
 * Changes the layout position
 */
export const changeLayoutPosition = (layoutposition : any) => {
    try {
        changeHTMLAttribute("data-layout-position", layoutposition);
    } catch (error) { }
};

/**
 * Changes the topbar themes
 */
export const changeTopbarTheme = (topbarTheme : any) => {
    try {
        changeHTMLAttribute("data-topbar", topbarTheme);

    } catch (error) { }
};

/**
 */
export const changeSidebarImageType = (leftsidebarImagetype : any) => {
    try {
        changeHTMLAttribute("data-sidebar-image", leftsidebarImagetype);
    } catch (error) { }
};

/**
 * Changes the Preloader
 */
export const changePreLoader = (preloaderTypes : any) => {
    try {
        changeHTMLAttribute("data-preloader", preloaderTypes);
    } catch (error) { }
};

/**
 * Changes the topbar themes
 */
export const changeLeftsidebarSizeType = (leftsidebarSizetype : any) => {
    try {
        switch (leftsidebarSizetype) {
            case 'lg':
                changeHTMLAttribute("data-sidebar-size", "lg");
                break;
            case 'md':
                changeHTMLAttribute("data-sidebar-size", "md");
                break;
            case "sm":
                changeHTMLAttribute("data-sidebar-size", "sm");
                break;
            case "sm-hover":
                changeHTMLAttribute("data-sidebar-size", "sm-hover");
                break;
            default:
                changeHTMLAttribute("data-sidebar-size", "lg");
        }
    } catch (error) { }
};

/**
 * Changes the topbar themes
 */
export const changeLeftsidebarViewType = (leftsidebarViewtype : any) => {
    try {
        changeHTMLAttribute("data-layout-style", leftsidebarViewtype);
    } catch (error) { }
};

/**
 * Changes the sidebar visibility
 */
export const changeSidebarVisibility = (sidebarVisibilitytype : any) => {
    try {
        changeHTMLAttribute("data-sidebar-visibility", sidebarVisibilitytype);
    } catch (error) { }
};