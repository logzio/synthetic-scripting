import React, { FunctionComponent } from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';

type Props = { children: React.ReactNode; activeStep: string };

const Layout: FunctionComponent<Props> = ({ children, activeStep }) => {
    return (
        <div>
            <Header />
            <Sidebar activeStep={activeStep} />
            {children}
        </div>
    );
};

export default Layout;
