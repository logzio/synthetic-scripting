import React, { FunctionComponent } from 'react';

import styled from 'styled-components';

const HeaderWrapper = styled.div`
    -webkit-box-shadow: 0 2px 2px -1px rgb(152 162 179 / 30%),
        0 1px 5px -2px rgb(152 162 179 / 30%);
    background: #fff;
    border-bottom: 1px solid #d3dae6;
    box-shadow: 0 2px 2px -1px rgb(152 162 179 / 30%),
        0 1px 5px -2px rgb(152 162 179 / 30%);
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    position: fixed;
    z-index: 100;
    width: 100%;
    justify-content: space-between;
    top: 0px;
    flex-direction: column;
`;

const TitleWrapper = styled.div`
    border-bottom: 1px solid #e7e7e7;
    padding-left: 32px;
`;

const H1Element = styled.h1`
    margin: 0;
    font-size: 18px;
    line-height: 47px;
    color: #002e42;
    font-weight: 600;
`;

const Header: FunctionComponent = () => {
    return (
        <HeaderWrapper>
            <TitleWrapper>
                <H1Element>Synthetic scripting</H1Element>
            </TitleWrapper>
        </HeaderWrapper>
    );
};

export default Header;
