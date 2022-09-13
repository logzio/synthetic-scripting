import React, { FunctionComponent } from 'react';

import styled from 'styled-components';

const ContainerDiv = styled.div`
    position: relative;
    margin-top: 74px;
    margin-left: 284px;
    margin-right: auto;
    width: calc(100% - 284px);
    max-width: 1280px;
`;

type Props = { children: React.ReactNode };

const Container: FunctionComponent<Props> = ({ children }) => {
    return <ContainerDiv>{children}</ContainerDiv>;
};

export default Container;
