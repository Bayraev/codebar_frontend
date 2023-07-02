import React from 'react';
import styles from './Header.module.scss';
import login_icon from '../../assets/images/auth_icon.png';
import logout_icon from '../../assets/images/logout_icon.png';
import { Link } from 'react-router-dom';
import Authorization from '../Authorization/Authorization.tsx';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../app/features/AuthSlice';

const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.authorization.isAuth);
  const [authWindowOpened, setAuthWindowOpened] = useState(false);

  const handleLogout = () => {
    alert('Logout..');
    setAuthWindowOpened(!authWindowOpened);
    dispatch(logout());
  };

  return (
    <>
      {authWindowOpened && <Authorization />}

      <div className={styles.wrapper}>
        <Link to="/" className={styles.header}>
          {'<Codebar />'}
        </Link>

        {isAuth ? (
          <img onClick={() => handleLogout()} className={styles.account_icon} src={logout_icon} />
        ) : (
          <img
            onClick={() => setAuthWindowOpened(!authWindowOpened)}
            className={styles.account_icon}
            src={login_icon}
          />
        )}
      </div>
    </>
  );
};

export default Header;
