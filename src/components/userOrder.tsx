import React, { useState } from "react";
import "./styles/cart.scss";
import $ from "jquery";
import firebase from "./../firebase";
import { ItemType } from "./types";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "./store/actions/user";

interface cakeOrderType extends ItemType {
  quantity?: number;
}

interface Props {
  orderWhat: string;
  quantity?: number;
}

export default function UserOrder({ orderWhat, quantity }: Props) {
  const cart = useSelector((state: any) => state.cart);
  const user = useSelector((state: any) => state.user);
  const cake = useSelector((state: any) => state.cake);
  const [confirm, setConfirm] = useState<any>(0);
  const [codeVerf, setCodVer] = useState<number>(0);
  const [erroCodfi, setErroCod] = useState<string>("");

  const [actionDone, setActionDone] = useState("none");

  const [phonenumber, setNumber] = useState<string>("");
  const [errorPhone, setError] = useState("");
  const dispatch = useDispatch();

  const orderCart = async () => {
    const orderData = {
      user,
      cart,
      timestamp: Date.now(),
    };

    const firestore = firebase.firestore();
    firestore
      .collection("order")
      .add({
        ...orderData,
      })
      .then((res) => {
        setActionDone("Ordered");
        console.log("sucess");
        hideLocationDiv();
      });
  };

  const orderCake = async () => {
    const orderData = {
      user,
      cake,
      quantity,
    };

    console.log("orderData");
    const firestore = firebase.firestore();

    await firestore
      .collection("order")
      .add({ ...orderData })
      .then((res) => {
        setActionDone("Ordered");
        console.log("sucess");
      })
      .catch((err) => console.log("error"));
  };

  const getTheLocation = async (position: any) => {

    await isValidPhone();

    if (erroCodfi === "") {
    await dispatch(
      getUser({
        phonenumber,
        location: {
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        },
      })
    );


    
      if (orderWhat === "cake") {
        orderCake();
        console.log(quantity);
      } else {
        orderCart();
        console.log("cart");
      }
    }


  };

  const isValidPhone = () => {
    var auth = firebase.auth();
    var appVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container"
    );

    auth
      .signInWithPhoneNumber(phonenumber, appVerifier)
      .then((confirmationResult) => {
        $(".OverlayConfirmNumber").addClass("OverlayConfirmNumberShow");
        setConfirm(confirmationResult);
      })
      .catch((err) => {
        if (err.message === "Invalid format.") {
          setError("Phone number is invalid");
        } else {
          setError(err.message);
        }
      });
  };

  const handleCodeverification = (e: any) => {
    setCodVer(e.target.value);
    setErroCod("");
  };

  const isYourNumber = () => {
    confirm
      .confirm(codeVerf)
      .then((res: any) => {
        console.log("right");
      })
      .catch((err: any) => {
        if (err) setErroCod("Wrong code, resend and try again");
      });
  };

  const takeLocation = async () => {
    
      if (phonenumber) {
        if (navigator.geolocation) {
          await navigator.geolocation.getCurrentPosition(getTheLocation);
        }
      } else {
        setError("Phone number empty");
      }
    
  };

  const handleChange = (e: any) => {
    setNumber(e.target.value);
    setError("");
  };

  const hideLocationDiv = () => {
    $(".confirDiv").removeClass("showConfirDiv");
    setTimeout(() => {
      $(".overlayConfirm").fadeOut();
    }, 400);
  };

  return (
    <div className="overlayConfirm">
      <div className="OverlaySucess">
        <div className="div_1_">
          <div className="textD">
            <img src="images/icons8_checkmark_40px.png" alt="" />
            {actionDone}
          </div>
        </div>
      </div>

      <div className="OverlayConfirmNumber OverlaySucess">
        <div className="div_1_">
          <div className="textD">
            <button className="btnDelete_prod" onClick={hideLocationDiv}>
              <img src="images/icons8_delete_30px_2.png" alt="" />
            </button>
            <p>We send a code verification on your phone:</p>
            <h5 className="erro_code">{erroCodfi}</h5>
            <input
              type="text"
              name="number"
              placeholder="codigo de verificação do número"
              id="codigo"
              onChange={handleCodeverification}
            />
            <button className="btnConfirmN" onClick={isYourNumber}>
              Confirmar
            </button>
            <h2 onClick={isValidPhone} className="txt_resend">
              Resend the code verification
            </h2>
          </div>
        </div>
      </div>

      <div id="recaptcha-container"></div>
      <div className="confirDiv">
        <div className="confirmDelivery">
          <button className="btnDelete_prod" onClick={hideLocationDiv}>
            <img src="images/icons8_delete_30px_2.png" alt="" />
          </button>
          <img src="images/ImageLoc.png" alt="" className="img_loc" />
          <h1 className="titl_loc">
            We need to take your location and phone number.
          </h1>
          <p className="error_phone">{errorPhone}</p>
          <input
            type="text"
            name="phonenumber"
            placeholder="Phone (+xxx) xxx xxx xxx"
            id="phone"
            onChange={handleChange}
            className="phone_number"
          />
          <button className="yes_take_lo" onClick={takeLocation}>
            Allow
          </button>
        </div>
      </div>
    </div>
  );
}
