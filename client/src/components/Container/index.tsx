import React, { FunctionComponent } from 'react';

import styled from 'styled-components';

const ContainerDiv = styled.div`
    position: relative;
    margin-left: 284px;
    margin-right: auto;
    width: calc(100% - 284px);
    max-width: 1280px;
    height: 95%;
    padding-bottom: 24px;
`;

interface IProps {
    children: React.ReactNode;
}

const Container: FunctionComponent<IProps> = ({ children }) => {
    return <ContainerDiv>{children}</ContainerDiv>;
};

export default Container;
