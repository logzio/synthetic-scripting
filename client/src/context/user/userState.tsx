import React, { useReducer, FunctionComponent } from 'react';
import { userReducer } from './userReducer';
import { UserContext } from './userContext';
import { Meta, MetaConfig } from '../types';

interface IProps {
    children: React.ReactNode;
}

export const UserState: FunctionComponent<IProps> = ({ children }) => {
    const initialState: MetaConfig = {
        codeSnippet: {
            value: '',
            isValid: true,
        },
        name: {
            value: '',
            isValid: true,
        },
        accessKey: {
            value: '',
            isValid: true,
        },
        secretKey: {
            value: '',
            isValid: true,
        },
        bucketName: {
            value: '',
            isValid: true,
        },
        token: {
            value: '',
            isValid: true,
        },
        listener: {
            value: '',
            isValid: true,
        },

        listEnvVariables: [],
        description: {
            value: '',
            isValid: true,
        },
    };

    const [state, dispatch] = useReducer(userReducer, initialState);
    const setConfigs = (data: Meta) => {
        dispatch({ type: 'FILL_DATA', payload: data });
    };

    return (
        <UserContext.Provider value={{ setConfigs, configs: state }}>
            {children}
        </UserContext.Provider>
    );
};
