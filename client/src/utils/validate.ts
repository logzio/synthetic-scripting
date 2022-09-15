type EnvVariable = {
	[key: string]: string;
};
export const validateMetaDeploy = (name: string, token: string, listener: string, region: string, bucket: string, accessKey: string, secretKey: string) => {

	//  TODO:Refactor to more reuseful code
	if (name === '') {
		return {
			status: false,
			errorMessage: 'Function name is required please fill proper data.',
			errorTitle: "Function name"
		}
	}
	if (token === '') {
		return {
			status: false,
			errorMessage: 'Logz.io token is required please fill proper data.',
			errorTitle: "Logz.io token"

		}
	}
	if (listener === '') {
		return {
			status: false,
			errorMessage: 'Logz.io listener is required please fill proper data.',
			errorTitle: "Logz.io Listener"

		}
	}
	if (region === '') {
		return {
			status: false,
			errorMessage: 'Region is required please fill proper data.',
			errorTitle: "Region"

		}
	}

	if (bucket === '') {
		return {
			status: false,
			errorMessage: 'Bucket is required please fill proper data.',
			errorTitle: "Bucket"

		}
	}
	if (accessKey === '') {
		return {
			status: false,
			errorMessage: 'Access Key is required please fill proper data.',
			errorTitle: "Access Key"

		}
	}
	if (secretKey === '') {
		return {
			status: false,
			errorMessage: 'Secret Key is required please fill proper data.',
			errorTitle: "Secret Key"

		}
	}


	return {
		status: true,
		errorMessage: 'No errors',
		errorTitle: 'No error'
	};

}


export const validateMetaDownload = (name: string, token: string, listener: string, region: string, bucket: string) => {

	if (name === '') {
		return {
			status: false,
			errorMessage: 'Function name is required please fill proper data.',
			errorTitle: "Function name"
		}
	}
	if (token === '') {
		return {
			status: false,
			errorMessage: 'Logz.io token is required please fill proper data.',
			errorTitle: "Logz.io token"

		}
	}
	if (listener === '') {
		return {
			status: false,
			errorMessage: 'Logz.io listener is required please fill proper data.',
			errorTitle: "Logz.io listener"

		}
	}
	if (region === '') {
		return {
			status: false,
			errorMessage: 'Region is required please fill proper data.',
			errorTitle: "Region"

		}
	}

	if (bucket === '') {
		return {
			status: false,
			errorMessage: 'Bucket is required please fill proper data.',
			errorTitle: "Bucket"

		}
	}
	return {
		status: true,
		errorMessage: 'No errors',
		errorTitle: 'No error'
	};

}


export const containsKeys = (newEnvVariable: EnvVariable, list: EnvVariable[]) => {
	const newKey = Object.keys(newEnvVariable)[0];
	console.log(newKey)
	console.log(list);
	for (let i = 0; i < list.length; i++) {
		console.log(list[i])
		console.log(Object.keys(list[i])[0])
		if (newKey === Object.keys(list[i])[0]) {
			return true;
		}

		// if (list.hasOwnProperty(x) && list[x] === obj) {
		// 	return true;
		// }
	}

	return false;
}