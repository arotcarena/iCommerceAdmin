import { resolvePageLinks } from "functions/pagination/resolvePageLinks";

export const usePagination = (
    page: number,
    itemsPerPage: number|null,
    totalItems: number,
    onChange: (page: number) => void,
    linksToShow: number = 3
): {
    countPages: number,
    hasPrevious: boolean,
    hasNext: boolean,
    goToPrevious: () => void,
    goToNext: () => void,
    pageLinks: number[]
} => {

    let countPages = 1;
    if(itemsPerPage) {
      countPages = Math.ceil(totalItems / itemsPerPage);
    }

    const hasPrevious = page > 1;
    const hasNext = page < countPages;
  
    const goToPrevious = () => {
      if(hasPrevious) {
        onChange(page - 1)
      }
    }
  
    const goToNext = () => {
      if(hasNext) {
        onChange(page + 1)
      }
    }

    const pageLinks = resolvePageLinks(page, linksToShow, countPages);

    return {
        countPages,
        hasPrevious,
        hasNext,
        goToPrevious,
        goToNext,
        pageLinks
    }
}