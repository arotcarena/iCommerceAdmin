import { useEffect, useMemo, useState } from "react";
import { useScrollYListener } from "./useScrollListener";

export const useTopFixedBar = (
    wrapperElt: HTMLElement,
    topGap: number = 0,
    bottomGap: number = 0,
    leftGap: number = 0,
    rightGap: number = 0,
) => {
    const [isFixed, setIsFixed] = useState(false);
    const scrollY = useScrollYListener();
    useEffect(() => {
        const fixedZoneBottom = wrapperElt.offsetTop + wrapperElt.getBoundingClientRect().height + bottomGap;
        const fixedZoneTop = wrapperElt.offsetTop + topGap;
        const currentPosition = scrollY;

        if(currentPosition < fixedZoneTop && isFixed) {
            setIsFixed(false);
            return;
        }
        if(currentPosition > fixedZoneTop && currentPosition < fixedZoneBottom && !isFixed) {
            setIsFixed(true);
            return;
        }
        if(currentPosition > fixedZoneBottom && isFixed) {
            setIsFixed(false);
        }
    }, [scrollY, wrapperElt.getBoundingClientRect().width]);

    const [left, right] = useMemo(() => {
        return [
            wrapperElt.getBoundingClientRect().left - leftGap,
            window.innerWidth - wrapperElt.getBoundingClientRect().right - rightGap,
        ];
    }, [wrapperElt.getBoundingClientRect().width]);

    return {
        isFixed,
        left,
        right
    };
}
