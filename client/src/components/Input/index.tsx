import React, { FunctionComponent } from 'react';

import styled from 'styled-components';

const InputWrapper = styled.input`
    background: #f7f7f7;
    height: 30px;
    border: 1px solid #e7e7e7;
    border-radius: 3px;
    padding: 6px 8px;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #002e42;
`;

type Props = {
    name: string;
    type: string;
    placeholder: string;
    value?: string;
    defaultValue?: string;
    onChange: (e: React.FormEvent<HTMLInputElement>) => void;
};

const Input: FunctionComponent<Props> = (props) => {
    return <InputWrapper {...props} />;
};

export default Input;
