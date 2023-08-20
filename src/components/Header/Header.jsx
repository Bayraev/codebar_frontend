import React from "react";
import styles from "./Header.module.scss";
import login_icon from "../../assets/images/auth_icon.png";
import logout_icon from "../../assets/images/logout_icon.png";
import { Link } from "react-router-dom";
import Authorization from "../Authorization/Authorization.tsx";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../app/features/AuthSlice";
import { toggleAuthWindowOpen } from "../../app/features/uiSlice";

const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.authorization.isAuth);
  // const [authWindowOpened, setAuthWindowOpened] = useState(false);
  const authWindowOpened = useSelector((state) => state.ui.isAuthWindowOpen);

  const handleLogout = () => {
    alert("Logout..");
    dispatch(toggleAuthWindowOpen());
    dispatch(logout());
  };

  return (
    <>
      {authWindowOpened && <Authorization />}

      <div className={styles.wrapper}>
        <Link to="/" className={styles.header}>
          {"<Codebar />"}
        </Link>

        {isAuth ? (
          <img
            onClick={() => handleLogout()}
            className={styles.account_icon}
            src={logout_icon}
          />
        ) : (
          <img
            onClick={() => dispatch(toggleAuthWindowOpen())}
            className={styles.account_icon}
            src={login_icon}
          />
        )}
      </div>
    </>
  );
};

export default Header;
