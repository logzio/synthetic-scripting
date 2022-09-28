

export const findObjectInArray = (obj: object, array: object[]) => {
	const newKey = Object.keys(obj)[0];
	for (let i = 0; i < array.length; i++) {
		if (newKey === Object.keys(array[i])[0]) {
			return i;
		}


	}

	return -1;
}