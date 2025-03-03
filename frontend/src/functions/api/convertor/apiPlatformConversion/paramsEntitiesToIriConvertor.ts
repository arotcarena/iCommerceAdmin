export const convertParamsEntitiesToIris = (params: {[key: string]: any}): {[key: string]: any} => {
    let preparedParams: {[key: string]: any} = {};
    for(const [key, value] of Object.entries(params)) {
        if(Array.isArray(value)) {
            let arrayValue = [];
            for(const v of value) {
                const iri = v && v['@id'] ? v['@id']: null;
                if(iri) {
                    arrayValue.push(iri);
                } else {
                    arrayValue.push(v);
                }
            }
            preparedParams[key] = arrayValue;
        } else {
            const iri = value && value['@id'] ? value['@id']: null;
            if(iri) {
                preparedParams[key] = iri;
            } else {
                preparedParams[key] = value;
            }
        }
    }
    return preparedParams;
}
