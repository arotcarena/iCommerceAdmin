import { useToggleState } from "functions/customHooks/state/useToggleState";
import { t } from "i18next";
import React, { PropsWithChildren, useEffect, useMemo, useRef, useState } from "react";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";

export const FormHeaderPatch = ({
    children,
}: PropsWithChildren) => {
    const [isOpen, toggle] = useToggleState(false);

    const ref = useRef<HTMLDivElement|null>(null);
    const [countLinks, setCountLinks] = useState<number>(0);

    const tryToCountLinks = () => {
        const links = ref.current?.querySelectorAll('a');
        if(links?.length && links.length > 0) {
            setCountLinks(links.length);
        }
    };
    useEffect(() => {
        setTimeout(() => {
            tryToCountLinks();
        }, 500);
        setTimeout(() => {
            tryToCountLinks();
        }, 1000);
        setTimeout(() => {
            tryToCountLinks();
        }, 4000);
    }, []);

    if(countLinks === 0) {
        return (
            <div ref={ref} style={{opacity: 0}}>
                {children}
            </div>
        )
    }

    return (
        <div
            className="crud-header-sticky d-flex justify-content-center ms-auto"
            style={{zIndex: 10, backgroundColor: 'transparent', background: 'none', marginBottom: '50px', marginTop: '-75px', pointerEvents: 'none'}}
        >
            <div style={{backgroundColor: '#FFF', pointerEvents: 'all'}}>
                {
                    countLinks > 1 ? (
                        <Dropdown size="md" isOpen={isOpen} toggle={toggle}>
                            <DropdownToggle tag="button" type="button" className="btn text-primary fw-semibold" style={{fontSize: '1.12em'}}>
                                <i className="ri ri-arrow-left-right-line ri-lg fw-normal"></i>{' '}
                                    {t('linked_entities')}
                                <i className="ri ri-arrow-drop-down-fill ri-xl"></i>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-end">
                                <div className="d-flex flex-column gap-3 py-2 px-4" style={{whiteSpace: 'nowrap'}}>
                                    {children}
                                </div>
                            </DropdownMenu>
                        </Dropdown>
                    ): (
                        <div className="fw-medium" style={{fontSize: '1.12em'}}>
                            {children}
                        </div>
                    )
                }
            </div>
        </div> 
    );
};
