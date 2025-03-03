const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

export const matchIsoDate = (dateString: string) => {
    return regex.test(dateString);
}
