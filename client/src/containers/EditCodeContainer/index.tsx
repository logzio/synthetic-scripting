import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';

import Container from '../../components/Container';

import CodeEditor from '../../components/CodeEditor';
import EnvVariableWrapper from '../EnvVariableContainer';
import Text from '../../components/Text';
import Select from '../../components/Select';

import { availableCodeLanguages } from '../../utils/selectOptions';
import Button from '../../components/Button';

import api from '../../utils/api';

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
`;
const SelectWrapper = styled.div`
    position: relative;
    max-width: 215px;
    width: 100%;
`;

const MainWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    height: 80%;
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

    align-items: center;
`;

const IconCheck = styled.svg`
    display: flex;
    margin-right: 3px;
`;

type EnvVariable = {
    [key: string]: string;
};
type Props = {
    uniqueKey: (isUnique: boolean) => void;
    codeSnippet: string;
    setCodeSnippet: (val: string) => void;
    setEnvVariable: (envVariable: EnvVariable[]) => void;
};

const EditCodeContainer: FunctionComponent<Props> = ({
    uniqueKey,
    codeSnippet,
    setCodeSnippet,
    setEnvVariable,
}) => {
    const [codeLanguage, setCodeLanguage] = useState<string>('Playwright');
    const [loading, setLoading] = useState<boolean>(false);
    const [testStatus, setTestStatus] = useState<string>('');
    const [isCodeValid, setIsCodeValid] = useState<boolean>(true);
    const onChangeSelect = (option: string) => {
        setCodeLanguage(option);
    };

    const startTestLocally = async () => {
        setTestStatus('');
        if (!isCodeValid) {
            setTestStatus('Please check code snippet you have error');
            return;
        }

        setLoading(true);
        const response = await api.testLocal(codeSnippet);

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
        <Container>
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
                    <EnvVariableWrapper
                        uniqueKey={uniqueKey}
                        onSetListEnvVariable={setEnvVariable}
                    />
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
                                    fill='none'
                                >
                                    <path
                                        d='M3.58435 5.16434L8.29047 0.40882C8.47752 0.21893 8.70709 0.119856 8.97917 0.1116C9.25975 0.103344 9.49782 0.194161 9.69338 0.384052C9.88894 0.565686 9.99097 0.79273 9.99947 1.06518C10.008 1.32938 9.91444 1.55642 9.71889 1.74631L3.64812 7.88886L0.306644 4.8052C0.111087 4.62357 0.00905699 4.40065 0.000554509 4.13646C-0.00794797 3.864 0.081328 3.63283 0.268383 3.44294C0.46394 3.2448 0.697758 3.14572 0.969837 3.14572C1.24192 3.13747 1.47999 3.22416 1.68405 3.40579L3.58435 5.16434Z'
                                        fill='#002e42'
                                    />
                                </IconCheck>{' '}
                                {testStatus}
                            </>
                        ) : (
                            ''
                        )}
                    </StatusTest>
                </BottomWrapper>
            </ContainerSteps>
        </Container>
    );
};

export default EditCodeContainer;
