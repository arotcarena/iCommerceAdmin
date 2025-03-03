import { usePagination } from "functions/customHooks/usePagination";
import { useTranslation } from "react-i18next";
import { Row } from "reactstrap";

type Props = {
    itemsPerPage: number|null,
    countShowingItems: number,
    totalItems: number,
    page: number,
    onChange: (page: number) => void
  };
  
  export function TabPagination({
    itemsPerPage,
    countShowingItems,
    totalItems,
    page,
    onChange
  }: Props) {
    const {t} = useTranslation();
  
    const {
      hasPrevious,
      hasNext,
      goToPrevious,
      goToNext,
      pageLinks
    } = usePagination(page, itemsPerPage, totalItems, onChange, 2);

    let startingOffset = 1;
    let endingOffset = totalItems;

    if(itemsPerPage) {
      startingOffset = ((itemsPerPage * page) - itemsPerPage) + 1;
      endingOffset = (startingOffset - 1 + itemsPerPage) > totalItems ? totalItems: (startingOffset - 1 + itemsPerPage);
    }

    return (
      <Row className="align-items-center mt-2 g-3 text-center text-sm-start card-body ms-4 me-4">
        <div className="col-sm">
          <div className="text-muted" dangerouslySetInnerHTML={{__html: totalItems > 1 ? (
            t('showing_results', {
              startingOffset,
              endingOffset,
              countTotal: totalItems,
              count: countShowingItems
            })
          ): (
            totalItems === 0 ? (
              t('showing_results_0')
            ): (
              t('showing_results_alone')
            )
          )}}></div>
        </div>
        {
          pageLinks.length > 1 && (
            <div className="col-sm-auto">
              <ul className="pagination pagination-separated pagination-md justify-content-center justify-content-sm-start mb-0">
                <li className={hasPrevious ? "page-item": "page-item disabled"}>
                  <button type="button" className="page-link" onClick={goToPrevious}>{t('previous')}</button>
                </li>
                {
                  pageLinks.map(pageNumber => (
                    <li key={pageNumber} className="page-item">
                      <button type="button" className={pageNumber === page ? "page-link active" : "page-link"} onClick={() => onChange(pageNumber)}>
                        {pageNumber}
                      </button>
                    </li>
                  ))
                }
                <li className={hasNext ? "page-item": "page-item disabled"}>
                  <button type="button" className="page-link" onClick={goToNext}>{t('next')}</button>
                </li>
              </ul>
            </div>
          )
        }
      </Row>
    )
  }
  