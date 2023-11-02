import React from 'react';
import styles from './Header.module.scss';
import login_icon from '../../assets/images/auth_icon.png';
import logout_icon from '../../assets/images/logout_icon.png';
import { Link } from 'react-router-dom';
import Authorization from '../Authorization/Authorization.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { logout, switchAuthWindowOpened } from '../../app/features/AuthSlice';

const Header = () => {
  const dispatch = useDispatch();
  const { isAuth, authWindowOpened } = useSelector((state) => state.authorization);

  const handleLogout = () => {
    alert('Logout..');
    dispatch(switchAuthWindowOpened()); // show/hide auth window
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
          <img
            onClick={() => handleLogout()}
            className={styles.account_icon}
            src={logout_icon}
            alt=""
          />
        ) : (
          <img
            onClick={() => dispatch(switchAuthWindowOpened())}
            className={styles.account_icon}
            src={login_icon}
            alt=""
          />
        )}
      </div>
    </>
  );
};

export default Header;
