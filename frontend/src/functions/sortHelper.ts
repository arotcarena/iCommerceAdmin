/**
 * sortBy ex: price_ASC
 */
export const getFutureSortDir = (sortBy: any, field: string): 'ASC'|'DESC' => {
    if (sortBy && typeof sortBy === 'string' && sortBy.includes(field) && sortBy.includes('ASC')) {
      return 'DESC';
    }
    return 'ASC';
}
