import React from 'react';
import styles from './Main.module.scss';
import Snippets from './Snippets';
import SnippetCRUD from './SnippetCRUD';
import { Navigate, Route, Routes } from 'react-router-dom';

const Main = () => {
  return (
    <div className={styles.wrapper}>
      <Routes>
        <Route path="/" element={<Navigate to="/snippets" />} />
        <Route path="/snippets" element={<Snippets />} />

        <Route path="/snippet/new" element={<SnippetCRUD />} />
        <Route path="/snippet/:id" element={<SnippetCRUD />} />
      </Routes>
    </div>
  );
};

export default Main;
