import React, { useState } from "react";
import "./styles/cake.scss";
import "./styles/cart.scss";
import Navbar from "./navbar";
import $ from "jquery";
import { addToCart } from "./store/actions/cart";
import { ItemType, userType } from "./types";
import { useSelector, useDispatch } from "react-redux";
import firebase from "./../firebase";
import UserOrder from "./userOrder";

export default function Cake() {
  const item: ItemType = useSelector((state: any) => state.cake);
  const user = useSelector((state: any) => state.user);
  const cake = useSelector((state: any) => state.cake);

  const dispatch = useDispatch();

  const [actionDone, setActionDone] = useState("none");

  const { img, name, price, isLoved, lovers, type } = item;

  const [quantity, setQuant] = useState<number>(1);
  const [forWhat, setForW] = useState("none");

  const increaseQuantity = () => {
    if (quantity < 25) {
      setQuant(quantity + 1);
    } else {
      setQuant(25);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuant(quantity - 1);
    } else {
      setQuant(1);
    }
  };

  const handleChangeQuantity = (e: any) => {
    e.preventDefault();

    if (e.target.value < 25) {
      setQuant(e.target.value);
    } else {
      setQuant(25);
    }
    if (e.target.value > 1) {
      setQuant(e.target.value);
    } else {
      setQuant(1);
    }
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
        showSucessOrFail("Ordered");
      })
      .catch((err) => showSucessOrFail("Failed"));
  };

  const showOrderDiv = (forWhat: string) => {
    $(".orderProdNumber").addClass("orderDivShowed");
    setForW(forWhat);
  };

  const closeOrderDiv = () => {
    $(".orderProdNumber").removeClass("orderDivShowed");
    setQuant(1);
  };

  const showSucessOrFail = async (text: string) => {
    setActionDone(text);
    await $(".OverlaySucess").fadeIn(500);

    setTimeout(() => {
      $(".OverlaySucess").fadeOut(400);
    }, 500);
  };

  const addTocart = async () => {
    setActionDone("Added");

    await dispatch(addToCart({ ...item, quantity }));

    await $(".orderProdNumber").removeClass("orderDivShowed");

    await $(".OverlaySucess").fadeIn(500);

    setTimeout(() => {
      $(".OverlaySucess").fadeOut(400);
    }, 500);
  };

  const addFavorites = () => {};

  const orderOrAddToCart = () => {
    if (forWhat === "Order Now") {
      if (user.phonenumber.length > 0) {
        orderCake()
      } else {
        ShowLocationDiv();
      }
      $(".orderProdNumber").removeClass("orderDivShowed");
    } else if (forWhat === "Add to cart") {
      addTocart();
    }
  };

  const ShowLocationDiv = () => {
    $(".overlayConfirm").fadeIn();
    $(".confirDiv").addClass("showConfirDiv");
  };

  return (
    <div className="cake">
      <Navbar title={name} />

      <div className="OverlaySucess">
        <div className="div_1_">
          <div className="textD">
            <img src="images/icons8_checkmark_40px.png" alt="" />
            {actionDone}
          </div>
        </div>
      </div>

      <UserOrder orderWhat={"cake"} quantity={quantity} />

      <div className="cake_info">
        <div className="img_div">
          <div
            className="img_cake"
            style={{ backgroundImage: `url(${img})` }}
          ></div>
        </div>

        <div className="details_cake">
          <h1 className="price_cake">$ {price}</h1>{" "}
          <p className="type_cake">{type}</p>{" "}
          <h3 className="weight_cake">200 g</h3>
          <p className="lovers_cake">
            <img src="images/icons8_love_50px.png" alt="Love" />
            {lovers}
          </p>
        </div>
      </div>

      <div className="btnOrder">
        <button
          onClick={() => showOrderDiv("Order Now")}
          className="btnOrderNow btnCake"
        >
          Order Now
        </button>
        <button
          onClick={() => showOrderDiv("Add to cart")}
          className="btnAddCart btnCake"
        >
          Add To Cart
        </button>
      </div>

      <div className="orderProdNumber">
        <div className="shapeDiv">
          <h1 className="totalPrice">$ {price * quantity}</h1>
          <div className="addQ">
            <button onClick={decreaseQuantity} className="btnAdd">
              <img src="images/icons8_minus_24px.png" alt="" />
            </button>
            <input
              type="number"
              onChange={handleChangeQuantity}
              className="quantCake"
              value={quantity}
              max={25}
              min={1}
            />
            <button onClick={increaseQuantity} className="btnAdd">
              <img src="images/icons8_plus_math_24px.png" alt="" />
            </button>
          </div>
          <button onClick={closeOrderDiv} className="btnClose">
            <img src="images/icons8_delete_30px_2.png" alt="" />
          </button>
          <button onClick={orderOrAddToCart} className="btnConfir">
            {forWhat}
          </button>
        </div>
      </div>
    </div>
  );
}
