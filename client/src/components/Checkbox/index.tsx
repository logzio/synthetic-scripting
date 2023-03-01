import React, { FunctionComponent } from 'react';
import Text from '../Text';

import styled from 'styled-components';

interface IProps {
    title: string;
    description: string;
    onClick: () => void;
    statusCheckbox: boolean;
}
const IconCheck = styled.svg`
    display: none;
`;
const CheckboxContainer = styled.div`
    display: flex;
    margin-bottom: 15px;
`;
const CheckboxTextWrapper = styled.div`
    margin-left: 10px;
    h2 {
        margin-bottom: 5px;
    }
`;
const CheckboxWrapper = styled.div`
    margin-top: 10px;
    cursor: pointer;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    border: 1px solid rgb(231, 231, 231);
    border-radius: 2px;
    transition: all 150ms ease 0s;
    background-color: white;
    outline: none;
    align-self: flex-start;
    &.active {
        display: flex;
        background: #5b78a4;
    }
    &.active svg {
        display: flex;
    }
`;

const Checkbox: FunctionComponent<IProps> = ({
    title,
    description,
    statusCheckbox,
    onClick,
}) => {
    return (
        <CheckboxContainer onClick={onClick}>
            <CheckboxWrapper className={`${statusCheckbox ? 'active' : ''}`}>
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
            </CheckboxWrapper>
            <CheckboxTextWrapper>
                <Text tag='h2'>{title}</Text>
                <Text tag='p'>{description}</Text>
            </CheckboxTextWrapper>
        </CheckboxContainer>
    );
};

export default Checkbox;
