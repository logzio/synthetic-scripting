import React, { FunctionComponent } from 'react';
import { ReactComponent as CloseIcon } from '../../assets/icons/closeIcon.svg';
import { ReactComponent as ErrorIcon } from '../../assets/icons/errorIcon.svg';

import styled from 'styled-components';

const ErrorWrapper = styled.div`
    margin-right: 0;
    width: 100%;
    max-width: 460px;
    position: absolute;
    background: #fbdfd7;
    box-shadow: inset 3px 0px 0px #e95d39;
    border-radius: 3px;
    bottom: 20px;
    right: 40px;
    padding: 16px;
    display: flex;
`;
const ErrorRow = styled.div`
    color: #fff;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 130%;
    color: #002e42;
`;

const ErrorTitle = styled.h3`
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    color: #002e42;
    margin-bottom: 8px;
`;
const ErrorBody = styled.div`
    display: flex;
    flex-direction: column;
`;
type Props = { title: string; children: React.ReactNode; onClose: () => void };

const Error: FunctionComponent<Props> = ({ title, children, onClose }) => {
    const onCloseHandler = () => {
        onClose();
    };

    return (
        <ErrorWrapper>
            <ErrorIcon
                style={{
                    marginRight: '8px',
                }}
            />
            <ErrorBody>
                <ErrorTitle>{title}</ErrorTitle>
                <ErrorRow>{children}</ErrorRow>
            </ErrorBody>
            <CloseIcon
                onClick={onCloseHandler}
                style={{ cursor: 'pointer', marginLeft: 'auto' }}
            />
        </ErrorWrapper>
    );
};

export default Error;
