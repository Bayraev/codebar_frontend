import React, { useState } from 'react';

import './SnippetCRUD.scss';
import styles from './SnippetCRUD.module.scss';
import CodemirrorField from '../CodemirrorField';
import SnippetDescriptionField from './SnippetDescriptionField';

const SnippetCRUD = () => {
  const [code, setCode] = useState('\n\n\n\n\n\n\n\n');

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

      <SnippetDescriptionField styles={styles} />

      <CodemirrorField options={options} code={code} setCode={setCode} />
    </div>
  );
};

export default SnippetCRUD;
