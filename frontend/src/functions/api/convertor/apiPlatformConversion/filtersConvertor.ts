import { changeHours } from "functions/dateHelpers/hoursChanger";
import { TabColumn } from "type/superCrudTypes";

export const NEEDS_REMOVE_FILTERNAME_END_TAG = '_#_';

export const convertFiltersToApiPlatformFilters = (filters: object, columns?: TabColumn[]): object => {
    let apiFilters = {};
    for(const [name, value] of Object.entries(filters)) {
        let apiFilterName = name;
        let apiFilterValue = value;

        // itemsPerPage
        if(apiFilterName === 'itemsPerPage' && apiFilterValue === 'all') {
            apiFilterValue = undefined;
        }

        //dataTransform
        //find corresponding column if exists
        const col = columns?.find(col => {
            let fieldName = name === 'sortBy' ? (
                value.split('_')[0]
            ): (
                apiFilterName.replace('min_', '').replace('max_', '').replace('before_', '').replace('after_', '')
            );
            return col.name === fieldName;
        });

        //relation property
        if(col?.relationProperty) {
            //update field name (ex: entity.property_DESC instead of property_DESC)
            if(apiFilterName === 'sortBy' && apiFilterValue.split('_')?.length === 2) {
                apiFilterValue = col.relationProperty + '_' + apiFilterValue.split('_')[1];
            } else if(apiFilterName.includes('_')) {
                apiFilterName = apiFilterName.split('_')[0] + '_' + col.relationProperty;
            } else {
                apiFilterName = col.relationProperty;
            }
        }

        //sort
        //ORDER
        if(apiFilterName === 'sortBy' && apiFilterValue.split('_')?.length === 2) {
            const sortField = apiFilterValue.split('_')[0];
            const sortDir = apiFilterValue.split('_')[1];
            apiFilterName = 'order[' + sortField + ']';
            apiFilterValue = sortDir;
        }

        //RANGE
        //min | max
        else if(apiFilterName.includes('min_')) {
            apiFilterName = apiFilterName.replace('min_', '') + '[gte]';
        } else if(apiFilterName.includes('max_')) {
            apiFilterName = apiFilterName.replace('max_', '') + '[lte]';
        }
        //before | after
        else if(apiFilterName.includes('before_')) {
            apiFilterName = apiFilterName.replace('before_', '') + '[before]';
            // set hour to 23:59:59
            if(apiFilterValue) {
                apiFilterValue = changeHours(apiFilterValue, 23, 59, 59);
            }
        } else if(apiFilterName.includes('after_')) {
            apiFilterName = apiFilterName.replace('after_', '') + '[after]';
            // set hour to 00:00:00
            if(apiFilterValue) {
                apiFilterValue = changeHours(apiFilterValue, 0, 0, 0);
            }
        }

        //multiple (entity field or select field)
        if(Array.isArray(value)) {
            let i = 0;
            for(const v of value) {
                i++;
                apiFilters = {
                    ...apiFilters,
                    [apiFilterName + '[]' + NEEDS_REMOVE_FILTERNAME_END_TAG + i]: v 
                    //we need to add a number (i) to avoid filters to be overwritten
                    //NEEDS_REMOVE_FILTERNAME_END_TAG is used to recognize multiple filter that will need a custom process when transforming to string ("i" will be removed)
                };
            }
        } else if(apiFilterValue !== undefined) {
            apiFilters = {
                ...apiFilters,
                [apiFilterName]: apiFilterValue
            };
        }
    }
    return apiFilters;
}
