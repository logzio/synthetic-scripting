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
			//  TODO: need to send data for render status

			return responseLocal
		} else {

			return responseLocal

		}
	};

	initPage = async (rangeTime: number, codeSnippet: string, name: string, accessKey: string, secretKey: string, bucketName: string, token: string, listenerUrl: string, region: string, listEnvVariables: object, description?: string) => {

		const responseModify = await this.customFetch(
			{ code: codeSnippet },
			settings.endPointUrls.modifyFileUrl,
		);
		if (!responseModify.error) {
			//  TODO: need to send data for render status

		} else {

			return responseModify;
		}
		const responseToZip = await this.customFetch(
			{ name },
			settings.endPointUrls.createZipUrl,
		);
		if (!responseToZip.error) {

			//  TODO: need to send data for render status

		} else {

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
			//  TODO: need to send data for render status

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
				//  TODO: need to send data for render status

			} else {

				return response;
			}
		} else {

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
			//  TODO: need to send data for render status
		} else {

			return cloudBridgeEventResp;
		}
	};
	downloadCFTemplate = async (codeSnippet: string, envList: object, name: string, rangeTime: number, bucket: string, token: string, listener: string, description?: string) => {

		const responseModify = await this.customFetch(
			{ code: codeSnippet },
			settings.endPointUrls.modifyFileUrl,
		);
		if (!responseModify.error) {
			//  TODO: need to send data for render status

		} else {

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
			//  TODO: need to send data for render status

			downloadZip(responseToZip.zip);
		} else {

			return responseToZip;
		}
	};

}

const api = new Api(BASE_URL)

export default api;