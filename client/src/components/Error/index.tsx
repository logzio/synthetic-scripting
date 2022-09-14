import React, { FunctionComponent } from 'react';

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
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 130%;
    color: #002e42;
`;
const IconError = styled.div`
    margin-right: 8px;
`;
const ErrorTitle = styled.h3`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    color: #002e42;
    margin-bottom: 8px;
`;
const IconClose = styled.div`
    cursor: pointer;
    margin-left: auto;
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
            <IconError>
                <svg width='14' height='15' viewBox='0 0 14 15'>
                    <path
                        d='M7.82031 8.13477C7.82031 8.36263 7.73828 8.55859 7.57422 8.72266C7.41927 8.8776 7.22786 8.95508 7 8.95508C6.77214 8.95508 6.57617 8.8776 6.41211 8.72266C6.25716 8.55859 6.17969 8.36263 6.17969 8.13477V4.01953C6.17969 3.79167 6.25716 3.5957 6.41211 3.43164C6.57617 3.26758 6.77214 3.18555 7 3.18555C7.22786 3.18555 7.41927 3.26758 7.57422 3.43164C7.73828 3.5957 7.82031 3.79167 7.82031 4.01953V8.13477ZM7 11.4297C6.77214 11.4297 6.57617 11.3477 6.41211 11.1836C6.25716 11.0195 6.17969 10.8281 6.17969 10.6094C6.17969 10.3815 6.25716 10.1855 6.41211 10.0215C6.57617 9.85742 6.77214 9.77539 7 9.77539C7.22786 9.77539 7.41927 9.85742 7.57422 10.0215C7.73828 10.1855 7.82031 10.3815 7.82031 10.6094C7.82031 10.8281 7.73828 11.0195 7.57422 11.1836C7.41927 11.3477 7.22786 11.4297 7 11.4297ZM13.6172 6.94531L7.92969 1.25781C7.67448 1.0026 7.36458 0.875 7 0.875C6.63542 0.875 6.32552 1.0026 6.07031 1.25781L0.382812 6.94531C0.127604 7.20052 0 7.51042 0 7.875C0 8.23958 0.127604 8.54948 0.382812 8.80469L6.07031 14.4922C6.32552 14.7474 6.63542 14.875 7 14.875C7.36458 14.875 7.67448 14.7474 7.92969 14.4922L13.6172 8.80469C13.8724 8.54948 14 8.23958 14 7.875C14 7.51042 13.8724 7.20052 13.6172 6.94531Z'
                        fill='#E95D39'
                    />
                </svg>
            </IconError>
            <ErrorBody>
                <ErrorTitle>{title}</ErrorTitle>
                <ErrorRow>{children}</ErrorRow>
            </ErrorBody>
            <IconClose onClick={onCloseHandler}>
                <svg width='10' height='10' viewBox='0 0 10 10'>
                    <path
                        d='M5.90234 4.75L9.3125 1.33984C9.4375 1.21484 9.5 1.06641 9.5 0.894531C9.5 0.722656 9.4375 0.570313 9.3125 0.4375C9.17969 0.3125 9.02734 0.25 8.85547 0.25C8.68359 0.25 8.53516 0.3125 8.41016 0.4375L5 3.84766L1.58984 0.4375C1.46484 0.3125 1.31641 0.25 1.14453 0.25C0.972656 0.25 0.820312 0.3125 0.6875 0.4375C0.5625 0.570313 0.5 0.722656 0.5 0.894531C0.5 1.06641 0.5625 1.21484 0.6875 1.33984L4.09766 4.75L0.6875 8.16016C0.5625 8.28516 0.5 8.43359 0.5 8.60547C0.5 8.77734 0.5625 8.92969 0.6875 9.0625C0.757812 9.125 0.828125 9.17188 0.898438 9.20312C0.96875 9.23438 1.05078 9.25 1.14453 9.25C1.23828 9.25 1.32031 9.23438 1.39062 9.20312C1.46094 9.17188 1.52734 9.125 1.58984 9.0625L5 5.65234L8.41016 9.0625C8.47266 9.125 8.54688 9.17188 8.63281 9.20312C8.71875 9.23438 8.79297 9.25 8.85547 9.25C8.91797 9.25 8.99219 9.23438 9.07812 9.20312C9.16406 9.17188 9.24219 9.125 9.3125 9.0625C9.4375 8.92969 9.5 8.77734 9.5 8.60547C9.5 8.43359 9.4375 8.28516 9.3125 8.16016L5.90234 4.75Z'
                        fill='#7A7A7A'
                    />
                </svg>
            </IconClose>
        </ErrorWrapper>
    );
};

export default Error;
