import React, { FunctionComponent, useState } from 'react';

import Container from '../../components/Container';
import Text from '../../components/Text';
import {
    availableCloudProviders,
    availableMethod,
    availableTimeRange,
} from '../../utils/selectOptions';
import styled from 'styled-components';
import Toggle from '../../components/Toggle';
import Select from '../../components/Select';
import Label from '../../components/Label';
import Input from '../../components/Input';
import Tooltip from '../../components/Tooltip';
import Status from '../../components/Status';

const ContainerSteps = styled.div`
    position: relative;
    background: #fff;
    padding: 24px;
    border: 1px solid #e7e7e7;
    border-radius: 4px;
    margin-bottom: 24px;
    margin-left: 15px;
    margin-right: 15px;
    height: 100%;
`;

const TopWrapper = styled.div`
    margin-top: 20px;
    margin-bottom: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const SelectWrapper = styled.div`
    position: relative;
    max-width: 215px;
    width: 100%;
`;

const OneColumn = styled.div`
    margin-bottom: 16px;
`;
const TwoColumns = styled.div`
    display: flex;
    flex-direction: row;
    gap: 24px;
    width: 100%;
    margin-bottom: 16px;
`;
const FormControl = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;
const FormControlDescription = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;
const IconStar = styled.div`
    color: #335868;
    margin-right: 3px;
`;

const FormControlSection = styled.div`
    width: 30%;
    position: relative;
`;

type Props = {
    stageDisplay: boolean;
    stageDeploy: string;
    methodTest: string;
    activeRangeTime: string;
    activeCloudProvider: string;
    onChangeMethodTest: (option: string) => void;
    onChangeRangeTime: (option: string) => void;
    onChangeCloudProvider: (option: string) => void;
    updateMeta: (data: Meta) => void;
};
type Meta = {
    field: string;
    value: string;
};

const ExportDeploy: FunctionComponent<Props> = ({
    stageDisplay,
    stageDeploy,
    methodTest,
    activeRangeTime,
    activeCloudProvider,
    onChangeMethodTest,
    onChangeRangeTime,
    onChangeCloudProvider,
    updateMeta,
}) => {
    const onToggleHandler = (option: string) => {
        onChangeMethodTest(option);
    };

    return (
        <Container>
            <ContainerSteps>
                <Text tag='h2'>Export or deplot to cloud</Text>
                <Toggle
                    options={availableMethod}
                    onToggle={onToggleHandler}
                    activeToggle={methodTest}
                />
                <TopWrapper>
                    <Text tag='p'>some info</Text>
                    <SelectWrapper>
                        <Select
                            options={availableCloudProviders}
                            onChangeSelect={onChangeCloudProvider}
                            currentValue={activeCloudProvider}
                        />
                    </SelectWrapper>
                </TopWrapper>
                <OneColumn>
                    <FormControl>
                        <Label>
                            <IconStar>*</IconStar> Function Name
                            <Tooltip>this is tooltip</Tooltip>
                        </Label>
                        <Input
                            name='name'
                            type='text'
                            placeholder='Function name'
                            onChange={(
                                e: React.FormEvent<HTMLInputElement>,
                            ) => {
                                updateMeta({
                                    field: 'name',
                                    value: e.currentTarget.value,
                                });
                            }}
                        />
                    </FormControl>
                </OneColumn>
                <TwoColumns>
                    <FormControl>
                        <Label>
                            <IconStar>*</IconStar> Logz.io logs token
                            <Tooltip>this is tooltip</Tooltip>
                        </Label>
                        <Input
                            name='token'
                            type='text'
                            placeholder='Logz.io logs token'
                            onChange={(
                                e: React.FormEvent<HTMLInputElement>,
                            ) => {
                                updateMeta({
                                    field: 'token',
                                    value: e.currentTarget.value,
                                });
                            }}
                        />
                    </FormControl>
                    <FormControl>
                        <Label>
                            <IconStar>*</IconStar> Logz.io Listener
                            <Tooltip>this is tooltip</Tooltip>
                        </Label>
                        <Input
                            name='listener'
                            type='text'
                            placeholder='Logz.io Listener'
                            onChange={(
                                e: React.FormEvent<HTMLInputElement>,
                            ) => {
                                updateMeta({
                                    field: 'listener',
                                    value: e.currentTarget.value,
                                });
                            }}
                        />
                    </FormControl>
                </TwoColumns>
                <TwoColumns>
                    <FormControlDescription>
                        <Label>
                            Description <Tooltip>this is tooltip</Tooltip>
                        </Label>
                        <Input
                            name='desciption'
                            type='text'
                            placeholder='Lambda function description'
                            onChange={(
                                e: React.FormEvent<HTMLInputElement>,
                            ) => {
                                updateMeta({
                                    field: 'description',
                                    value: e.currentTarget.value,
                                });
                            }}
                        />
                    </FormControlDescription>
                    <FormControlSection>
                        <Label>
                            <IconStar>*</IconStar> Scheduling Rate
                            <Tooltip>this is tooltip</Tooltip>
                        </Label>
                        <Select
                            options={availableTimeRange}
                            onChangeSelect={onChangeRangeTime}
                            currentValue={activeRangeTime}
                        />
                    </FormControlSection>
                </TwoColumns>
                <TwoColumns>
                    <FormControl>
                        <Label>
                            <IconStar>*</IconStar> Bucket name
                            <Tooltip>this is tooltip</Tooltip>
                        </Label>
                        <Input
                            name='bucketName'
                            type='text'
                            placeholder='Bucket Name'
                            onChange={(
                                e: React.FormEvent<HTMLInputElement>,
                            ) => {
                                updateMeta({
                                    field: 'bucketName',
                                    value: e.currentTarget.value,
                                });
                            }}
                        />
                    </FormControl>
                    <FormControl>
                        <Label>
                            <IconStar>*</IconStar>Region
                            <Tooltip>this is tooltip</Tooltip>
                        </Label>
                        <Input
                            name='region'
                            type='text'
                            placeholder='Region'
                            onChange={(
                                e: React.FormEvent<HTMLInputElement>,
                            ) => {
                                updateMeta({
                                    field: 'region',
                                    value: e.currentTarget.value,
                                });
                            }}
                        />
                    </FormControl>
                </TwoColumns>
                {methodTest === 'Cloud' ? (
                    <TwoColumns>
                        <FormControl>
                            <Label>
                                <IconStar>*</IconStar> Access key
                                <Tooltip>this is tooltip</Tooltip>
                            </Label>
                            <Input
                                name='accessKey'
                                type='text'
                                placeholder='Access Key'
                                onChange={(
                                    e: React.FormEvent<HTMLInputElement>,
                                ) => {
                                    updateMeta({
                                        field: 'accessKey',
                                        value: e.currentTarget.value,
                                    });
                                }}
                            />
                        </FormControl>
                        <FormControl>
                            <Label>
                                <IconStar>*</IconStar> Secret Key
                                <Tooltip>this is tooltip</Tooltip>
                            </Label>
                            <Input
                                name='secretKey'
                                type='text'
                                placeholder='Secret Key'
                                onChange={(
                                    e: React.FormEvent<HTMLInputElement>,
                                ) => {
                                    updateMeta({
                                        field: 'secretKey',
                                        value: e.currentTarget.value,
                                    });
                                }}
                            />
                        </FormControl>
                    </TwoColumns>
                ) : (
                    ''
                )}
                {stageDisplay ? <Status stage={stageDeploy} /> : ''}
            </ContainerSteps>
        </Container>
    );
};

export default ExportDeploy;
