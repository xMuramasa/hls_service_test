export const isEmptyOrUndefined = (value: any, kind: string) => {
    switch (kind) {
        case 'string':
            return value === '' || value === undefined || value === null;
        case 'number':
            return value === 0 || value === undefined || value === null;
        case 'object':
            return (value && Object.keys(value).length === 0) || value === undefined || value === null;
        case 'array':
            return value.length === 0 || value === undefined || value === null;
        default:
            return false;
    }
}