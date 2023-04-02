
export type Meta = {
	field: string;
	value: string;
};
export type MetaConfig = {
	codeSnippet: {
		value: string;
		isValid: boolean;
	};
	name: {
		value: string;
		isValid: boolean;
	};
	accessKey: {
		value: string;
		isValid: boolean;
	};
	secretKey: {
		value: string;
		isValid: boolean;
	};
	bucketName: {
		value: string;
		isValid: boolean;
	};
	token: {
		value: string;
		isValid: boolean;
	};
	listener: {
		value: string;
		isValid: boolean;
	};
	listEnvVariables: EnvVariable[];
	description?:
	| {
		value: string;
		isValid: boolean;
	}
	| undefined;
};

export type EnvVariable = {
	[key: string]: string;
};