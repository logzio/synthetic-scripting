import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';

import CodeEditor from '../../components/CodeEditor';
import EnvVariableContainer from '../EnvVariableContainer';
import Text from '../../components/Text';
import Select from '../../components/Select';

import {
    availableCodeLanguages,
    platformDevice,
} from '../../utils/selectOptions';
import Button from '../../components/Button';

import api from '../../utils/api';

const ContainerDiv = styled.div`
    position: relative;
    margin-left: 284px;
    margin-right: auto;
    width: calc(100% - 284px);
    max-width: 1280px;
    padding-bottom: 24px;
`;
const SideWrapper = styled.div`
    width: 27%;
    margin-right: 0;
`;
const TopWrapper = styled.div`
    margin-bottom: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;
const ContainerSteps = styled.div`
    background: #fff;
    padding: 24px;
    border: 1px solid #e7e7e7;
    border-radius: 4px;
    margin-bottom: 24px;
    margin-right: 15px;
    margin-left: 15px;
    height: 100%;
    min-height: 700px;
`;
const SelectWrapper = styled.div`
    position: relative;
    max-width: 215px;
    width: 100%;
`;
const SelectWrapperDevice = styled.div`
    position: relative;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 30px;
`;
const MainWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    height: 75%;
`;

const BottomWrapper = styled.div`
    display: flex;
    align-items: baseline;
    margin-top: 20px;
    align-items: center;

    button {
        margin-left: 24px;
        margin-right: 24px;
    }
`;
const StatusTest = styled.div`
    font-size: 14px;
    line-height: 130%;
    color: #002e42;
    display: flex;
    overflow-wrap: anywhere;
    align-items: center;
    max-width: 69%;
`;

const IconCheck = styled.svg`
    display: flex;
    margin-right: 3px;
`;

type EnvVariable = {
    [key: string]: string;
};
interface IProps {
    uniqueKey: (isUnique: boolean) => void;
    codeSnippet: string;
    testDevice: string;
    setCodeSnippet: (val: string) => void;
    setEnvVariable: (envVariable: EnvVariable[]) => void;
    setTestDevice: (val: string) => void;
}

const EditCodeContainer: FunctionComponent<IProps> = ({
    uniqueKey,
    codeSnippet,
    testDevice,
    setCodeSnippet,
    setEnvVariable,
    setTestDevice,
}) => {
    const [codeLanguage, setCodeLanguage] = useState<string>('Playwright');
    const [loading, setLoading] = useState<boolean>(false);
    const [testStatus, setTestStatus] = useState<string>('');
    const [isCodeValid, setIsCodeValid] = useState<boolean>(true);
    const onChangeSelect = (option: string) => {
        setCodeLanguage(option);
    };
    const onChangeSelectDevice = (option: string) => {
        setTestDevice(option);
    };
    const startTestLocally = async () => {
        setTestStatus('');
        if (!isCodeValid) {
            setTestStatus('Please check code snippet you have error');
            return;
        }

        setLoading(true);
        const response = await api.testLocal(codeSnippet, testDevice);

        if (response!.error && response!.errorData) {
            setTestStatus(response!.errorData);
            setLoading(false);
            return;
        }

        if (response.message) {
            setLoading(false);

            setTestStatus(response.message);
        }
    };
    const isValidHandler = (isValidResult: boolean) => {
        setIsCodeValid(isValidResult);
    };

    return (
        <ContainerDiv>
            <ContainerSteps>
                <TopWrapper>
                    <TextWrapper>
                        <Text tag={'h2'}> Edit your code</Text>
                        <Text tag={'p'}>
                            Select the required test framework from the dropdown
                            <br />
                            menu on the right and write your script in the text
                            box below.
                        </Text>
                    </TextWrapper>
                    <SelectWrapper>
                        <Select
                            options={availableCodeLanguages}
                            onChangeSelect={onChangeSelect}
                            currentValue={codeLanguage}
                        />
                    </SelectWrapper>
                </TopWrapper>
                <MainWrapper>
                    <CodeEditor
                        isValid={isValidHandler}
                        loading={loading}
                        setCodeSnippet={setCodeSnippet}
                        codeSnippet={codeSnippet}
                    />
                    <SideWrapper>
                        <Text tag='h2'>Select Device</Text>
                        <Text tag={'p'}>
                            Choose devicewhere you want to run test
                        </Text>
                        <SelectWrapperDevice>
                            <Select
                                options={platformDevice}
                                onChangeSelect={onChangeSelectDevice}
                                currentValue={testDevice}
                            />
                        </SelectWrapperDevice>
                        <EnvVariableContainer
                            uniqueKey={uniqueKey}
                            onSetListEnvVariable={setEnvVariable}
                        />
                    </SideWrapper>
                </MainWrapper>
                <BottomWrapper>
                    <Text tag={'p'}>
                        Click this button to test your script.
                    </Text>
                    <Button onClick={startTestLocally} type='white'>
                        Test script
                    </Button>
                    <StatusTest>
                        {testStatus !== '' ? (
                            <>
                                <IconCheck
                                    className='iconCheck'
                                    width='10'
                                    height='8'
                                    viewBox='0 0 10 8'
                                >
                                    <path
                                        d='M3.58435 5.16434L8.29047 0.40882C8.47752 0.21893 8.70709 0.119856 8.97917 0.1116C9.25975 0.103344 9.49782 0.194161 9.69338 0.384052C9.88894 0.565686 9.99097 0.79273 9.99947 1.06518C10.008 1.32938 9.91444 1.55642 9.71889 1.74631L3.64812 7.88886L0.306644 4.8052C0.111087 4.62357 0.00905699 4.40065 0.000554509 4.13646C-0.00794797 3.864 0.081328 3.63283 0.268383 3.44294C0.46394 3.2448 0.697758 3.14572 0.969837 3.14572C1.24192 3.13747 1.47999 3.22416 1.68405 3.40579L3.58435 5.16434Z'
                                        fill='#002e42'
                                    />
                                </IconCheck>
                                {testStatus}
                            </>
                        ) : (
                            ''
                        )}
                    </StatusTest>
                </BottomWrapper>
            </ContainerSteps>
        </ContainerDiv>
    );
};

export default EditCodeContainer;
