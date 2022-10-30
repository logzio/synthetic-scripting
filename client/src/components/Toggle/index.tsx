import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

type Option = {
    name: string;
};

interface IProps {
    options: Option[];
    onToggle: (option: string) => void;
    activeToggle: string;
}

const ToggleWrapper = styled.div``;
const ToggleList = styled.ul`
    list-style: none;
    padding: 0px;
    display: flex;
`;
const ToggleElement = styled.li`
    padding: 6px 8px;
    border: 1px solid #849dc5;
    color: #696969;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 130%;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    &:last-child {
        border-radius: 0px 3px 3px 0px;
    }
    &:first-child {
        border-radius: 3px 0px 0px 3px;
    }
    &.active {
        color: #ffffff;
        background: #5b78a4;
    }

    &.active .iconCheck {
        display: flex;
    }
`;
const IconCheck = styled.svg`
    display: none;
`;
const Toggle: FunctionComponent<IProps> = ({
    options,
    onToggle,
    activeToggle,
}) => {
    const renderToggle = () => {
        return options.map((option) => (
            <ToggleElement
                className={`${activeToggle === option.name ? 'active' : ''}`}
                onClick={() => {
                    onToggle(option.name);
                }}
                key={option.name}
            >
                <IconCheck
                    className='iconCheck'
                    width='10'
                    height='8'
                    viewBox='0 0 10 8'
                    fill='none'
                >
                    <path
                        d='M3.58435 5.16434L8.29047 0.40882C8.47752 0.21893 8.70709 0.119856 8.97917 0.1116C9.25975 0.103344 9.49782 0.194161 9.69338 0.384052C9.88894 0.565686 9.99097 0.79273 9.99947 1.06518C10.008 1.32938 9.91444 1.55642 9.71889 1.74631L3.64812 7.88886L0.306644 4.8052C0.111087 4.62357 0.00905699 4.40065 0.000554509 4.13646C-0.00794797 3.864 0.081328 3.63283 0.268383 3.44294C0.46394 3.2448 0.697758 3.14572 0.969837 3.14572C1.24192 3.13747 1.47999 3.22416 1.68405 3.40579L3.58435 5.16434Z'
                        fill='white'
                    />
                </IconCheck>

                {option.name}
            </ToggleElement>
        ));
    };

    return (
        <ToggleWrapper>
            <ToggleList>{renderToggle()}</ToggleList>
        </ToggleWrapper>
    );
};

export default Toggle;
