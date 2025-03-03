export const formatDate = (dateString: string, lang: string = 'fr', enableTime: boolean = true, enableDate: boolean = true): string => {
    try {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'UTC',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      };
    
      const date = new Date(dateString);
      const locale = lang === 'en' ? 'en-US': 'fr-FR';
      const formatter = new Intl.DateTimeFormat(locale, options);
      const formattedDateParts = formatter.formatToParts(date);
  
      const [day, month, year, hour, minute] = [
        formattedDateParts.find(part => part.type === 'day')?.value,
        formattedDateParts.find(part => part.type === 'month')?.value,
        formattedDateParts.find(part => part.type === 'year')?.value,
        formattedDateParts.find(part => part.type === 'hour')?.value,
        formattedDateParts.find(part => part.type === 'minute')?.value,
      ];
  
      const formattedDateString = day + '/' + month + '/' + year;
  
      if(!enableTime) {
        return formattedDateString;
      }
  
      if(!enableDate) {
        return hour + ':' + minute;
      }
  
      return formattedDateString + ' ' + hour + ':' + minute;
    } catch(e) {
      return '';
    }
};
