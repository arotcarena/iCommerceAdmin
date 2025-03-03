import { MouseEvent } from "react"
import { useTranslation } from "react-i18next"

type Props = {
    value: string,
    onReset: (key: string) => void
}

export const SortCard = ({
    value,
    onReset
}: Props) => {
    const {t} = useTranslation();

    const handleClick = (e: MouseEvent) => {
        e.preventDefault();
        onReset('sortBy');
    }

    const parts = value.split('_');
    if(parts.length < 2) {
        return '';
    }

    const field = parts[0];
    const orderDirection = parts[1];

    const arrowDirection = orderDirection === 'DESC' ? 'down': 'up';

    return (
        <div className="filter-card card mb-3 position-relative border-secondary" style={{maxWidth: '18rem'}}>
            <div className="card-body d-flex align-items-center pt-0 pb-0" style={{minHeight: '53px'}}>
                <i className={'ri-arrow-' + arrowDirection + '-line ri-xl me-2'}></i>{' '}
                <div>
                    <div style={{fontSize: '.8em', fontWeight: '600'}}>{t('sorted')} :</div>
                    <div>{t(field)}</div>
                </div>
                <button className="btn position-absolute" style={{top: '-5px', right: '-5px'}} type="button" onClick={handleClick}>
                    <i className="ri-close-line ri-xl"></i>
                </button>
            </div>
        </div>
    )
}
