import React, { FunctionComponent } from 'react';

import styled from 'styled-components';

const ButtonYellow = styled.button`
    background: #f7c15c;
    border-radius: 3px;
    font-size: 14px;
    line-height: 130%;
    color: #002e42;
    border: 0px;
    padding: 6px 10px;
    cursor: pointer;
    height: 30px;
`;
const ButtonWhite = styled.button`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 130%;
    color: #002e42;
    background: #f7f7f7;
    border: 1px solid #d7d7d7;
    border-radius: 3px;
    padding: 5px 10px;
    cursor: pointer;
`;
const ButtonTransparent = styled.button`
    font-weight: 500;
    font-size: 14px;
    line-height: 130%;
    border: 0;
    background-color: transparent;
    color: #6585b6;
    cursor: pointer;
`;

type Props = { children: React.ReactNode; type: string; onClick: () => void };

const Button: FunctionComponent<Props> = ({ children, type, onClick }) => {
    switch (type) {
        case 'yellow':
            return <ButtonYellow onClick={onClick}>{children}</ButtonYellow>;

        case 'transparent':
            return (
                <ButtonTransparent onClick={onClick}>
                    {children}
                </ButtonTransparent>
            );
        case 'white':
            return <ButtonWhite onClick={onClick}>{children}</ButtonWhite>;
        default:
            return <ButtonTransparent>{children}</ButtonTransparent>;
    }
};

export default Button;
