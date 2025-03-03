import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Col, Collapse, Row } from 'reactstrap';

//Import Icons
import FeatherIcon from "feather-icons-react";

// Import Data
import navdata from "../LayoutMenuData";
import { useTranslation } from 'react-i18next';


export const HorizontalLayout = (props: any) => {
    const {t} = useTranslation();

    const location = useLocation(); 

    const navData = navdata().props.children;
    let menuItems: any[] = [];
    let splitMenuItems: any = [];
    let menuSplitContainer = 6;
    navData.forEach(function (value: any, key: number) {
        if (value['isHeader']) {
            menuSplitContainer++;
        }
        if (key >= menuSplitContainer) {
            let val = value;
            val.childItems = value.subItems;
            val.isChildItem = (value.subItems) ? true : false;
            delete val.subItems;
            splitMenuItems.push(val);
        } else {
            menuItems.push(value);
        }
    });

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

    function activateParentDropdown(item: any) {
        item.classList.add("active");
        let parentCollapseDiv = item.closest(".collapse.menu-dropdown");

        if (parentCollapseDiv) {

            // to set aria expand true remaining
            parentCollapseDiv.classList.add("show");
            parentCollapseDiv.parentElement.children[0].classList.add("active");
            parentCollapseDiv.parentElement.children[0].setAttribute("aria-expanded", "true");
            if (parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown")) {
                parentCollapseDiv.parentElement.closest(".collapse").classList.add("show");
                var parentElementDiv = parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling;
                if (parentElementDiv)
                    if (parentElementDiv.closest(".collapse"))
                        parentElementDiv.closest(".collapse").classList.add("show")
                parentElementDiv.classList.add("active");
                var parentElementSibling = parentElementDiv.parentElement.parentElement.parentElement.previousElementSibling;
                if (parentElementSibling) {
                    parentElementSibling.classList.add("active");
                }
            }
            return false;
        }
        return false;
    }

    return (
        <React.Fragment>
            {(menuItems || []).map((item: any, key: number) => {
                return (
                    <React.Fragment key={key}>
                        {/* Main Header */}
                        {!item['isHeader'] ?
                            (item.subItems ? (
                                <li className="nav-item">
                                    <Link
                                        onClick={item.click}
                                        className={'nav-link menu-link' + (item.active ? ' active': '')}
                                        to={item.link ? item.link : "/#"}
                                        data-bs-toggle="collapse"
                                        data-active={item.active}
                                    >
                                        {item.icon}
                                        <span data-key="t-apps">{t(item.label)}</span>
                                    </Link>
                                    <Collapse
                                        className={item.id === "baseUi" && item.subItems.length > 13 ? "menu-dropdown mega-dropdown-menu" : "menu-dropdown"}
                                        isOpen={item.active}
                                        id="sidebarApps">
                                        {/* subItms  */}
                                        {item.id === "baseUi" && item.subItems.length > 13 ? (
                                            <React.Fragment>
                                                <Row>
                                                    {item.subItems && ((item.subItems || []).map((subItem: any, key: number) => (
                                                        <React.Fragment key={key}>
                                                            {key % 2 === 0 ? (
                                                                <Col lg={4}>
                                                                    <ul className="nav nav-sm flex-column">
                                                                        <li className="nav-item">
                                                                            <Link 
                                                                                to={item.subItems[key].link} 
                                                                                className={'nav-link' + (item.subItems[key].active ? ' active': '')}
                                                                                data-active={item.subItems[key].active}
                                                                                >
                                                                                    {item.subItems[key].label}
                                                                            </Link>
                                                                        </li>
                                                                    </ul>
                                                                </Col>
                                                            ) : (
                                                                <Col lg={4}>
                                                                    <ul className="nav nav-sm flex-column">
                                                                        <li className="nav-item">
                                                                            <Link 
                                                                                to={item.subItems[key].link} 
                                                                                className={'nav-link' + (item.subItems[key].active ? ' active': '')}
                                                                                data-active={item.subItems[key].active}
                                                                            >
                                                                                {item.subItems[key].label}
                                                                            </Link>
                                                                        </li>
                                                                    </ul>
                                                                </Col>
                                                            )
                                                            }
                                                        </React.Fragment>
                                                    ))
                                                    )}
                                                </Row>
                                            </React.Fragment>
                                        ) : (
                                            <ul className="nav nav-sm flex-column test">
                                                {item.subItems && ((item.subItems || []).map((subItem: any, key: number) => (
                                                    <React.Fragment key={key}>
                                                        {!subItem.isChildItem ? (
                                                            <li className="nav-item">
                                                                <Link
                                                                    to={subItem.link ? subItem.link : "/#"}
                                                                    className={'nav-link' + (subItem.active ? ' active': '')}
                                                                    data-active={subItem.active}
                                                                >
                                                                    {t(subItem.label)}
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
                                                                </Link>
                                                                <Collapse className="menu-dropdown" isOpen={subItem.active} id="sidebarEcommerce">
                                                                    <ul className="nav nav-sm flex-column">
                                                                        {/* child subItms  */}
                                                                        {subItem.childItems && (
                                                                            (subItem.childItems || []).map((subChildItem: any, key: number) => (
                                                                                <React.Fragment key={key}>
                                                                                    {!subChildItem.isChildItem ? (
                                                                                        <li className="nav-item">
                                                                                            <Link
                                                                                                to={subChildItem.link ? subChildItem.link : "/#"}
                                                                                                className={'nav-link' + (subChildItem.active ? ' active': '')}
                                                                                                data-active={subChildItem.active}
                                                                                            >
                                                                                                {t(subChildItem.label)}
                                                                                            </Link>
                                                                                        </li>
                                                                                    ) : (
                                                                                        <li className="nav-item">
                                                                                            <Link
                                                                                                onClick={subChildItem.click}
                                                                                                className={'nav-link' + (subChildItem.active ? ' active': '')}
                                                                                                to="/#"
                                                                                                data-bs-toggle="collapse"
                                                                                                data-active={subChildItem.active}
                                                                                            > {t(subChildItem.label)}
                                                                                            </Link>
                                                                                            <Collapse className="menu-dropdown" isOpen={subChildItem.active} id="sidebarEcommerce">
                                                                                                <ul className="nav nav-sm flex-column">
                                                                                                    {/* child subItms  */}
                                                                                                    {subChildItem.childItems && (
                                                                                                        (subChildItem.childItems || []).map((subSubChildItem: any, key: number) => (
                                                                                                            <li className="nav-item apex" key={key}>
                                                                                                                <Link
                                                                                                                    to={subSubChildItem.link ? subSubChildItem.link : "/#"}
                                                                                                                    className={'nav-link' + (subChildItem.active ? ' active': '')}
                                                                                                                    data-active={subChildItem.active}
                                                                                                                    >
                                                                                                                    {t(subSubChildItem.label)}
                                                                                                                </Link>
                                                                                                            </li>
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
                                                        )}
                                                    </React.Fragment>
                                                ))
                                                )}
                                            </ul>
                                        )}
                                    </Collapse>
                                </li>
                            ) : (
                                <li className="nav-item">
                                    <Link
                                        className={'nav-link menu-link' + (item.active ? ' active': '')}
                                        to={item.link ? item.link : "/#"}
                                        data-active={item.active}
                                        >
                                        {item.icon}
                                        <span>{t(item.label)}</span>
                                    </Link>
                                </li>
                            ))
                            : (<li className="menu-title"><span data-key="t-menu">{t(item.label)}</span></li>)}
                    </React.Fragment>
                );
            })}
            {/* menu Items */}
        </React.Fragment>
    );
};

