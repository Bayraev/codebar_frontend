import React, { useRef, useState } from "react";
import styles from "./Authorization.module.scss";
import { login, registration } from "../../app/features/AuthSlice";
import { AppDispatch } from "../../app/store";
import { useDispatch } from "react-redux";
import { toggleAuthWindowOpen } from "../../app/features/uiSlice";
import uiSlice from "../../app/features/uiSlice";

function Authorization(): JSX.Element {
  const dispatch: AppDispatch = useDispatch();

  const [seeSignIn, setSeeSignIn] = useState<boolean>(false); // see or dont see auth window

  const signInRef = useRef<HTMLSpanElement>(null); // ref for border_bottom
  const signUpRef = useRef<HTMLSpanElement>(null); // ref for border_bottom

  // data in inputs..
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  //errors
  const [isPasswordValid, setIsPasswordValid] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState<string>("");

  const handleSigning = (action: boolean) => {
    setSeeSignIn(action);
  }; // jut switchin sign in/up

  const handleSignUpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const timeout: number = 9000;

    // validation
    if (!/^[a-zA-Z]+$/.test(password) || password.length < 8) {
      setIsPasswordValid(
        "The password must contain only Latin characters and be at least 8 characters long!"
      );

      setTimeout(() => {
        setIsPasswordValid("");
      }, timeout);
      return;
    }
    // validation
    if (password !== confirmPassword) {
      setIsPasswordValid("You have different passwords with some reason!");

      setTimeout(() => {
        setIsPasswordValid("");
      }, timeout);
      return;
    }

    // Check email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setIsEmailValid("Write email correctly!");

      setTimeout(() => {
        setIsEmailValid("");
      }, timeout);
      return;
    }

    dispatch(registration({ email, password }));
  };

  const handleSignInSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const timeout: number = 9000;

    // validation
    if (!/^[a-zA-Z]+$/.test(password) || password.length < 8) {
      setIsPasswordValid(
        "The password must contain only Latin characters and be at least 8 characters long!"
      );

      setTimeout(() => {
        setIsPasswordValid("");
      }, timeout);
      return;
    }

    // Check email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setIsEmailValid("Write email correctly!");

      setTimeout(() => {
        setIsEmailValid("");
      }, timeout);
      return;
    }
    dispatch(login({ email, password }));
    dispatch(toggleAuthWindowOpen());
    console.log("Everything working in sign IN yet.");
  };

  return (
    <div className={styles.Authorization}>
      <div className={styles.title}>
        <span
          className={seeSignIn ? styles.underline : ""}
          ref={signInRef}
          onClick={() => handleSigning(true)}
        >
          Sign in
        </span>
        <span> / </span>
        <span
          className={!seeSignIn ? styles.underline : ""}
          ref={signUpRef}
          onClick={() => handleSigning(false)}
        >
          Sign up
        </span>
      </div>

      {seeSignIn && (
        <form onSubmit={(e) => handleSignInSubmit(e)}>
          <div className={styles.inputs}>
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={styles.continue}>
            <button>continue</button>
          </div>
        </form>
      )}

      {!seeSignIn && (
        <form onSubmit={(e) => handleSignUpSubmit(e)}>
          <div className={styles.inputs}>
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              placeholder="Confirm pass"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className={styles.continue}>
            <button>continue</button>
          </div>
        </form>
      )}

      {isPasswordValid && <div className={styles.error}>{isPasswordValid}</div>}
      {isEmailValid && <div className={styles.error}>{isEmailValid}</div>}
    </div>
  );
}

export default Authorization;
