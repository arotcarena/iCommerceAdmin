export const changeHours = (
    dateString: any,
    hours: number,
    minutes: number,
    seconds: number,
): any => {
    const date = new Date(dateString)
    const timeToAdd = 0 - date.getTimezoneOffset();
    date.setHours(hours, minutes + timeToAdd, seconds, 0);
    return date.toISOString();
}
