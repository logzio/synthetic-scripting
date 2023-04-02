import { MetaConfig, Meta } from "../types";

interface IUserReducer {
	type: string;
	payload: Meta;
}


export const userReducer = (currentInput: MetaConfig, action: IUserReducer) => {
	switch (action.type) {

		case 'FILL_DATA':
			return {
				...currentInput, ...action.payload
			}

	}
	return currentInput
};
