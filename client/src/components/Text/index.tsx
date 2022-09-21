import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const H2Section = styled.h2`
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    color: #335868;
    margin-bottom: 16px;
`;
const ParagraphSection = styled.p`
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 130%;
    color: #707070;
`;
type Props = { children: React.ReactNode; tag: string };

const Text: FunctionComponent<Props> = ({ children, tag }) => {
    switch (tag) {
        case 'h2':
            return <H2Section>{children}</H2Section>;
        case 'p':
            return <ParagraphSection>{children}</ParagraphSection>;
        default:
            return <ParagraphSection>{children}</ParagraphSection>;
    }
};

export default Text;
