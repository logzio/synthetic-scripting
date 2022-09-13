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
