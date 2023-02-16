import React, { FunctionComponent, useState } from 'react';

import Layout from '../../components/Layout';

import EditCodeContainer from '../../containers/EditCodeContainer';
import ButtonContainer from '../../containers/ButtonContainer';
import ExportDeploy from '../../containers/ExportDeployContainer';
import Error from '../../components/Error';

import api from '../../utils/api';
import { rangeTimeVariable } from '../../utils/selectOptions';
import { validateMetaDeploy, validateMetaDownload } from '../../utils/validate';
import { DEFAULT_CODE } from '../../utils/constants';

type StatusProps = {
    message: string;
    isSuccessful: boolean;
    isEnd: boolean;
};

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
    const [region, setRegion] = useState<string>('us-east-2');
    const [methodTest, setMethodTest] = useState<string>('Cloud');
    const [isError, setIsError] = useState<boolean>(false);
    const [errorData, setErrorMessage] = useState<ErrorObject>({
        errorMessage: '',
        errorTitle: '',
    });
    const [codeSnippet, setCodeSnippet] = useState<string>(DEFAULT_CODE);
    const [testDevice, setTestDevice] = useState<string>('Desktop Chrome');

    const [activeStep, setActiveStep] = useState<string>('edit_code');
    const [stageDeploy, setStageDeploy] = useState<StatusProps>({
        message: 'Function creating...',
        isSuccessful: true,
        isEnd: false,
    });
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

        listEnvVariables: [],
        description: {
            value: '',
            isValid: true,
        },
    });
    const onStage = (stage: StatusProps) => {
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
                region,
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
                testDevice,
                envList,
                configs.name.value,
                rangeTimeVariable[
                    activeRangeTime.split(' ').reverse().join('_')
                ],
                configs.bucketName.value,
                configs.token.value,
                region,
                configs.listener.value,
                (step: boolean) => {
                    onDownload(step);
                },
                configs.description?.value,
            );
        }
        if (activeStep === 'cloud') {
            const validation = validateMetaDeploy(
                configs.name.value,
                configs.token.value,
                configs.listener.value,
                region,
                configs.bucketName.value,
                configs.accessKey.value,
                configs.secretKey.value,
            );
            if (!validation.status) {
                setActiveStep('deploy');
                displayErrorMessage(
                    validation.errorTitle,
                    validation.errorMessage,
                );
                return;
            }
            setStageDisplay(true);
            onCloseHandler();
            response = await api.initPage(
                rangeTimeVariable[
                    activeRangeTime.split(' ').reverse().join('_')
                ],
                testDevice,
                codeSnippet,
                configs.name.value,
                configs.accessKey.value,
                configs.secretKey.value,
                configs.bucketName.value,
                configs.token.value,
                configs.listener.value,
                region,
                envList,
                (stage: StatusProps) => {
                    onStage(stage);
                },
                configs.description?.value,
            );
        }

        if (activeStep === 'cloud' || activeStep === 'download') {
            if (response!.error) {
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

    const statusGoBackHandler = (step: string) => {
        setActiveStep(step);
        setStageDeploy({
            message: 'Function creating...',
            isSuccessful: true,
            isEnd: false,
        });
        setStageDisplay(false);
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
    const onChangeRegion = (option: string) => {
        setRegion(option);
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
            <>
                {activeStep === 'edit_code' ? (
                    <EditCodeContainer
                        uniqueKey={uniqueEnvVariableHandler}
                        testDevice={testDevice}
                        codeSnippet={codeSnippet}
                        setCodeSnippet={onSetCodeSnippetHandler}
                        setEnvVariable={onSetEnvVariableHandler}
                        setTestDevice={setTestDevice}
                    />
                ) : (
                    <ExportDeploy
                        stageDisplay={stageDisplay}
                        stageDeploy={stageDeploy}
                        methodTest={methodTest}
                        activeRangeTime={activeRangeTime}
                        activeCloudProvider={activeCloudProvider}
                        activeRegion={region}
                        onChangeRegion={onChangeRegion}
                        statusGoBackHandler={statusGoBackHandler}
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
                    <Error
                        title={errorData.errorTitle}
                        onClose={onCloseHandler}
                    >
                        {errorData.errorMessage}
                    </Error>
                ) : (
                    ''
                )}
            </>
        </Layout>
    );
};

export default Home;
