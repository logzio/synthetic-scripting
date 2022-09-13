
export const validateMetaDeploy = (name: string, token: string, listener: string, region: string, bucket: string, accessKey: string, secretKey: string) => {

	//  TODO:Refactor to more reuseful code
	if (name === '') {
		return {
			status: false,
			errorMessage: 'Function name is required please fill proper data.'
		}
	}
	if (token === '') {
		return {
			status: false,
			errorMessage: 'Logz.io token is required please fill proper data.'
		}
	}
	if (listener === '') {
		return {
			status: false,
			errorMessage: 'Logz.io listener is required please fill proper data.'
		}
	}
	if (region === '') {
		return {
			status: false,
			errorMessage: 'Region is required please fill proper data.'
		}
	}

	if (bucket === '') {
		return {
			status: false,
			errorMessage: 'Bucket is required please fill proper data.'
		}
	}
	if (accessKey === '') {
		return {
			status: false,
			errorMessage: 'Access Key is required please fill proper data.'
		}
	}
	if (secretKey === '') {
		return {
			status: false,
			errorMessage: 'Secret Key is required please fill proper data.'
		}
	}


	return {
		status: true,
		errorMessage: 'No errors'
	};

}


export const validateMetaDownload = (name: string, token: string, listener: string, region: string, bucket: string) => {

	if (name === '') {
		return {
			status: false,
			errorMessage: 'Function name is required please fill proper data.'
		}
	}
	if (token === '') {
		return {
			status: false,
			errorMessage: 'Logz.io token is required please fill proper data.'
		}
	}
	if (listener === '') {
		return {
			status: false,
			errorMessage: 'Logz.io listener is required please fill proper data.'
		}
	}
	if (region === '') {
		return {
			status: false,
			errorMessage: 'Region is required please fill proper data.'
		}
	}

	if (bucket === '') {
		return {
			status: false,
			errorMessage: 'Bucket is required please fill proper data.'
		}
	}
	return {
		status: true,
		errorMessage: 'No errors'

	};

}