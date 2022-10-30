import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';

const TooltipWrapper = styled.div`
    position: relative;
`;

const TooltipRow = styled.div`
    max-width: 300px;
    width: 100%;
    position: absolute;
`;

const IconTooltip = styled.div`
    background: #fff;
    border: 1px solid #696969;

    font-size: 11px;
    border-radius: 50%;
    height: 15px;
    width: 15px;
    display: flex;
    justify-content: center;
    color: #696969;
    margin-left: 5px;

    &:hover .tooltip-text {
        display: block;
        z-index: 10000;
    }
`;
const TooltipText = styled.div`
    display: none;
    background: #fff;
    color: #25272c;
    font-size: 12px;
    padding: 5px;
    border-radius: 5px;
    position: absolute;
    top: -5px;
    box-shadow: 0px 6px 19px rgb(79 118 178 / 14%);
    left: 25px;
    min-width: 150px;

    &.active {
        display: block;
        z-index: 10000;
    }
`;

interface IProps {
    children: React.ReactNode;
}

const Tooltip: FunctionComponent<IProps> = ({ children }) => {
    const [hovered, setHovered] = useState(false);
    const toggleHover = () => setHovered(!hovered);

    return (
        <TooltipWrapper>
            <TooltipRow>
                <IconTooltip
                    onMouseEnter={toggleHover}
                    onMouseLeave={toggleHover}
                >
                    ?
                </IconTooltip>
                <TooltipText className={hovered ? 'active' : ''}>
                    {children}
                </TooltipText>
            </TooltipRow>
        </TooltipWrapper>
    );
};

export default Tooltip;
