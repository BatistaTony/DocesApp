import React, { useState } from "react";
import "./styles/login.scss";
import { login, getUser } from "./store/actions/user";
import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";
import firebase from "./../firebase";
import { Redirect } from "react-router-dom";

interface Props {}

declare global {
  interface Window {
    recaptchaVerifier: any;
    confirmResult: any;
  }
}

export default function Login() {
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isOk, setIsOk] = useState<Boolean>(false);
  const userDataSetted = useSelector((state: any) => state.user.username);

  const dispacth = useDispatch();

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const loginUser = async () => {
    const data = {
      user,
      password,
    };

    if (user === "") {
      setError("Email or phone number empty");
    } else if (password === "") {
      setError("Password Empty");
    } else if (error === "") {
      const userData = {
        img: "images/avatar.png",
        username: "Batista Oliveira",
        phonenumber: "+244941551087",
        address: "Luanda, Maianga",
      };

      //await dispacth(login(data));
      //await dispacth(getUser(userData));

      //make the login

      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "normal",
          callback: function (response: any) {},
          "expired-callback": function () {},
        }
      );

      await firebase
        .auth()
        .signInWithPhoneNumber(user, window.recaptchaVerifier)
        .then((confirmationResult: any) => {
          console.log(confirmationResult.confirm("ghkjdgt546jhjhdghd"));
        })
        .catch((err) => console.log(err));

      

      //await setIsOk(true);
    }
  };

   const handleChange = (e: any) => {
    setError("");

    if (e.target.name === "user") {
      setUser(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const openSignUp = () => {
    $(".overlay_sign").fadeIn();
  };

  const closeSignUp = () => {
    $(".overlay_sign").fadeOut();
  };

  const signUp = () => {
    //sign up with facebook and other stuffs if i putted
  };

  return (
    <div className="login">
      {userDataSetted ? <Redirect to="/doces" /> : null}
      <div id="sign-in-button"></div>
      <div className="logo_lg">
        <img src="images/man_ice_cream.png" alt="" />
        <h1 className="titl_lg">LOGIN</h1>
      </div>
      <div className="div_form_lg">
        <div id="recaptcha-container"></div>

        <form action="" onSubmit={handleSubmit} className="form_lg">
          <input
            type="text"
            placeholder="Email ou phone number"
            className="ipt_lg"
            name="user"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="ipt_lg"
            onChange={handleChange}
          />

          {error ? <p className="error_report">{error}</p> : null}

          <button onClick={loginUser} className="btnLogin">
            LOGIN
          </button>

          <div className="bar_til_lg">
            <hr className="bar_lg" />
            <p className="txt_lg">Don't have an account</p>
            <hr className="bar_lg" />
          </div>

          <button onClick={openSignUp} className="btnLogin btnSignup">
            SIGN UP
          </button>
        </form>
      </div>
      <div className="overlay_sign">
        <div className="div1">
          <div className="sign_up_div">
            <h1 className="title_sign">
              You Just Need Enter With Your Facebook Account !
            </h1>
            <button onClick={signUp} className="btnSign_">
              Facebook
            </button>
            <button onClick={closeSignUp} className="btnSign_ btnCloseSign">
              Not, Thanks
            </button>
          </div>
        </div>
      </div>
      <p className="rodape_lg"> &copy; Andromeda Labs 2020</p>
    </div>
  );
}
