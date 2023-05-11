import React from 'react';
import styles from './Header.module.scss';
import search_icon from '../../assets/images/auth_icon.png';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className={styles.wrapper}>
      <Link to="/" className={styles.header}>
        {'<Codebar />'}
      </Link>
      <img className={styles.account_icon} src={search_icon} alt="" />
    </div>
  );
};

export default Header;
