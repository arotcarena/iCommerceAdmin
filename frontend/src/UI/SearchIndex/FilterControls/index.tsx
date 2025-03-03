import { useTranslation } from "react-i18next"
import { Button, Col, Row } from "reactstrap"
import { FiltersType } from "type/searchTypes"
import { FilterCard } from "./FilterCard"
import { SortCard } from "./SortCard"

type Props = {
    countFilters: number,
    resetFilters: () => void,
    resetFilter: (name: string) => void,
    filters: FiltersType,
    canShowFilter: (name: string) => boolean
}

export const FilterControls = ({
    countFilters,
    resetFilters,
    resetFilter,
    filters,
    canShowFilter
}: Props) => {
    const {t} = useTranslation();

    return (
        <div 
            className={'d-flex align-items-center ms-auto' + (countFilters ? ' mt-1 mb-1': '')} 
            style={{flexWrap: 'wrap', columnGap: '20px', rowGap: '10px'}}
        >
            <div className="filters-list">
                {
                    filters?.sortBy && (
                        <SortCard
                            value={filters.sortBy}
                            onReset={resetFilter}
                        />
                    )
                }
                {
                    Object.entries(filters).map(([name, value], index) => (
                        canShowFilter(name) && (
                            <FilterCard
                                key={index}
                                name={name}
                                value={value}
                                onReset={resetFilter}
                            />
                        )
                    ))
                }
            </div>
            {
                (countFilters > 0 || filters?.sortBy) && (
                    <Col className="col-xxl-4 col-sm-4 mt-1">
                        <div style={{minWidth: '300px', maxWidth: '350px'}}>
                            <Button
                                type="button"
                                color="primary"
                                className="btn w-100"
                                onClick={resetFilters}
                            >
                                <i className="ri-delete-bin-line"></i>{' '}
                                {t('remove_filters', {count: countFilters})}
                            </Button>
                        </div>
                    </Col>
                )
            }
        </div>
    )
}