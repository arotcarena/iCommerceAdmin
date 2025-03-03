export const scrollTop = () => {
    setTimeout(() => {
        window.scroll(0, 0);
    }, 0);
};

export const scrollToY = (scrollYPosition: number) => {
    setTimeout(() => {
        window.scroll(0, scrollYPosition);
    }, 0);
};
