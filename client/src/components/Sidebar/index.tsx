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

type liProp = {
    step: number | undefined;
};
const ListElement = styled.li<liProp>`
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    ${(props) =>
        props.step
            ? `&>p {
					font-weight: 500;
				}
				&>div {
					background: #6585b6;
					color: #fff;
				}`
            : ''}
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
`;

const TextElement = styled.p`
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;

    color: #6585b6;
`;

interface IProps {
    activeStep: string;
}
const Sidebar: FunctionComponent<IProps> = ({ activeStep }) => {
    return (
        <SidebarWrapper>
            <SidebarContainer>
                <ListWrapper>
                    <ListElement
                        step={activeStep === 'edit_code' ? 1 : undefined}
                    >
                        <IconNumberWrapper>
                            <span>1</span>
                        </IconNumberWrapper>
                        <TextElement>Edit your code</TextElement>
                    </ListElement>
                    <ListElement step={activeStep === 'deploy' ? 1 : undefined}>
                        <IconNumberWrapper>
                            <span>2</span>
                        </IconNumberWrapper>
                        <TextElement>Explore /deploy</TextElement>
                    </ListElement>
                </ListWrapper>
            </SidebarContainer>
        </SidebarWrapper>
    );
};

export default Sidebar;
