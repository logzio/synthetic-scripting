import React, { FunctionComponent } from 'react';

import styled from 'styled-components';
import Button from '../../components/Button';

const ButtonWrapper = styled.div`
    position: relative;
    margin-left: 284px;
    margin-right: auto;
    width: calc(100% - 284px);
    max-width: 1280px;
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
`;
const ButtonRow = styled.div`
    margin-right: 15px;
    margin-left: 15px;
`;
type Props = {
    methodTest: string;
    onChangeStep: (name: string) => void;
    activeStep: string;
};
const ButtonContainer: FunctionComponent<Props> = ({
    methodTest,
    onChangeStep,
    activeStep,
}) => {
    return (
        <ButtonWrapper>
            <ButtonRow>
                {activeStep === 'edit_code' ? (
                    <Button
                        onClick={() => {
                            onChangeStep('deploy');
                        }}
                        type='yellow'
                    >
                        Next
                    </Button>
                ) : (
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
                                Download
                            </Button>
                        )}
                    </>
                )}
            </ButtonRow>
        </ButtonWrapper>
    );
};

export default ButtonContainer;
