import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyle from './theme/GlobalStyle';
import Home from './page/Home';
import { UserState } from './context/user/userState';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);
root.render(
    <React.StrictMode>
        <UserState>
            <GlobalStyle />
            <Home />
        </UserState>
    </React.StrictMode>,
);
