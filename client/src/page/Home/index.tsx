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

type ErrorObject = {
    errorMessage: string;
    errorTitle: string;
};

const Home: FunctionComponent = () => {
    const [activeRangeTime, setActiveRangeTime] = useState<string>('1 minute');
    const [methodTest, setMethodTest] = useState<string>('Cloud');
    const [isError, setIsError] = useState<boolean>(false);
    const [errorData, setErrorMessage] = useState<ErrorObject>({
        errorMessage: '',
        errorTitle: '',
    });
    const [codeSnippet, setCodeSnippet] = useState<string>(defaultCode);
    const [activeStep, setActiveStep] = useState<string>('edit_code');
    const [stageDeploy, setStageDeploy] = useState<string>('function-creating');
    const [stageDisplay, setStageDisplay] = useState<boolean>(false);
    const [envList, setEnvList] = useState<EnvVariable[]>([]);
    const [isDownload, setIsDownload] = useState<boolean>(false);
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
    const onStage = (stage: string) => {
        setStageDeploy(stage);
    };
    const onDownload = (step: boolean) => {
        setIsDownload(step);
    };

    const [activeCloudProvider, setActiveCloudProvider] =
        useState<string>('AWS');
    const onChangeStepHandler = async (activeStep: string) => {
        setActiveStep(activeStep);
        let response: any;
        if (activeStep === 'download') {
            onCloseHandler();

            const validation = validateMetaDownload(
                configs.name.value,
                configs.token.value,
                configs.listener.value,
                configs.region.value,
                configs.bucketName.value,
            );
            if (!validation.status) {
                displayErrorMessage(
                    validation.errorTitle,
                    validation.errorMessage,
                );
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
                (step: boolean) => {
                    onDownload(step);
                },
                configs.description?.value,
            );
        }
        if (activeStep === 'cloud') {
            setStageDisplay(true);
            onCloseHandler();
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
                displayErrorMessage(
                    validation.errorTitle,
                    validation.errorMessage,
                );
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
                (stage: string) => {
                    onStage(stage);
                },
                configs.description?.value,
            );
        }

        if (activeStep === 'cloud' || activeStep === 'download') {
            if (response!.error) {
                setStageDeploy('stage-failed');
                displayErrorMessage(
                    response.errorTitle,
                    response.errorData.err.message,
                );
                return;
            }
        }
    };
    const displayErrorMessage = (errorTitle: string, errorMessage: string) => {
        setIsError(true);
        setErrorMessage({ errorMessage, errorTitle });
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

    const onCloseHandler = () => {
        setIsError(false);
        setErrorMessage({
            errorMessage: '',
            errorTitle: '',
        });
    };
    const uniqueEnvVariableHandler = (isUnique: boolean) => {
        if (isUnique) {
            setIsError(true);
            setErrorMessage({
                errorMessage:
                    ' Enviroment Variable already exist. Please define unique Key.',
                errorTitle: 'Enviroment Variable',
            });
        }
    };
    return (
        <Layout activeStep={activeStep}>
            {activeStep === 'edit_code' ? (
                <EditCodeContainer
                    uniqueKey={uniqueEnvVariableHandler}
                    codeSnippet={codeSnippet}
                    setCodeSnippet={onSetCodeSnippetHandler}
                    setEnvVariable={onSetEnvVariableHandler}
                />
            ) : (
                <ExportDeploy
                    stageDisplay={stageDisplay}
                    stageDeploy={stageDeploy}
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
                isDownload={isDownload}
                methodTest={methodTest}
                activeStep={activeStep}
                onChangeStep={onChangeStepHandler}
            />
            {isError ? (
                <Error title={errorData.errorTitle} onClose={onCloseHandler}>
                    {errorData.errorMessage}
                </Error>
            ) : (
                ''
            )}
        </Layout>
    );
};

export default Home;
