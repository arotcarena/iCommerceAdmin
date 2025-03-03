import { useTranslation } from "react-i18next";


function Dashboard() {
    const {t} = useTranslation();

    return (
        <div>
           <h1>{t('dashboard')}</h1>
        </div>
    )
};

export default Dashboard;
