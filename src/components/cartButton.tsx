import React from "react";
import './styles/home.scss'

import { setMenu } from "./store/actions/menu";

import { useDispatch } from "react-redux";


export default function ButtonCart() {

  const dispatch = useDispatch();

  const goToCart = () => {
    dispatch(setMenu({
      number: 2,
      status: 'go',
      OutOf: 0
    }))
  }

  return (
    <button className="btn_cart" onClick={goToCart}>
      <img src="images/icons8_basket_25px.png" alt="" />
    </button>
  );
}
