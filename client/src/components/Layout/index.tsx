import React, { FunctionComponent } from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';

import styled from 'styled-components';

type Props = { children: React.ReactNode; activeStep: string };

const LayoutWrapper = styled.div`
    height: 100%;
    padding-top: 74px;
`;

const Layout: FunctionComponent<Props> = ({ children, activeStep }) => {
    return (
        <LayoutWrapper>
            <Header />
            <Sidebar activeStep={activeStep} />
            {children}
        </LayoutWrapper>
    );
};

export default Layout;
