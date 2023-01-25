import React, { FunctionComponent } from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';

import styled from 'styled-components';

interface IProps {
    children: React.ReactNode;
    activeStep: string;
}

const LayoutWrapper = styled.div`
    padding-top: 74px;
`;

const Layout: FunctionComponent<IProps> = ({ children, activeStep }) => {
    return (
        <LayoutWrapper>
            <Header />
            <Sidebar activeStep={activeStep} />
            {children}
        </LayoutWrapper>
    );
};

export default Layout;
