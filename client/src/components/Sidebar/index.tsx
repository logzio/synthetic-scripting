import React, { FunctionComponent } from 'react';

import styled from 'styled-components';

const SidebarWrapper = styled.div`
    height: 100%;
    left: 0px;
    overflow: hidden;
    position: fixed;
    top: 48px;
`;

const SidebarContainer = styled.div`
    background: #fff;
    max-width: 260px;
    width: 100%;
    height: 100%;
    padding: 32px;
    position: relative;
`;

const ListWrapper = styled.ul`
    width: 190px;
    padding: 0px;
    list-style: none;
`;

const ListElement = styled.li`
    margin-bottom: 8px;
    display: flex;
    align-items: center;
`;
const IconNumberWrapper = styled.div`
    width: 24px;
    height: 24px;
    border: 2px solid #6585b6;
    color: #6585b6;
    border-radius: 50%;
    margin-right: 8px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    &.active {
        background: #6585b6;
        color: #fff;
    }
`;

const TextElement = styled.p`
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;

    color: #6585b6;

    &.active {
        font-weight: 500;
    }
`;

type Props = { activeStep: string };
const Sidebar: FunctionComponent<Props> = ({ activeStep }) => {
    return (
        <SidebarWrapper>
            <SidebarContainer>
                <ListWrapper>
                    <ListElement>
                        <IconNumberWrapper
                            className={`${
                                activeStep === 'edit_code' ? 'active' : ''
                            }`}
                        >
                            <span>1</span>
                        </IconNumberWrapper>
                        <TextElement
                            className={`${
                                activeStep === 'edit_code' ? 'active' : ''
                            }`}
                        >
                            Edit your code
                        </TextElement>
                    </ListElement>
                    <ListElement>
                        <IconNumberWrapper
                            className={`${
                                activeStep === 'deploy' ? 'active' : ''
                            }`}
                        >
                            <span>2</span>
                        </IconNumberWrapper>
                        <TextElement
                            className={`${
                                activeStep === 'deploy' ? 'active' : ''
                            }`}
                        >
                            Explore /deploy
                        </TextElement>
                    </ListElement>
                </ListWrapper>
            </SidebarContainer>
        </SidebarWrapper>
    );
};

export default Sidebar;
