import React from 'react';
import styles from './Header.module.scss';
import search_icon from '../../assets/images/auth_icon.png';
import { Link } from 'react-router-dom';
import Authorization from '../Authorization/Authorization.tsx';
import { useState } from 'react';

const Header = () => {
  const [authWindowOpened, setAuthWindowOpened] = useState(false);
  return (
    <>
      {authWindowOpened && <Authorization />}

      <div className={styles.wrapper}>
        <Link to="/" className={styles.header}>
          {'<Codebar />'}
        </Link>
        <img
          onClick={() => setAuthWindowOpened(!authWindowOpened)}
          className={styles.account_icon}
          src={search_icon}
          alt=""
        />
      </div>
    </>
  );
};

export default Header;
