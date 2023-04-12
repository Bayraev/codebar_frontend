import React from 'react';
import styles from './Main.module.scss';
import Snippets from './Snippets';
import SnippetCRUD from './SnippetCRUD';

const Main = () => {
  return (
    <div className={styles.wrapper}>
      <SnippetCRUD />
      {/* <Snippets /> */}
    </div>
  );
};

export default Main;
