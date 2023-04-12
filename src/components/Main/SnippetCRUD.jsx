import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';

import './SnippetCRUD.scss';
import styles from './SnippetCRUD.module.scss';

const SnippetCRUD = () => {
  const [code, setCode] = useState('');

  const options = {
    mode: 'jsx',
    theme: 'material',
    lineNumbers: true,
  };

  return (
    <div id="SnippetWrapper">
      <form action="submit">
        <input type="text" placeholder="Large language model" className="input" />
        <button className="dark_gray_button">Add Tag</button>
      </form>
      <div className={styles.tags}>
        <div className={styles.tag}>CSS</div>
        <div className={styles.tag}>EcmaScrypt</div>
      </div>
      <div className={styles.update_or_delete}>
        <button className="dark_gray_button">Confirm</button>
        <button className={styles.delete_button}>Delete</button>
      </div>

      {/* chatGPT, write your code  */}
      <CodeMirror value={code} onChange={(value) => setCode(value)} options={options} />
    </div>
  );
};

export default SnippetCRUD;
