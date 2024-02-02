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

// save data to local storage
export const getFromLocalStorage = (key: string) => {
	try {
		const info = localStorage.getItem(key);
		return info;
	} catch (error) {
		console.log("Error While getting Data from Local Storage", error);
		return null;
	}
}

export const saveToLocalStorage = (data: any, key: string) => {
	try {
		localStorage.setItem(key, data);
	} catch (error) {
		console.log("Error While Saving Data to Local Storage", error);
	}
}