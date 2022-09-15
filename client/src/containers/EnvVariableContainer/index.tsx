import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import Text from '../../components/Text';
import Label from '../../components/Label';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Tooltip from '../../components/Tooltip';
import { containsKeys } from '../../utils/validate';
import { findObjectInArray } from '../../utils/helper';
const EnvVariableWrapper = styled.div`
    width: 27%;
    margin-right: 0;
`;

const closeIcon = () => (
    <svg
        width='16'
        height='16'
        viewBox='0 0 16 16'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
    >
        <path
            d='M5.46875 5.46875C5.75 5.1875 6.21875 5.1875 6.5 5.46875L7.96875 6.96875L9.46875 5.46875C9.75 5.1875 10.2188 5.1875 10.5 5.46875C10.8125 5.78125 10.8125 6.25 10.5 6.53125L9.03125 8L10.5 9.46875C10.8125 9.78125 10.8125 10.25 10.5 10.5312C10.2188 10.8438 9.75 10.8438 9.46875 10.5312L7.96875 9.0625L6.5 10.5312C6.21875 10.8438 5.75 10.8438 5.46875 10.5312C5.15625 10.25 5.15625 9.78125 5.46875 9.46875L6.9375 8L5.46875 6.53125C5.15625 6.25 5.15625 5.78125 5.46875 5.46875ZM16 8C16 12.4375 12.4062 16 8 16C3.5625 16 0 12.4375 0 8C0 3.59375 3.5625 0 8 0C12.4062 0 16 3.59375 16 8ZM8 1.5C4.40625 1.5 1.5 4.4375 1.5 8C1.5 11.5938 4.40625 14.5 8 14.5C11.5625 14.5 14.5 11.5938 14.5 8C14.5 4.4375 11.5625 1.5 8 1.5Z'
            fill='#696969'
        />
    </svg>
);

const EnvVariableElement = styled.div`
    display: flex;
    gap: 16px;
    margin-bottom: 24px;
    align-items: center;
`;

const EnvVariableInput = styled.div`
    margin-bottom: 24px;
    width: 100%;

    input {
        width: 100%;
    }
`;
const EnvVariableDisplay = styled.div``;

const EnvVariableSection = styled.div`
    background: #f7f7f7;
    height: 30px;
    border: 1px solid #e7e7e7;
    border-radius: 3px;
    padding: 6px 8px;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #002e42;
    overflow: scroll;
    position: relative;

    &.key {
        width: 30%;
    }
    &.value {
        width: 60%;
    }
`;
const ParagraphEnv = styled.p`
    position: absolute;
`;
const IconClose = styled.div`
    display: flex;
    border-radius: 50%;
    cursor: pointer;
`;
type EnvVariable = {
    [key: string]: string;
};

type Props = {
    uniqueKey: (isUnique: boolean) => void;
    onSetListEnvVariable: (envVariable: EnvVariable[]) => void;
};

const EnvVariableContainer: FunctionComponent<Props> = ({
    uniqueKey,
    onSetListEnvVariable,
}) => {
    const [counterEnvVariable, setCounterEnvVariable] = useState<number>(1);
    const [envKey, setKey] = useState<string>('');
    const [envValue, setValue] = useState<string>('');
    const [envVariables, setEnvVariables] = useState<EnvVariable[]>([]);

    const onChangeKey = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        setKey(target.value);
    };

    const onChangeValue = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        setValue(target.value);
    };

    const onClickAdd = () => {
        if (envKey.trim() === '' || envValue.trim() === '') return;
        const checker = containsKeys({ [envKey]: envValue }, envVariables);

        if (checker) {
            uniqueKey(checker);
            return;
        }

        const newEnvVariables = [...envVariables];
        newEnvVariables.push({ [envKey]: envValue });
        setEnvVariables(newEnvVariables);
        setKey('');
        setValue('');
        onSetListEnvVariable(newEnvVariables);
        setCounterEnvVariable(counterEnvVariable + 1);
    };

    const onDeleteEnvVariable = (env: EnvVariable) => {
        const updatedEnvVariable = [...envVariables];
        const idx = findObjectInArray(env, updatedEnvVariable);

        if (idx >= 0) {
            updatedEnvVariable.splice(idx, 1);
            setEnvVariables(updatedEnvVariable);
        }
        // setEnvVariables();
    };

    const renderEnvVariableHandler = () => {
        return envVariables.map((env) => {
            return Object.keys(env).map((key) => (
                <EnvVariableElement key={`${key}_${counterEnvVariable}`}>
                    <EnvVariableSection className='key'>
                        <ParagraphEnv>{key}</ParagraphEnv>
                    </EnvVariableSection>{' '}
                    <EnvVariableSection className='value'>
                        <ParagraphEnv>{env[key]}</ParagraphEnv>
                    </EnvVariableSection>{' '}
                    <IconClose
                        onClick={() => {
                            onDeleteEnvVariable(env);
                        }}
                    >
                        {closeIcon()}
                    </IconClose>
                </EnvVariableElement>
            ));
        });
    };
    return (
        <EnvVariableWrapper>
            <Text tag='h2'>Add Enviroment Variable</Text>

            <EnvVariableDisplay>
                {renderEnvVariableHandler()}
            </EnvVariableDisplay>

            <EnvVariableInput>
                <Label>
                    Key <Tooltip>this is tooltip</Tooltip>
                </Label>
                <Input
                    name={`key_${counterEnvVariable}`}
                    placeholder='Key'
                    type='text'
                    value={envKey}
                    onChange={onChangeKey}
                />
            </EnvVariableInput>
            <EnvVariableInput>
                <Label>
                    Value <Tooltip>this is tooltip</Tooltip>
                </Label>
                <Input
                    name={`value_${counterEnvVariable}`}
                    placeholder='Value'
                    type='text'
                    value={envValue}
                    onChange={onChangeValue}
                />
            </EnvVariableInput>

            <Button type='white' onClick={onClickAdd}>
                + Add key
            </Button>
        </EnvVariableWrapper>
    );
};

export default EnvVariableContainer;
