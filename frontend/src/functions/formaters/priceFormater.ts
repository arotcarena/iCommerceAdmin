import { AppConfig } from "config/AppConfig";
import { Currency } from "type/mainTypes";

export const formatPrice = (
    amount: number, //cts
    lang: string = AppConfig.DEFAULT_LOCALE,
    currency?: Currency
): string => {
    let options: {[key: string]: any} = {};
    if(currency) {
        options = {
            style: 'currency',
            currency
        };
    }
    const numberFormater = Intl.NumberFormat(lang, options);
    return numberFormater.format(amount / 100);
}
