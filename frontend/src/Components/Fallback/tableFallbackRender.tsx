import { t } from "i18next"
import { FallbackProps } from "react-error-boundary"


export const cellFallbackRender = ({error, resetErrorBoundary}: FallbackProps) => {
    return (
        <td>
            <div style={{fontSize: '.8em'}} className="text-danger mb-2">{t('error.failure')}</div>
            <button className="btn btn-light btn-sm" onClick={resetErrorBoundary}>{t('retry')}</button>
        </td>
    )
}

export const tableFallbackRender = ({error, resetErrorBoundary}: FallbackProps) => {
    return (
        <tr className="table-fallback">
            <div className="text-danger mb-4">{t('error.failure')}</div>
            <button className="btn btn-light" onClick={resetErrorBoundary}>{t('retry')}</button>
        </tr>
    )
}

export const paginationFallbackRender = ({error, resetErrorBoundary}: FallbackProps) => {
    return (
        <div className="text-center row m-4">
            <div className="col-8 text-danger">
                {t('error.pagination_display')}
            </div>
            <div className="col-4">
                <button className="btn btn-light" onClick={resetErrorBoundary}>{t('retry')}</button>
            </div>
        </div>
    )
}

export const columnsSelectorFallbackRender = ({error, resetErrorBoundary}: FallbackProps) => {
    return (
        <div className="m-4 pt-4 page-sticky" style={{alignSelf: 'flex-start'}}>
            <div className="text-danger">
                {t('error.columns_selector_show')}
            </div>
            <div className="mt-4">
                <button className="btn btn-light" onClick={resetErrorBoundary}>{t('retry')}</button>
            </div>
        </div>
    )
}