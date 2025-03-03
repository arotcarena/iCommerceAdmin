import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

//Import Icons
import { generateUrl } from "functions/router/urlGenerator";
import { haveArraysCommonValue } from "functions/arrayHelpers/commonValuesChecker";

type MenuState = {
    firstLevel: string,
    secondLevel: string|null,
    thirdLevel: string|null,
    [key: string]: string|null
}

const Navdata = () => {
    
    const {pathname} = useLocation();

    useEffect(() => {
        //firstLevel
        if(pathname.includes('administration')) {
            //secondLevel
            if(pathname.includes('administration/users')) {
               setMenuState({
                   firstLevel: 'admin',
                   secondLevel: 'users',
                   thirdLevel: null
               });
           }
        } else {
            setMenuState({
                firstLevel: 'home',
                secondLevel: null,
                thirdLevel: null
            });
        }
    }, [pathname]);
    
    const [menuState, setMenuState] = useState<MenuState>({
        firstLevel: 'home',
        secondLevel: null,
        thirdLevel: null
    });

    const changeMenuState = (level: string, value: string|null) => {
        setMenuState(prevMenuState => ({
            ...prevMenuState,
            [level]: value
        }));
    }
    const toggleMenuState = (level: string, value: string|null) => {
        setMenuState(prevMenuState => ({
            ...prevMenuState,
            [level]: prevMenuState[level] === value ? null: value
        }));
    }

    const menuItems: any = [
        {
            label: "",
            isHeader: true,
        },
        {
            id: "home",
            label: "dashboard",
            icon: <i className="ri ri-home-4-line"></i>,
            link: generateUrl('home'),
            click: () => changeMenuState('firstLevel', 'home'),
            active: menuState.firstLevel === 'home',
        },
        {
            id: "administration",
            label: "administration",
            icon: <i className = "ri ri-admin-line"></i>,
            link: "/#",
            click: (e: any) => {
                e.preventDefault();
                toggleMenuState('firstLevel', 'admin');
            },
            active: menuState.firstLevel === 'admin',
            subItems: [
                {
                    id: "users",
                    label: "users",
                    link: generateUrl('users'),
                    click: () => changeMenuState('secondLevel', 'users'),
                    active: menuState.secondLevel === 'users',
                    parentId: "admin",
                },
            ]
        },
    ];

    return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
