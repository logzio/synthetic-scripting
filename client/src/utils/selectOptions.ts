export const availableCodeLanguages = [
	{ name: 'Playwright', default: true, isDisabled: false },
	{ name: 'Selenium', default: false, isDisabled: true },
	{ name: 'Pupeeter', default: false, isDisabled: true },
];

export const availableCloudProviders = [
	{ name: 'AWS', default: true, isDisabled: false },
	{ name: 'Azure', default: false, isDisabled: true },
	{ name: 'Google Cloud', default: false, isDisabled: true },
];

export const availableTimeRange = [
	{ name: '1 minute', default: true, isDisabled: false },
	{ name: '2 minutes', default: false, isDisabled: false },
	{ name: '3 minutes', default: false, isDisabled: false },
	{ name: '5 minutes', default: false, isDisabled: false },
	{ name: '15 minutes', default: false, isDisabled: false },
	{ name: '60 minutes', default: false, isDisabled: false },
];
export const availableMethod = [
	{ name: 'Cloud' },
	{ name: 'Locally' }
]

export type rangeTimeVarEnvType = {
	[key: string]: number
}
export const rangeTimeVariable: rangeTimeVarEnvType =
{
	minute_1: 1,
	minutes_2: 2,
	minutes_3: 3,
	minutes_5: 5,
	minutes_15: 15,
	minutes_30: 30,
	minutes_60: 60
};

export const awsRegions = [
	{ name: 'us-east-2', default: true, isDisabled: false },
	{ name: 'us-east-1', default: false, isDisabled: false },
	{ name: 'us-west-1', default: false, isDisabled: false },
	{ name: 'us-west-2', default: false, isDisabled: false },
	{ name: 'ca-central-1', default: false, isDisabled: false },
	{ name: 'ap-southeast-3', default: false, isDisabled: false },
	{ name: 'ap-south-1', default: false, isDisabled: false },
	{ name: 'ap-south-2', default: false, isDisabled: false },
	{ name: 'ap-northeast-1', default: false, isDisabled: false },
	{ name: 'ap-northeast-2', default: false, isDisabled: false },
	{ name: 'ap-northeast-3', default: false, isDisabled: false },
	{ name: 'ap-southeast-1', default: false, isDisabled: false },
	{ name: 'ap-southeast-2', default: false, isDisabled: false },
	{ name: 'eu-central-1', default: false, isDisabled: false },
	{ name: 'eu-central-2', default: false, isDisabled: false },
	{ name: 'eu-north-1', default: false, isDisabled: false },
	{ name: 'me-south-1', default: false, isDisabled: false },
	{ name: 'me-central-1', default: false, isDisabled: false },
	{ name: 'eu-west-1', default: false, isDisabled: false },
	{ name: 'eu-west-2', default: false, isDisabled: false },
	{ name: 'eu-west-3', default: false, isDisabled: false },
	{ name: 'eu-south-1', default: false, isDisabled: false },
	{ name: 'eu-south-2', default: false, isDisabled: false },
	{ name: 'sa-east-1', default: false, isDisabled: false },
	{ name: 'cn-north-1', default: false, isDisabled: false },
	{ name: 'cn-northwest-1', default: false, isDisabled: false },
	{ name: 'ap-east-1', default: false, isDisabled: false },
	{ name: 'af-south-1', default: false, isDisabled: false },
	{ name: 'us-gov-west-1', default: false, isDisabled: false },
	{ name: 'us-gov-east-1', default: false, isDisabled: false },
]