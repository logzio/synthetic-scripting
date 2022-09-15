import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import Text from '../../components/Text';
import Label from '../../components/Label';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Tooltip from '../../components/Tooltip';
import EnvVariableElement from '../../components/EnvVariable';

import { containsKeys } from '../../utils/validate';
import { findObjectInArray } from '../../utils/helper';

const EnvVariableWrapper = styled.div`
    width: 27%;
    margin-right: 0;
`;

const EnvVariableInput = styled.div`
    margin-bottom: 24px;
    width: 100%;

    input {
        width: 100%;
    }
`;
const EnvVariableDisplay = styled.div``;

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
    };

    const renderEnvVariableHandler = () => {
        return envVariables.map((env) => {
            return Object.keys(env).map((key) => (
                <EnvVariableElement
                    envVariable={env}
                    keyEnvVariable={key}
                    counterEnvVariable={counterEnvVariable}
                    onDeleteEnvVariable={onDeleteEnvVariable}
                />
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
