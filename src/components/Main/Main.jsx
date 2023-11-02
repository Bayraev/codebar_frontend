import React, { useEffect } from 'react';
import styles from './Main.module.scss';
import Snippets from './Snippets';
import SnippetCRUD from './SnippetCRUD';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from '../../app/features/AuthSlice';
import { asyncGetSnippets } from '../../app/features/snippetsSlice';

const Main = () => {
  const userId = useSelector((state) => state.authorization.user.id); // if authorizated, its not null.
  const dispatch = useDispatch();

  // Dispatching snippets from backend.
  useEffect(() => {
    if (userId) {
      dispatch(asyncGetSnippets({ ownerId: userId }));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    dispatch(checkAuth()); // if refreshToken is okay, it authorizating
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
