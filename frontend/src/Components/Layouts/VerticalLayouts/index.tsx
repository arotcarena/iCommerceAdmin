import React, { useEffect, useCallback } from 'react';
import { Link, useLocation } from "react-router-dom";
import { Collapse } from 'reactstrap';
// Import Data
import navdata from "../LayoutMenuData";
import { useTheme } from 'Components/Contexts/Theme/ThemeContext';
import { useTranslation } from 'react-i18next';

export const VerticalLayout = (props: any) => {
    const {t} = useTranslation();

    const location = useLocation();

    const navData = navdata().props.children;

        /*
    layout settings
    */
    const {theme: {leftsidbarSizeType, sidebarVisibilitytype, layoutType}} = useTheme();

    //vertical and semibox resize events
    const resizeSidebarMenu = useCallback(() => {
        var windowSize = document.documentElement.clientWidth;
        if (windowSize >= 1025) {
            if (document.documentElement.getAttribute("data-layout") === "vertical") {
                document.documentElement.setAttribute("data-sidebar-size", leftsidbarSizeType);
            }
            if (document.documentElement.getAttribute("data-layout") === "semibox") {
                document.documentElement.setAttribute("data-sidebar-size", leftsidbarSizeType);
            }
            var hamburgerIcon = document.querySelector(".hamburger-icon");
            if ((sidebarVisibilitytype === "show" || layoutType === "vertical" || layoutType === "twocolumn") && document.querySelector(".hamburger-icon")) {
                if (hamburgerIcon !== null) {
                    hamburgerIcon.classList.remove("open");
                }
            } else {
                if (hamburgerIcon !== null) {
                    hamburgerIcon.classList.add("open");
                }
            }

        } else if (windowSize < 1025 && windowSize > 767) {
            document.body.classList.remove("twocolumn-panel");
            if (document.documentElement.getAttribute("data-layout") === "vertical") {
                document.documentElement.setAttribute("data-sidebar-size", "sm");
            }
            if (document.documentElement.getAttribute("data-layout") === "semibox") {
                document.documentElement.setAttribute("data-sidebar-size", "sm");
            }
            if (document.querySelector(".hamburger-icon")) {
                document.querySelector(".hamburger-icon")?.classList.add("open");
            }
        } else if (windowSize <= 767) {
            document.body.classList.remove("vertical-sidebar-enable");
            if (document.documentElement.getAttribute("data-layout") !== "horizontal") {
                document.documentElement.setAttribute("data-sidebar-size", "lg");
            }
            if (document.querySelector(".hamburger-icon")) {
                document.querySelector(".hamburger-icon")?.classList.add("open");
            }
        }
    }, [leftsidbarSizeType, sidebarVisibilitytype, layoutType]);

    useEffect(() => {
        window.addEventListener("resize", resizeSidebarMenu, true);
    }, [resizeSidebarMenu]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const initMenu = () => {
            const ul:any = document.getElementById("navbar-nav");
            const items = ul.getElementsByTagName("a");
            let itemsArray = [...items]; // converts NodeList to Array
            itemsArray.map((x) => {
                if(x.dataset.active === true) {
                    activateParentDropdown(x);
                }
            });
        };
        initMenu();
    }, [location.pathname, props.layoutType]);

    function activateParentDropdown(item:any) {

        item.classList.add("active");
        let parentCollapseDiv = item.closest(".collapse.menu-dropdown");

        if (parentCollapseDiv) {

            // to set aria expand true remaining
            parentCollapseDiv.classList.add("show");
            parentCollapseDiv.parentElement.children[0].classList.add("active");
            parentCollapseDiv.parentElement.children[0].setAttribute("aria-expanded", "true");
            if (parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown")) {
                parentCollapseDiv.parentElement.closest(".collapse").classList.add("show");
                if (parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling)
                    parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling.classList.add("active");
                if (parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling.closest(".collapse")) {
                    parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling.closest(".collapse").classList.add("show");
                    parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling.closest(".collapse").previousElementSibling.classList.add("active");
                }
            }
            return false;
        }
        return false;
    }

    return (
        <React.Fragment>
            {/* menu Items */}
            {(navData || []).map((item: any, key: number) => {
                return (
                    <React.Fragment key={key}>
                        {/* Main Header */}
                        {item['isHeader'] ?
                            <li className="menu-title"><span data-key="t-menu">{t(item.label)}</span></li>
                            : (
                                (item.subItems ? (
                                    <li className="nav-item">
                                        <Link
                                            onClick={item.click}
                                            className={'nav-link menu-link' + (item.active ? ' active': '')}
                                            to={item.link ? item.link : "/#"}
                                            data-bs-toggle="collapse"
                                            data-active={item.active}
                                        >
                                            {item.icon} <span data-key="t-apps">{t(item.label)}</span>
                                        </Link>
                                        <Collapse
                                            className="menu-dropdown"
                                            isOpen={item.active}
                                            id="sidebarApps">
                                            <ul className="nav nav-sm flex-column test">
                                                {/* subItms  */}
                                                {item.subItems && ((item.subItems || []).map((subItem: any, key: number) => (
                                                    <React.Fragment key={key}>
                                                        {!subItem.isChildItem ? (
                                                            <li className="nav-item">
                                                                <Link
                                                                    onClick={subItem.click}
                                                                    to={subItem.link ? subItem.link : "/#"}
                                                                    className={'nav-link' + (subItem.active ? ' active': '')}
                                                                    data-active={subItem.active}
                                                                >
                                                                    {t(subItem.label)}
                                                                    {subItem.badgeName ?
                                                                        <span className={"badge badge-pill bg-" + subItem.badgeColor} data-key="t-new">{subItem.badgeName}</span>
                                                                        : null}
                                                                </Link>
                                                            </li>
                                                        ) : (
                                                            <li className="nav-item">
                                                                <Link
                                                                    onClick={subItem.click}
                                                                    className={'nav-link' + (subItem.active ? ' active': '')}
                                                                    to="/#"
                                                                    data-bs-toggle="collapse"
                                                                    data-active={subItem.active}
                                                                > {t(subItem.label)}
                                                                    {subItem.badgeName ?
                                                                        <span className={"badge badge-pill bg-" + subItem.badgeColor} data-key="t-new">{subItem.badgeName}</span>
                                                                        : null}
                                                                </Link>
                                                                <Collapse className="menu-dropdown" isOpen={subItem.active} id="sidebarEcommerce">
                                                                    <ul className="nav nav-sm flex-column">
                                                                        {/* child subItms  */}
                                                                        {subItem.childItems && (
                                                                            (subItem.childItems || []).map((childItem: any, key: number) => (
                                                                                <React.Fragment key={key}>
                                                                                    {!childItem.childItems ?
                                                                                        <li className="nav-item">
                                                                                            <Link
                                                                                                to={childItem.link ? childItem.link : "/#"}
                                                                                                onClick={childItem.click}
                                                                                                className={'nav-link' + (childItem.active ? ' active': '')}
                                                                                                data-active={childItem.active}
                                                                                                >
                                                                                                {t(childItem.label)}
                                                                                            </Link>
                                                                                        </li>
                                                                                        : <li className="nav-item">
                                                                                            <Link 
                                                                                                to="/#"
                                                                                                className={'nav-link' + (childItem.active ? ' active': '')}
                                                                                                onClick={childItem.click}
                                                                                                data-bs-toggle="collapse"
                                                                                                data-active={childItem.active}
                                                                                                >
                                                                                                {t(childItem.label)}
                                                                                            </Link>
                                                                                            <Collapse className="menu-dropdown" isOpen={childItem.active} id="sidebaremailTemplates">
                                                                                                <ul className="nav nav-sm flex-column">
                                                                                                    {childItem.childItems.map((subChildItem: any, key: number) => (
                                                                                                        <li className="nav-item" key={key}>
                                                                                                            <Link 
                                                                                                                to={subChildItem.link} 
                                                                                                                onClick={subChildItem.click}
                                                                                                                className={'nav-link' + (subChildItem.active ? ' active': '')}
                                                                                                                data-key="t-basic-action"
                                                                                                                data-active={subChildItem.active}
                                                                                                                >
                                                                                                                    {t(subChildItem.label)}
                                                                                                            </Link>
                                                                                                        </li>
                                                                                                    ))}
                                                                                                </ul>
                                                                                            </Collapse>
                                                                                        </li>
                                                                                    }
                                                                                </React.Fragment>
                                                                            ))
                                                                        )}
                                                                    </ul>
                                                                </Collapse>
                                                            </li>
                                                        )}
                                                    </React.Fragment>
                                                ))
                                                )}
                                            </ul>

                                        </Collapse>
                                    </li>
                                ) : (
                                    <li className="nav-item">
                                        <Link
                                            className={'nav-link menu-link' + (item.active ? ' active': '')}
                                            onClick={item.click}
                                            to={item.link ? item.link : "/#"}
                                            data-active={item.active}
                                            >
                                            {item.icon} <span>{t(item.label)}</span>
                                            {item.badgeName ?
                                                <span className={"badge badge-pill bg-" + item.badgeColor} data-key="t-new">{item.badgeName}</span>
                                                : null}
                                        </Link>
                                    </li>
                                ))
                            )
                        }
                    </React.Fragment>
                );
            })}
        </React.Fragment>
    );
};

