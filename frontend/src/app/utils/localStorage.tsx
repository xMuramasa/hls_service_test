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