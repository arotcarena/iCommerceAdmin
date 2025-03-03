export const convertDateToIsoWithoutLocaleTimezone = (dateString: string): string => {
    const date = new Date(dateString);
    const timezoneOffset = date.getTimezoneOffset();
    date.setMinutes(date.getMinutes() - timezoneOffset);
    return date.toISOString();
};
