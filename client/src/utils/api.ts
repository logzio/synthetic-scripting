import downloadZip from "./downloadZip";

const BASE_URL = 'http://localhost:8080';
interface CustomResponse {
	zip?: string;
	error?: boolean;
	errorData?: string;
	errorTitle?: string;
	message?: string;
}
type StatusProps = {
	message: string;
	isSuccessful: boolean;
	isEnd: boolean;
};

const settings = {
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
				return err.json();
			});
	};


	testLocal = async (codeSnippet: string, testDevice: string) => {
		const responseLocal = await this.customFetch(
			{
				code: codeSnippet,
				testDevice

			},
			settings.endPointUrls.modifyFileLocalUrl,
		);
		if (!responseLocal.error) {

			return responseLocal
		} else {
			responseLocal.errorTitle = 'Local Test';
			return responseLocal

		}
	};

	initPage = async (rangeTime: number, testDevice: string, codeSnippet: string, name: string, accessKey: string, secretKey: string, bucketName: string, token: string, listenerUrl: string, region: string, listEnvVariables: object, onStage: (stage: StatusProps) => void, description?: string) => {

		const responseModify = await this.customFetch(
			{ code: codeSnippet, testDevice },
			settings.endPointUrls.modifyFileUrl,
		);



		if (!responseModify.error) {
			//  TODO: need to send data for render status
			onStage({
				message: 'ZIP Creating...',
				isSuccessful: true,
				isEnd: false,
			})
		} else {
			onStage({
				message: 'Function create failed',
				isSuccessful: false,
				isEnd: false,
			})
			responseModify.errorTitle = 'Script Create';
			return responseModify;
		}
		const responseToZip = await this.customFetch(
			{ name },
			settings.endPointUrls.createZipUrl,
		);
		if (!responseToZip.error) {
			onStage({
				message: 'ZIP uploading...',
				isSuccessful: true,
				isEnd: false,
			})

			//  TODO: need to send data for render status

		} else {

			onStage({
				message: 'ZIP create failed',
				isSuccessful: false,
				isEnd: false,
			})

			responseToZip.errorTitle = 'Zip Create';

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
			onStage({
				message: 'Lambda function creating...',
				isSuccessful: true,
				isEnd: false,
			})


		} else {
			onStage({
				message: 'ZIP upload failed',
				isSuccessful: false,
				isEnd: false,
			})
			responseUploadZip.errorTitle = 'Zip Upload';
			return responseUploadZip;
		}

		const response = await this.customFetch(
			{
				name,
				testDevice,
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
			// onStage('range-time-adding')
			onStage({
				message: 'Schedule Rate adding...',
				isSuccessful: true,
				isEnd: false,
			})
			//  TODO: need to send data for render status

		} else {
			onStage({
				message: 'Lambda function creating...',
				isSuccessful: false,
				isEnd: false,
			})
			responseUploadZip.errorTitle = 'Lambda Create';
			return response;
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

			onStage({
				message: 'Shedule Rate added',
				isSuccessful: true,
				isEnd: true,
			})			//  TODO: need to send data for render status
		} else {
			onStage({
				message: 'Shedule Rate add failed',
				isSuccessful: false,
				isEnd: false,
			})
			responseUploadZip.errorTitle = 'Schedule Rade Add';
			return cloudBridgeEventResp;
		}
	};
	downloadCFTemplate = async (codeSnippet: string, envList: object, name: string, rangeTime: number, bucket: string, token: string, region: string, listener: string, onDownload: (step: boolean) => void, description?: string) => {
		onDownload(true)

		const responseModify = await this.customFetch(
			{ code: codeSnippet },
			settings.endPointUrls.modifyFileUrl,
		);
		if (!responseModify.error) {
		} else {
			responseModify.errorTitle = 'Create File';

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
				region,
				rangeTime
			},
			settings.endPointUrls.createCfZip,
		);

		if (!responseToZip.error) {
			onDownload(false)

			downloadZip(responseToZip.zip);
		} else {
			onDownload(false)

			responseModify.errorTitle = 'Create ZIP';

			return responseToZip;
		}
	};

}

const api = new Api(BASE_URL)

export default api;