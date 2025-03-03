import { Currency } from "type/mainTypes";

export class AppConfig {
    
    //SITE
    static SITE_URL: string = process.env.REACT_APP_SITE_URL ?? 'http://localhost:3002';

    //API
    static API_BASE_URL: string = process.env.REACT_APP_API_BASE_URL ?? 'http://localhost:8000';

    //VIEW

    //locale
    static DEFAULT_LOCALE: string = 'fr';

    //brand
    static COMPANY_NAME: string = 'Cocktailissimo';
    static COMPANY_SUBTITLE: string = 'Art of Mixing';

    //title 
    static DEFAULT_HTML_TITLE: string = 'Back-office';

    //menu
    //pages that will be always displayed
    static DEFAULT_MENU: string[] = [
        'home',
        'error_404',
        'error_403',
        'login',
        'logout',
        'profile',
        'change_password',
        'password_reset',
        'forgotten_password'
    ];

    //alerts
    static ALERT_DURATION: number = 8000;

    //notifications
    static NOTIFICATIONS_API_CALL_INTERVAL: number = 30000;

    //timezone
    static DEFAULT_TIMEZONE: string = 'Europe/Paris';

    //orders
    static ORDER_TYPE_APP = 'son';

    // currency
    static DEFAULT_CURRENCY: Currency = 'EUR';
}
