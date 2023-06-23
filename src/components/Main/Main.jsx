import React, { useEffect } from 'react';
import styles from './Main.module.scss';
import Snippets from './Snippets';
import SnippetCRUD from './SnippetCRUD';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSnippets } from '../../app/features/snippetsSlice';

const Main = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSnippets(JSON.parse(localStorage.getItem('snippetsState'))));
  }, [dispatch]);

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
