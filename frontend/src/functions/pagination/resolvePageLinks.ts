export const resolvePageLinks = (
    page: number,
    linksToShow: number,
    countPages: number
): number[] => {
    //page links
    let pageLinks = [];
    let pageLinksStart = page - linksToShow;
    let pageLinksEnd = page + linksToShow;
    if(pageLinksStart < 1) {
      pageLinksStart = 1;
      pageLinksEnd = pageLinksStart + (linksToShow * 2); 
      if(pageLinksEnd > countPages) {
        pageLinksEnd = countPages;
      }
    } else if(pageLinksEnd > countPages) {
      pageLinksEnd = countPages;
      pageLinksStart = pageLinksEnd - (linksToShow * 2);
      if(pageLinksStart < 1) {
        pageLinksStart = 1;
      }
    }
    for(let i = pageLinksStart; i <= pageLinksEnd; i++) {
      pageLinks.push(i);
    }

    if(!pageLinks.includes(1)) {
      pageLinks[0] = 1;
    }
    if(!pageLinks.includes(countPages)) {
      pageLinks[pageLinks.length - 1] = countPages;
    }

    return pageLinks;
}