import React, { FunctionComponent, useRef } from 'react';
import Editor from '@monaco-editor/react';

import styled from 'styled-components';

const CodeEditorWrapper = styled.div`
    border: 1px solid #e7e7e7;
    box-shadow: inset 0px -4px 6px rgba(21, 22, 26, 0.12);
    border-radius: 4px;
    position: relative;
    width: 70%;
    max-height: 430px;
    height: 100%;
    overflow: hidden;
`;

type Props = {
    codeSnippet: string;
    setCodeSnippet: (val: string) => void;
};
const CodeEditor: FunctionComponent<Props> = ({
    setCodeSnippet,
    codeSnippet,
}) => {
    const editorRef = useRef(null);

    const handleEditorDidMount = (editor: any, monaco: any) => {
        // here is the editor instance
        // you can store it in `useRef` for further usage
        editorRef.current = editor;
    };

    const onChangeHandler = (value: any, event: any) => {
        setCodeSnippet(value);
    };

    return (
        <CodeEditorWrapper>
            <Editor
                height='90vh'
                defaultLanguage='javascript'
                defaultValue={codeSnippet}
                onMount={handleEditorDidMount}
                onChange={onChangeHandler}
            />
        </CodeEditorWrapper>
    );
};

export default CodeEditor;
