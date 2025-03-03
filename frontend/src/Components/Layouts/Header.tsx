import React, { useState } from 'react';
import { Dropdown, DropdownMenu, DropdownToggle, Form } from 'reactstrap';

//import Components
import { SearchOption } from '../../UI/Common/SearchOption';
import { NotificationDropdown } from '../Notifications/NotificationDropdown';

import {ProfileDropdown} from 'Components/Profile/ProfileDropdown';
import { ThemeCustomizer } from 'UI/Theme/ThemeCustomizer';
import { useTheme } from 'Components/Contexts/Theme/ThemeContext';
import { LightDark } from 'UI/Common/LightDark';
import { FullScreenDropdown } from 'UI/Common/DropDown/FullScreenDropdown';
import { LanguageDropdown } from 'UI/Common/DropDown/LanguageDropdown';
import { useTranslation } from 'react-i18next';
import { MainLogo } from 'UI/Logo/MainLogo';

const Header = ({ onChangeLayoutMode, layoutModeType, headerClass }: any) => {
    const {t} = useTranslation();
  
    const {theme: {sidebarVisibilitytype}, setThemeValue} = useTheme();

    const [search, setSearch] = useState<boolean>(false);
    const toogleSearch = () => {
        setSearch(!search);
    };

    const toogleMenuBtn = () => {
        var windowSize = document.documentElement.clientWidth;
        setThemeValue('sidebarVisibilitytype', 'show')

        let hamburgerIcon: any = document.querySelector(".hamburger-icon")

        if (windowSize > 767)
            hamburgerIcon.classList.toggle('open');

        //For collapse horizontal menu
        if (document.documentElement.getAttribute('data-layout') === "horizontal") {
            document.body.classList.contains("menu") ? document.body.classList.remove("menu") : document.body.classList.add("menu");
        }

        //For collapse vertical and semibox menu
        if (sidebarVisibilitytype === "show" && (document.documentElement.getAttribute('data-layout') === "vertical" || document.documentElement.getAttribute('data-layout') === "semibox")) {
            if (windowSize < 1025 && windowSize > 767) {
                document.body.classList.remove('vertical-sidebar-enable');
                (document.documentElement.getAttribute('data-sidebar-size') === 'sm') ? document.documentElement.setAttribute('data-sidebar-size', '') : document.documentElement.setAttribute('data-sidebar-size', 'sm');
            } else if (windowSize > 1025) {
                document.body.classList.remove('vertical-sidebar-enable');
                (document.documentElement.getAttribute('data-sidebar-size') === 'lg') ? document.documentElement.setAttribute('data-sidebar-size', 'sm') : document.documentElement.setAttribute('data-sidebar-size', 'lg');
            } else if (windowSize <= 767) {
                document.body.classList.add('vertical-sidebar-enable');
                document.documentElement.setAttribute('data-sidebar-size', 'lg');
            }
        }


        //Two column menu
        if (document.documentElement.getAttribute('data-layout') === "twocolumn") {
            document.body.classList.contains('twocolumn-panel') ? document.body.classList.remove('twocolumn-panel') : document.body.classList.add('twocolumn-panel');
        }
    };

    return (
        <React.Fragment>
            <header id="page-topbar" className={headerClass}>
                <div className="layout-width">
                    <div className="navbar-header">
                        <div className="d-flex">

                            <div className="navbar-brand-box horizontal-logo">
                                <MainLogo />
                            </div>

                            <button
                                onClick={toogleMenuBtn}
                                type="button"
                                className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger"
                                id="topnav-hamburger-icon">
                                <span className="hamburger-icon">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </span>
                            </button>

                            <SearchOption />
                        </div>

                        <div className="d-flex align-items-center">

                            <Dropdown isOpen={search} toggle={toogleSearch} className="d-md-none topbar-head-dropdown header-item">
                                <DropdownToggle type="button" tag="button" className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle">
                                    <i className="bx bx-search fs-22"></i>
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-lg dropdown-menu-end p-0">
                                    <Form className="p-3">
                                        <div className="form-group m-0">
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder={t('search') + '...'}
                                                    aria-label="Recipient's username" />
                                                    <button className="btn btn-primary" type="submit"><i
                                                    className="mdi mdi-magnify"></i></button>
                                            </div>
                                        </div>
                                    </Form>
                                </DropdownMenu>
                            </Dropdown>

                            {/* LanguageDropdown */}
                            <LanguageDropdown />

                            {/* WebAppsDropdown */}
                            {/* <WebAppsDropdown /> */}

                            {/* MyCartDropdwon */}
                            {/* <MyCartDropdown /> */}

                            {/* FullScreenDropdown */}
                            <FullScreenDropdown />

                            {/* Dark/Light Mode set */}
                            <LightDark
                                layoutMode={layoutModeType}
                                onChangeLayoutMode={onChangeLayoutMode}
                            />

                            {/* NotificationDropdown */}
                            {/* <NotificationDropdown /> */}

                            {/* ProfileDropdown */}
                            <ProfileDropdown />

                            <ThemeCustomizer />
                        </div>
                    </div>
                </div>
            </header>
        </React.Fragment>
    );
};

export default Header;