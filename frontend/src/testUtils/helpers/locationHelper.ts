import { screen } from "@testing-library/react";
import { generateUrl } from "functions/router/urlGenerator";

export const getTestLocation = (): string|null => {
    const locationDisplay = screen.getByTestId('location-display');

    return locationDisplay.textContent;
}

export const expectLocation = (routeName: string, params: {[key: string]: string|number} = {}) => {
    expect(getTestLocation()).toEqual(generateUrl(routeName, params));
}