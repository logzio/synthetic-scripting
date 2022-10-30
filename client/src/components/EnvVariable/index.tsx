import React, { FunctionComponent } from 'react';
import { ReactComponent as EnvCloseIcon } from '../../assets/icons/envCloseIcon.svg';

import styled from 'styled-components';

const EnvVariableEl = styled.div`
    display: flex;
    gap: 16px;
    margin-bottom: 24px;
    align-items: center;
`;

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
interface IProps {
    keyEnvVariable: string;
    counterEnvVariable: number;
    envVariable: EnvVariable;
    onDeleteEnvVariable: (env: EnvVariable) => void;
}
const EnvVariableElement: FunctionComponent<IProps> = ({
    envVariable,
    keyEnvVariable,
    counterEnvVariable,
    onDeleteEnvVariable,
}) => {
    return (
        <EnvVariableEl key={`${keyEnvVariable}_${counterEnvVariable}`}>
            <EnvVariableSection className='key'>
                <ParagraphEnv>{keyEnvVariable}</ParagraphEnv>
            </EnvVariableSection>{' '}
            <EnvVariableSection className='value'>
                <ParagraphEnv>{envVariable[keyEnvVariable]}</ParagraphEnv>
            </EnvVariableSection>{' '}
            <IconClose
                onClick={() => {
                    onDeleteEnvVariable(envVariable);
                }}
            >
                <EnvCloseIcon />
            </IconClose>
        </EnvVariableEl>
    );
};

export default EnvVariableElement;
