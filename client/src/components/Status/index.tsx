import React, { FunctionComponent, useEffect, useState } from 'react';

import styled from 'styled-components';
import Button from '../Button';

const StatusWrapper = styled.div`
    background: #fff;
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    border-radius: 4px;
    justify-content: center;
    align-items: center;
    text-align: center;
`;
const StatusRow = styled.div`
    position: relative;
    width: 100%;
`;
const StatusRowText = styled.div`
    display: flex;
    position: relative;
    justify-content: center;
    height: 30px;
`;

const StatusText = styled.div`
    position: absolute;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    color: #335868;
    transition: all 0.3s ease;
    opacity: 0;
    margin-top: 4px;
    transtion: bottom 0.5s ease, opacity 0.5s ease;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 16px;
    &.display {
        transition-delay: 0.6s;
        opacity: 1;
        bottom: 0px;
    }
    &.hide {
        bottom: 10px;
        opacity: 0;
    }
    &.withButton {
        bottom: -46px;
    }
`;

const StatusIcon = styled.svg`
    &.success .empty,
    .fail {
        display: none;
    }
    &.success,
    &.stage-fail {
        animation: pulse-dot 0.8s ease;
    }
    &.success .full {
        display: flex;
    }
    .full {
        display: none;
        transition: pulse-dot 0.8s ease;
    }

    &.stage-fail .fail {
        display: flex;
    }
    &.stage-fail .full,
    &.stage-fail .empty {
        display: none;
    }
`;

type StatusProps = {
    message: string;
    isSuccessful: boolean;
    isEnd: boolean;
};

interface IProps {
    stage: StatusProps;
    goBackHandler: (step: string) => void;
}

const Status: FunctionComponent<IProps> = ({ stage, goBackHandler }) => {
    const [isSuccessful, setIsSuccessful] = useState<boolean>(true);
    const [message, setMessage] = useState<string>('Function Creating...');
    const [isEnd, setIsEnd] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const goBack = () => {
        goBackHandler('edit_code');
    };
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
            setMessage(stage.message);
            setIsSuccessful(stage.isSuccessful);
            setIsEnd(stage.isEnd);
        }, 600);
        return () => {
            clearTimeout(timer);
        };
    }, [stage]);

    return (
        <StatusWrapper>
            <StatusRow>
                <StatusIcon
                    className={`${isEnd ? 'success' : ''} ${
                        !isSuccessful ? 'stage-fail' : ''
                    }`}
                    width='20'
                    height='21'
                    viewBox='0 0 20 21'
                >
                    <path
                        className='empty'
                        d='M9.49219 13.7812C9.0625 14.2109 8.39844 14.2109 7.96875 13.7812L5.46875 11.2812C5.03906 10.8516 5.03906 10.1875 5.46875 9.75781C5.89844 9.32812 6.5625 9.32812 6.99219 9.75781L8.75 11.4766L12.9688 7.25781C13.3984 6.82812 14.0625 6.82812 14.4922 7.25781C14.9219 7.6875 14.9219 8.35156 14.4922 8.78125L9.49219 13.7812ZM20 10.5C20 16.0469 15.5078 20.5 10 20.5C4.45312 20.5 0 16.0469 0 10.5C0 4.99219 4.45312 0.5 10 0.5C15.5078 0.5 20 4.99219 20 10.5ZM10 2.375C5.50781 2.375 1.875 6.04688 1.875 10.5C1.875 14.9922 5.50781 18.625 10 18.625C14.4531 18.625 18.125 14.9922 18.125 10.5C18.125 6.04688 14.4531 2.375 10 2.375Z'
                        fill='#73B976'
                    />
                    <path
                        className='full'
                        d='M10 20.5C15.5078 20.5 20 16.0469 20 10.5C20 4.99219 15.5078 0.5 10 0.5C4.45312 0.5 0 4.99219 0 10.5C0 16.0469 4.45312 20.5 10 20.5ZM14.4141 8.66406L9.41406 13.6641C9.02344 14.0547 8.4375 14.0547 8.08594 13.6641L5.58594 11.1641C5.19531 10.8125 5.19531 10.2266 5.58594 9.875C5.9375 9.48438 6.52344 9.48438 6.91406 9.875L8.75 11.7109L13.0859 7.33594C13.4375 6.98438 14.0234 6.98438 14.375 7.33594C14.7656 7.72656 14.7656 8.3125 14.375 8.66406H14.4141Z'
                        fill='#73B976'
                    />
                    <path
                        className='fail'
                        d='M6.83594 7.33594C7.1875 6.98438 7.77344 6.98438 8.125 7.33594L9.96094 9.21094L11.8359 7.33594C12.1875 6.98438 12.7734 6.98438 13.125 7.33594C13.5156 7.72656 13.5156 8.3125 13.125 8.66406L11.2891 10.5L13.125 12.3359C13.5156 12.7266 13.5156 13.3125 13.125 13.6641C12.7734 14.0547 12.1875 14.0547 11.8359 13.6641L9.96094 11.8281L8.125 13.6641C7.77344 14.0547 7.1875 14.0547 6.83594 13.6641C6.44531 13.3125 6.44531 12.7266 6.83594 12.3359L8.67188 10.5L6.83594 8.66406C6.44531 8.3125 6.44531 7.72656 6.83594 7.33594ZM20 10.5C20 16.0469 15.5078 20.5 10 20.5C4.45312 20.5 0 16.0469 0 10.5C0 4.99219 4.45312 0.5 10 0.5C15.5078 0.5 20 4.99219 20 10.5ZM10 2.375C5.50781 2.375 1.875 6.04688 1.875 10.5C1.875 14.9922 5.50781 18.625 10 18.625C14.4531 18.625 18.125 14.9922 18.125 10.5C18.125 6.04688 14.4531 2.375 10 2.375Z'
                        fill='#D25433'
                    />
                </StatusIcon>

                <StatusRowText>
                    <StatusText
                        className={`${isLoading ? 'hide' : 'display'} ${
                            !isSuccessful || isEnd ? 'withButton' : ''
                        }`}
                    >
                        {message}
                        {isEnd || !isSuccessful ? (
                            <Button onClick={goBack} type='white'>
                                Go back
                            </Button>
                        ) : (
                            ''
                        )}
                    </StatusText>
                </StatusRowText>
            </StatusRow>
        </StatusWrapper>
    );
};

export default Status;
