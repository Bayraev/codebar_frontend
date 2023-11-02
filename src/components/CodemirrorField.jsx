import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { loadLanguage, langs } from '@uiw/codemirror-extensions-langs';
import {
  //   materialDark,
  materialDarkInit,
  // materialLight,
  // materialLightInit,
} from '@uiw/codemirror-theme-material';

// downloaded language, ig

loadLanguage('tsx');
langs.tsx();

const options = {
  mode: 'jsx',
  theme: 'material',
  lineNumbers: true,
  tabSize: 2,
};

const CodemirrorField = ({ snippet, setSnippet }) => {
  return (
    <CodeMirror
      theme={materialDarkInit({
        settings: {
          caret: '#c6c6c6',
          fontFamily: 'monospace',
          gutterActiveForeground: 'black',
        },
      })}
      height="300px"
      extensions={[langs.tsx()]}
      value={snippet}
      onChange={(value) => setSnippet(value)}
      options={options}
    />
  );
};

export default CodemirrorField;
