import React from 'react';
import styles from './Header.module.scss';
import search_icon from '../../assets/images/auth_icon.png';

const Header = () => {
  return (
    <div className={styles.wrapper}>
      <span>{'<Codebar />'}</span>
      <img className={styles.account_icon} src={search_icon} alt="" />
    </div>
  );
};

export default Header;
