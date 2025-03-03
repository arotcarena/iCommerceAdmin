import React, { PropsWithChildren, useEffect, useState } from 'react';

//import Components
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

import { useTheme } from 'Components/Contexts/Theme/ThemeContext';

export const Layout = ({children}: PropsWithChildren) => {
    const [headerClass, setHeaderClass] = useState("");

    const {
        theme: {
            layoutType,
            layoutModeType,
            sidebarVisibilitytype
        },
        setThemeValue
    } = useTheme();

    // class add remove in header
    useEffect(() => {
        window.addEventListener("scroll", scrollNavigation, true);
    });
    function scrollNavigation() {
        var scrollup = document.documentElement.scrollTop;
        if (scrollup > 50) {
            setHeaderClass("topbar-shadow");
        } else {
            setHeaderClass("");
        }
    }

    /*
    call dark/light mode
    */
    const onChangeLayoutMode = (value: any) => {
        if (setThemeValue) {
            setThemeValue('layoutModeType', value);
        }
    };

    useEffect(() => {
        if (sidebarVisibilitytype === 'show' || layoutType === "vertical" || layoutType === "twocolumn") {
            document.querySelector(".hamburger-icon")?.classList.remove('open');
        } else {
            document.querySelector(".hamburger-icon")?.classList.add('open');
        }
    }, [sidebarVisibilitytype, layoutType]);

    return (
        <React.Fragment>
            <div id="layout-wrapper">
                <Header
                    headerClass={headerClass}
                    layoutModeType={layoutModeType}
                    onChangeLayoutMode={onChangeLayoutMode} />
                <Sidebar layoutType={layoutType} />
                <div className="main-content">{children}
                    <Footer />
                </div>
            </div>
        </React.Fragment>
    );
};
