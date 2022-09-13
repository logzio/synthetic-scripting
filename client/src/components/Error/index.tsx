import React, { FunctionComponent } from 'react';

import styled from 'styled-components';

const ErrorWrapper = styled.div`
    margin-left: 284px;
    margin-right: auto;
    width: calc(100% - 284px);
    max-width: 1280px;
    position: absolute;

    bottom: 20px;
`;
const ErrorRow = styled.div`
    margin-left: 15px;
    margin-right: 15px;
    background: rgb(255 0 0 / 34%);
    color: #fff;
    padding: 4px 8px;
    border-radius: 3px;
`;

type Props = { children: React.ReactNode };

const Error: FunctionComponent<Props> = ({ children }) => {
    return (
        <ErrorWrapper>
            <ErrorRow>{children}</ErrorRow>
        </ErrorWrapper>
    );
};

export default Error;
