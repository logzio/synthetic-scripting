import React, { FunctionComponent } from 'react';

import styled from 'styled-components';
import Button from '../../components/Button';
import { ReactComponent as SpinnerIcon } from '../../assets/icons/spinner.svg';

const ButtonWrapper = styled.div`
    position: relative;
    margin-left: 284px;
    margin-right: auto;
    width: calc(100% - 284px);
    max-width: 1280px;
    display: flex;
    justify-content: flex-end;
`;
const ButtonRow = styled.div`
    margin-right: 15px;
    margin-left: 15px;
    height: 30px;
    display: flex;
`;
type Props = {
    isDownload: boolean;
    methodTest: string;
    onChangeStep: (name: string) => void;
    activeStep: string;
};

const renderButtons = (
    activeStep: string,
    methodTest: string,
    isDownload: boolean,
    onChangeStep: (name: string) => void,
) => {
    switch (activeStep) {
        case 'edit_code':
            return (
                <>
                    <Button
                        onClick={() => {
                            onChangeStep('deploy');
                        }}
                        type='yellow'
                    >
                        Next
                    </Button>
                </>
            );

        case 'deploy':
            return (
                <>
                    <Button
                        onClick={() => {
                            onChangeStep('edit_code');
                        }}
                        type='transparent'
                    >
                        Back
                    </Button>
                    {methodTest === 'Cloud' ? (
                        <Button
                            onClick={() => {
                                onChangeStep('cloud');
                            }}
                            type='yellow'
                        >
                            Deploy
                        </Button>
                    ) : (
                        <Button
                            onClick={() => {
                                onChangeStep('download');
                            }}
                            type='yellow'
                        >
                            {!isDownload ? (
                                'Download'
                            ) : (
                                <SpinnerIcon
                                    style={{
                                        padding: '0px 25px ',
                                        shapeRendering: 'auto',
                                        width: '82px',
                                        height: '100%',
                                    }}
                                />
                            )}
                        </Button>
                    )}
                </>
            );
        case 'download':
            return (
                <>
                    <Button
                        onClick={() => {
                            onChangeStep('edit_code');
                        }}
                        type='transparent'
                    >
                        Back
                    </Button>
                    {methodTest === 'Cloud' ? (
                        <Button
                            onClick={() => {
                                onChangeStep('cloud');
                            }}
                            type='yellow'
                        >
                            Deploy
                        </Button>
                    ) : (
                        <Button
                            onClick={() => {
                                onChangeStep('download');
                            }}
                            type='yellow'
                        >
                            {!isDownload ? (
                                'Download'
                            ) : (
                                <SpinnerIcon
                                    style={{
                                        padding: '0px 25px ',
                                        shapeRendering: 'auto',
                                        width: '82px',
                                        height: '100%',
                                    }}
                                />
                            )}
                        </Button>
                    )}
                </>
            );
        default:
            return;
    }
};

const ButtonContainer: FunctionComponent<Props> = ({
    isDownload,
    methodTest,
    onChangeStep,
    activeStep,
}) => {
    return (
        <ButtonWrapper>
            <ButtonRow>
                {renderButtons(
                    activeStep,
                    methodTest,
                    isDownload,
                    onChangeStep,
                )}
            </ButtonRow>
        </ButtonWrapper>
    );
};

export default ButtonContainer;
