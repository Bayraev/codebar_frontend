import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { loadLanguage, langNames, langs } from '@uiw/codemirror-extensions-langs';
import {
  //   materialDark,
  materialDarkInit,
  // materialLight,
  // materialLightInit,
} from '@uiw/codemirror-theme-material';

// downloaded language, ig

loadLanguage('tsx');
langs.tsx();

const CodemirrorField = ({ options, snippet, setSnippet }) => {
  return (
    <CodeMirror
      theme={materialDarkInit({
        settings: {
          caret: '#c6c6c6',
          fontFamily: 'monospace',
        },
      })}
      extensions={[langs.tsx()]}
      value={snippet}
      onChange={(value) => setSnippet(value)}
      options={options}
    />
  );
};

export default CodemirrorField;
