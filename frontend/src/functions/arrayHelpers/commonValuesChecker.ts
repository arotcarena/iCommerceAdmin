export const haveArraysCommonValue = (arrayA: any[], arrayB: any[]): boolean => {
    for(const a of arrayA) {
        if(arrayB.includes(a)) {
            return true;
        }
    }
    return false;
};

export const hasArrayAllValues = (array: any[], values: any[]): boolean => {
    for(const v of values) {
        if(!array.includes(v)) {
            return false;
        }
    }
    return true;
};
