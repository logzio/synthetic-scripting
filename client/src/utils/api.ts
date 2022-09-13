import downloadZip from "./downloadZip";

const BASE_URL = 'http://localhost:8080';
interface CustomResponse {
	zip?: string;
	error?: boolean;
	errorData?: string;
	message?: string;
}


const settings = {
	notificationLoaded: '.loaded',
	notificationFailed: '.loaded-fail',
	statusName: {
		functionCreated: 'Function Created',
		zipCreated: 'Zip Created',
		zipUploaded: 'Zip Uploaded',
		lambdaCreated: 'Lambda Created',
		rangeTimeAdded: 'Range time added',
	},
	endPointUrls: {
		modifyFileUrl: '/api/modify-file',
		createZipUrl: '/api/create-zip',
		uploadZipUrl: '/api/uploadZip',
		createLambdaUrl: '/api/create-lambda',
		addEventBridgeUrl: '/api/add-eventbridge',
		modifyFileLocalUrl: '/api/modify-file-local',
		createCfZip: '/api/create-cf-zip',
	},
};
export type FetcherOptions = {
	queryString: string
	variables?: FetcherVariables
}

export type FetcherVariables = { [key: string]: string | any | undefined }



class Api {
	baseUrl: string;
	constructor(baseUrl: string) {
		this.baseUrl = baseUrl
	}


	customFetch = async (bodyToSend: object, url: string): Promise<CustomResponse> => {
		return await fetch(`${BASE_URL}${url}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			...(Object.keys(bodyToSend).length > 0
				? { body: JSON.stringify(bodyToSend) }
				: {}),
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				} else {
					throw res;
				}
			})
			.catch((err) => {
				console.log(err);
				//display error
				return err.json();
			});
	};


	testLocal = async (codeSnippet: string) => {
		const responseLocal = await this.customFetch(
			{
				code: codeSnippet,

			},
			settings.endPointUrls.modifyFileLocalUrl,
		);
		if (!responseLocal.error) {
			// this.addNotification(
			//     'Local Test successfuly ended',
			//     typeOfNotification.success,
			// );
			return responseLocal
		} else {
			// this.addNotification(
			//     'Something went wrong please check data what you provided',
			//     typeOfNotification.warning,
			// );
			// this.errorDisplay(responseLocal.errorData);
			return responseLocal

		}
	};

	initPage = async (rangeTime: number, codeSnippet: string, name: string, accessKey: string, secretKey: string, bucketName: string, token: string, listenerUrl: string, region: string, listEnvVariables: object, description?: string) => {

		// notificationFileModify.style.display = 'flex';
		const responseModify = await this.customFetch(
			{ code: codeSnippet },
			settings.endPointUrls.modifyFileUrl,
		);
		if (!responseModify.error) {
			// this.displayGoodStatus(
			//     notificationFileModify,
			//     notificationZipCreate,
			//     'Function Created',
			// );
			// return responseModify;
		} else {
			// this.errorDisplay(responseModify.errorData);
			// this.displayFailedStatus(notificationFileModify);
			return responseModify;
		}
		const responseToZip = await this.customFetch(
			{ name },
			settings.endPointUrls.createZipUrl,
		);
		if (!responseToZip.error) {
			// this.displayGoodStatus(
			//     notificationZipCreate,
			//     notificationZipUpload,
			//     'Zip Created',
			// );
		} else {
			// this.errorDisplay(responseToZip.errorData);
			// this.displayFailedStatus(notificationZipCreate);
			return responseToZip;
		}

		const responseUploadZip = await this.customFetch(
			{
				accessKey,
				secretKey,
				bucketName,
				name,
			},
			settings.endPointUrls.uploadZipUrl,
		);
		if (!responseUploadZip.error) {
			// this.displayGoodStatus(
			// 	notificationZipUpload,
			// 	notificationLambdaCreate,
			// 	'Zip Uploaded',
			// );
			const response = await this.customFetch(
				{
					name,
					description,
					accessKey,
					secretKey,
					bucketName,
					token,
					region,
					listEnvVariables,
					listenerUrl,
				},
				settings.endPointUrls.createLambdaUrl,
			);

			if (!response.error) {
				// this.displayGoodStatus(
				// 	notificationLambdaCreate,
				// 	notificationAddRange,
				// 	'Lambda Created',
				// );
			} else {
				// this.errorDisplay(response.errorData);
				// this.displayFailedStatus(notificationLambdaCreate);
				return response;
			}
		} else {
			// this.errorDisplay(responseUploadZip.errorData);
			// this.displayFailedStatus(notificationZipUpload);
			return responseUploadZip;
		}
		const cloudBridgeEventResp = await this.customFetch(
			{
				name,
				rangeTime,
				accessKey,
				secretKey,
				region,
			},
			settings.endPointUrls.addEventBridgeUrl,
		);
		if (!cloudBridgeEventResp.error) {
			// this.displayGoodStatus(
			// 	notificationAddRange,
			// 	null,
			// 	'Range time added',
			// );
			//update progressBar
			// this.updateProgressBar('code', 'add');
		} else {
			// this.errorDisplay(cloudBridgeEventResp.errorData);
			// this.displayFailedStatus(notificationAddRange);
			return cloudBridgeEventResp;
		}
	};
	downloadCFTemplate = async (codeSnippet: string, envList: object, name: string, rangeTime: number, bucket: string, token: string, listener: string, description?: string) => {

		const responseModify = await this.customFetch(
			{ code: codeSnippet },
			settings.endPointUrls.modifyFileUrl,
		);
		if (!responseModify.error) {
			// this.displayGoodStatus(
			//     notificationFileModify,
			//     notificationZipCreate,
			//     'Function Created',
			// );
		} else {
			// this.errorDisplay(responseModify.errorData);
			// this.displayFailedStatus(notificationFileModify);
			return responseModify;
		}
		const responseToZip = await this.customFetch(
			{
				envList,
				name,
				description,
				token,
				bucket,
				listener,
				rangeTime
			},
			settings.endPointUrls.createCfZip,
		);

		if (!responseToZip.error) {
			// this.displayGoodStatus(
			//     notificationZipCreate,
			//     null,
			//     'Zip Downloaded',
			// );
			downloadZip(responseToZip.zip);
		} else {
			// this.errorDisplay(responseToZip.errorData);
			// this.displayFailedStatus(notificationZipCreate);
			return responseToZip;
		}
	};

}

const api = new Api(BASE_URL)

export default api;