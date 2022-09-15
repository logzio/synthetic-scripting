import React, { FunctionComponent } from 'react';

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
type EnvVariable = {
    [key: string]: string;
};
type Props = {
    keyEnvVariable: string;
    counterEnvVariable: number;
    envVariable: EnvVariable;
    onDeleteEnvVariable: (env: EnvVariable) => void;
};
const EnvVariableElement: FunctionComponent<Props> = ({
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
                {closeIcon()}
            </IconClose>
        </EnvVariableEl>
    );
};

export default EnvVariableElement;
