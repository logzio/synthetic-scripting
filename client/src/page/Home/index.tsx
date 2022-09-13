import React, { FunctionComponent, useState } from 'react';

import Layout from '../../components/Layout';

import EditCodeContainer from '../../containers/EditCodeContainer';
import ButtonContainer from '../../containers/ButtonContainer';
import ExportDeploy from '../../containers/ExportDeployContainer';
import Error from '../../components/Error';

import api from '../../utils/api';
import { rangeTimeVariable } from '../../utils/selectOptions';
import { validateMetaDeploy, validateMetaDownload } from '../../utils/validate';
const defaultCode = `const playwright = require('playwright-aws-lambda');
const readSendData = require('./rsData');

const handler = async () => {
	let context = null;
	let browser = null;
	try {
	browser = await playwright.launchChromium(false);
	context = await browser.newContext({
		recordHar: {
			path: './capture-hars/example.har',
			mode: 'full',
			content: 'omit',
		},
    });
	const page = await context.newPage();
	//////////////////////////////////
	//// add your code from here ////
	///////////////////////////////////
					
	///////////////////////////////////
	//// add your code to here ////
	//////////////////////////////////
				
	} catch (error) {
		throw error;
	} finally {
		if (browser) {
			await context.close();
			await browser.close();
		}
	}
	
	readSendData();
	return true;
};`;

type Meta = {
    field: string;
    value: string;
};
type MetaConfig = {
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
    region: {
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

type EnvVariable = {
    [key: string]: string;
};

const Home: FunctionComponent = () => {
    const [activeRangeTime, setActiveRangeTime] = useState<string>('1 minute');
    const [methodTest, setMethodTest] = useState<string>('Cloud');
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [codeSnippet, setCodeSnippet] = useState<string>(defaultCode);
    const [activeStep, setActiveStep] = useState<string>('edit_code');

    const [envList, setEnvList] = useState<EnvVariable[]>([]);
    const [configs, setConfigs] = useState<MetaConfig>({
        codeSnippet: {
            value: '',
            isValid: true,
        },
        name: {
            value: '',
            isValid: true,
        },
        accessKey: {
            value: '',
            isValid: true,
        },
        secretKey: {
            value: '',
            isValid: true,
        },
        bucketName: {
            value: '',
            isValid: true,
        },
        token: {
            value: '',
            isValid: true,
        },
        listener: {
            value: '',
            isValid: true,
        },
        region: {
            value: '',
            isValid: true,
        },
        listEnvVariables: [],
        description: {
            value: '',
            isValid: true,
        },
    });

    const [activeCloudProvider, setActiveCloudProvider] =
        useState<string>('AWS');
    const onChangeStepHandler = async (activeStep: string) => {
        setActiveStep(activeStep);
        let response: any;
        if (activeStep === 'download') {
            setIsError(false);
            setErrorMessage('');
            const validation = validateMetaDownload(
                configs.name.value,
                configs.token.value,
                configs.listener.value,
                configs.region.value,
                configs.bucketName.value,
            );
            if (!validation.status) {
                displayErrorMessage(validation.errorMessage);
                return;
            }

            response = await api.downloadCFTemplate(
                codeSnippet,
                envList,
                configs.name.value,
                rangeTimeVariable[
                    activeRangeTime.split(' ').reverse().join('_')
                ],
                configs.bucketName.value,
                configs.token.value,
                configs.listener.value,
                configs.description?.value,
            );
        }
        if (activeStep === 'cloud') {
            setIsError(false);
            setErrorMessage('');
            const validation = validateMetaDeploy(
                configs.name.value,
                configs.token.value,
                configs.listener.value,
                configs.region.value,
                configs.bucketName.value,
                configs.accessKey.value,
                configs.secretKey.value,
            );

            if (!validation.status) {
                displayErrorMessage(validation.errorMessage);
                return;
            }
            response = await api.initPage(
                rangeTimeVariable[
                    activeRangeTime.split(' ').reverse().join('_')
                ],
                codeSnippet,
                configs.name.value,
                configs.accessKey.value,
                configs.secretKey.value,
                configs.bucketName.value,
                configs.token.value,
                configs.listener.value,
                configs.region.value,
                envList,
                configs.description?.value,
            );
        }

        if (activeStep === 'cloud' || activeStep === 'download') {
            if (response!.error) {
                displayErrorMessage(response.errorData);
                return;
            }
        }
    };
    const displayErrorMessage = (errorMessage: string) => {
        setIsError(true);
        setErrorMessage(errorMessage);
        setTimeout(() => {
            setIsError(false);
            setErrorMessage('');
        }, 10000);
    };
    const onChangeCloudProviderHandler = (option: string) => {
        setActiveCloudProvider(option);
    };

    const updateMetaHandler = (data: Meta) => {
        setConfigs({ ...configs, ...{ [data.field]: { value: data.value } } });
    };

    const updateRangeTimeHandler = (option: string) => {
        setActiveRangeTime(option);
    };

    const onChangeMethodTestHandler = (option: string) => {
        setMethodTest(option);
    };

    const onSetCodeSnippetHandler = (val: string) => {
        setCodeSnippet(val);
    };
    const onSetEnvVariableHandler = (listEnv: EnvVariable[]) => {
        setEnvList(listEnv);
    };

    return (
        <Layout activeStep={activeStep}>
            {activeStep === 'edit_code' ? (
                <EditCodeContainer
                    codeSnippet={codeSnippet}
                    setCodeSnippet={onSetCodeSnippetHandler}
                    setEnvVariable={onSetEnvVariableHandler}
                />
            ) : (
                <ExportDeploy
                    methodTest={methodTest}
                    activeRangeTime={activeRangeTime}
                    activeCloudProvider={activeCloudProvider}
                    onChangeMethodTest={onChangeMethodTestHandler}
                    onChangeRangeTime={updateRangeTimeHandler}
                    onChangeCloudProvider={onChangeCloudProviderHandler}
                    updateMeta={updateMetaHandler}
                />
            )}
            <ButtonContainer
                methodTest={methodTest}
                activeStep={activeStep}
                onChangeStep={onChangeStepHandler}
            />
            {isError ? <Error>{errorMessage}</Error> : ''}
        </Layout>
    );
};

export default Home;
