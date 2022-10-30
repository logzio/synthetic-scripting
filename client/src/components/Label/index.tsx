import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const LabelWrapper = styled.label`
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #696969;
    margin-bottom: 4px;
    display: flex;
`;

interface IProps {
    children: React.ReactNode;
}

const Label: FunctionComponent<IProps> = ({ children }) => {
    return <LabelWrapper>{children}</LabelWrapper>;
};

export default Label;
