import React, { FunctionComponent, useRef } from 'react';
import Editor from '@monaco-editor/react';

import styled from 'styled-components';
import Spinner from '../Spinner';

const CodeEditorWrapper = styled.div`
    border: 1px solid #e7e7e7;
    box-shadow: inset 0px -4px 6px rgba(21, 22, 26, 0.12);
    border-radius: 4px;
    position: relative;
    width: 70%;
    height: 100%;
    overflow: hidden;
`;

const Loading = styled.div`
	display:flex;
	z-index 1000;
	position:absolute;
	top:0px;
	width:100%;
	height:100%;
	background-color: rgb(255 255 255 / 69%);
    justify-content: center;
`;

type Props = {
    isValid: (isValidResult: boolean) => void;
    codeSnippet: string;
    setCodeSnippet: (val: string) => void;
    loading: boolean;
};
const CodeEditor: FunctionComponent<Props> = ({
    isValid,
    setCodeSnippet,
    codeSnippet,
    loading,
}) => {
    const editorRef = useRef(null);

    const handleEditorDidMount = (editor: any, monaco: any) => {
        // here is the editor instance
        // you can store it in `useRef` for further usage
        editorRef.current = editor;
    };
    function handleEditorValidation(markers: any) {
        let isValidResult = true;
        // model markers
        markers.forEach((marker: any) => {
            if (marker.severity > 3) {
                isValidResult = false;
                isValid(isValidResult);
                return;
            }
        });
        isValid(isValidResult);
    }
    const onChangeHandler = (value: any, event: any) => {
        setCodeSnippet(value);
    };

    return (
        <CodeEditorWrapper>
            <Editor
                defaultLanguage='javascript'
                defaultValue={codeSnippet}
                onMount={handleEditorDidMount}
                onChange={onChangeHandler}
                onValidate={handleEditorValidation}
            />

            {loading ? (
                <Loading>
                    <Spinner />
                </Loading>
            ) : (
                ''
            )}
        </CodeEditorWrapper>
    );
};

export default CodeEditor;
