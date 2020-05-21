import React, { useState } from "react";
import "./styles/cake.scss";
import Navbar from "./navbar";
import $ from "jquery";
import { addToCart } from "./store/actions/cart";
import { ItemType, userType } from "./types";
import { useSelector, useDispatch } from "react-redux";
import firebase from './../firebase'

export default function Cake() {
  const item: ItemType = useSelector((state: any) => state.cake);

  const dispatch = useDispatch();

  const { username, phonenumber, address }: userType = useSelector(
    (state: any) => state.user
  );

  const [actionDone, setActionDone] = useState("none");

  const { img, name, price, isLoved, lovers, type, key } = item;

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

  const showOrderDiv = (forWhat: string) => {
    $(".orderProdNumber").addClass("orderDivShowed");
    setForW(forWhat);
  };

  const closeOrderDiv = () => {
    $(".orderProdNumber").removeClass("orderDivShowed");
    setQuant(1);
  };

  const addTocart = async () => {

    setActionDone("Added");

    await dispatch(addToCart({...item, quantity}));

    await $(".orderProdNumber").removeClass("orderDivShowed");

    await $(".OverlaySucess").fadeIn(500);

    setTimeout(() => {
      $(".OverlaySucess").fadeOut(400);
    }, 500);
  };

  const orderNow = async (position?: any) => {

    setActionDone("Ordered");

    const orderObject = {
      username,
      phonenumber,
      address,
      item: { ...item, quantity },
      location: {
        coords: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
      },
      timestamp: Date.now(),
    };

    const firestore = firebase.firestore()
    
    firestore.collection('order').add({
      orderObject
    })

    await $(".orderProdNumber").removeClass("orderDivShowed");

    await $(".OverlaySucess").fadeIn(500);

    setTimeout(() => {
      $(".OverlaySucess").fadeOut(400);
    }, 500);
  };

   const takeLocation = async () => {
     if (navigator.geolocation) {
       await navigator.geolocation.getCurrentPosition(orderNow);
     }
   };

  const orderOrAddToCart = () => {
    if (forWhat === "Order Now") {
      takeLocation();
    } else if (forWhat === "Add to cart") {
      addTocart();
    }
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

      <div className="cake_info">
        <div className="img_div">
          <div className="img_cake" style={{backgroundImage: `url(${img})`}}></div>
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
