import React, { FunctionComponent } from 'react';

import Container from '../../components/Container';
import Text from '../../components/Text';
import {
    availableCloudProviders,
    availableMethod,
    availableTimeRange,
    awsRegions,
} from '../../utils/selectOptions';
import styled from 'styled-components';
import Toggle from '../../components/Toggle';
import Select from '../../components/Select';
import Label from '../../components/Label';
import Input from '../../components/Input';
import Tooltip from '../../components/Tooltip';
import Status from '../../components/Status';
import { MetaConfig } from '../../context/types';

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
const WrapperWithProps = styled.div``;
const SelectWrapper = styled(WrapperWithProps)<{ full?: boolean }>`
    position: relative;
    max-width: ${(props) => (props.full ? '100%;' : '215px;')}
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
type StatusProps = {
    message: string;
    isSuccessful: boolean;
    isEnd: boolean;
};

interface IProps {
    stageDisplay: boolean;
    stageDeploy: StatusProps;
    methodTest: string;
    activeRegion: string;
    activeRangeTime: string;
    activeCloudProvider: string;
    statusGoBackHandler: (option: string) => void;
    onChangeMethodTest: (option: string) => void;
    onChangeRegion: (option: string) => void;
    onChangeRangeTime: (option: string) => void;
    onChangeCloudProvider: (option: string) => void;
    updateMeta: (data: Meta) => void;
    configs: MetaConfig;
}
type Meta = {
    field: string;
    value: string;
};

const ExportDeploy: FunctionComponent<IProps> = ({
    stageDisplay,
    stageDeploy,
    activeRegion,
    methodTest,
    activeRangeTime,
    activeCloudProvider,
    statusGoBackHandler,
    onChangeMethodTest,
    onChangeRangeTime,
    onChangeRegion,
    onChangeCloudProvider,
    updateMeta,
    configs,
}) => {
    const onToggleHandler = (option: string) => {
        onChangeMethodTest(option);
    };
    console.log(configs);
    return (
        <Container>
            <ContainerSteps>
                <Text tag='h2'>
                    Download template or deploy directly to cloud
                </Text>
                <Toggle
                    options={availableMethod}
                    onToggle={onToggleHandler}
                    activeToggle={methodTest}
                />
                <TopWrapper>
                    {methodTest === 'Cloud' ? (
                        <Text tag='p'>
                            Use this feature to directly deploy your test script
                            to the cloud environment.
                        </Text>
                    ) : (
                        <Text tag='p'>
                            Use this feature to locally generate and download a
                            template that you can upload to your cloud
                            environment.
                        </Text>
                    )}

                    <SelectWrapper full={false}>
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
                            <Tooltip>
                                Name of the function for your test script.
                            </Tooltip>
                        </Label>
                        <Input
                            name='name'
                            type='text'
                            placeholder='Function name'
                            value={configs.name.value}
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
                            <Tooltip>Your Logz.io log shipping token.</Tooltip>
                        </Label>
                        <Input
                            name='token'
                            type='text'
                            placeholder='Logz.io logs token'
                            value={configs.token.value}
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
                            <Tooltip>Your Logz.io listener URL.</Tooltip>
                        </Label>
                        <Input
                            name='listener'
                            type='text'
                            value={configs.listener.value}
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
                            Description{' '}
                            <Tooltip>
                                Description of your function for the test
                                script.
                            </Tooltip>
                        </Label>
                        <Input
                            name='desciption'
                            type='text'
                            value={
                                configs.description
                                    ? configs.description.value
                                    : ''
                            }
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
                            <Tooltip>Scheduling rate for the function.</Tooltip>
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
                            <Tooltip>
                                Name of the bucket to upload the function to.
                            </Tooltip>
                        </Label>
                        <Input
                            name='bucketName'
                            type='text'
                            placeholder='Bucket Name'
                            value={configs.bucketName.value}
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
                            <Tooltip>
                                AWS region of the bucket to upload the function
                                to.
                            </Tooltip>
                        </Label>

                        <SelectWrapper full={true}>
                            <Select
                                options={awsRegions}
                                onChangeSelect={onChangeRegion}
                                currentValue={activeRegion}
                            />
                        </SelectWrapper>
                    </FormControl>
                </TwoColumns>
                {methodTest === 'Cloud' ? (
                    <TwoColumns>
                        <FormControl>
                            <Label>
                                <IconStar>*</IconStar> Access key
                                <Tooltip>
                                    Access key to your cloud environment.
                                </Tooltip>
                            </Label>
                            <Input
                                name='accessKey'
                                type='text'
                                value={configs.accessKey.value}
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
                                <Tooltip>
                                    Secret key to your cloud environment.
                                </Tooltip>
                            </Label>
                            <Input
                                name='secretKey'
                                type='text'
                                value={configs.secretKey.value}
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
                {stageDisplay ? (
                    <Status
                        stage={stageDeploy}
                        goBackHandler={statusGoBackHandler}
                    />
                ) : (
                    ''
                )}
            </ContainerSteps>
        </Container>
    );
};

export default ExportDeploy;
