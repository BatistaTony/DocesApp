import React from "react";
import "./styles/home.scss";
import "./styles/listofcake.scss";

import { useDispatch } from "react-redux";
import { setMenu } from "./store/actions/menu";
import { setCake } from "./store/actions/cake";
import ReactWOW from "react-wow";
import "animate.css";
import $ from "jquery";
import { ItemType } from "./types";

interface Props {
  item: ItemType;
}

const ItemCake: React.FC<Props> = ({ item }) => {
  const { img, name, price, isLoved, lovers, type, key } = item;

  const bgItem = {
    backgroundImage: `url(${img})`,
  };

  const dispatch = useDispatch();

  const openCake = () => {
    dispatch(setCake(item));
    dispatch(setMenu({ number: 3, status: "go", OutOf: 0 }));
  };

  const loveCake = (cake_id: string) => {
    $(".cake_" + cake_id).toggleClass("cakeLoved");

    // send the #item to #lovedCakes list of user
  };

  const isLovedCake = (key: string) => {
    
    //search on collection if the key of cake is there
    // to return true
    //if not return false
    
    if (key) {
      $(".cake_" + key).addClass("cakeLoved");
    } else {
      return false;
    }   
  };

  return (
    <ReactWOW animation="fadeIn" duration="1s" delay="0.1s">
      <div className="item_cake">
        <div className="hd_item">
          <h1 className="price_item">${price}</h1>
          <img src="images/ice.png" alt="" />
        </div>

        <div className="img_cake" style={bgItem} onClick={openCake}></div>

        <button className="btnLove" onClick={() => loveCake(key)}>
          <h1 className={"heart cake_" + key}>❤</h1>
        </button>

        <div className="details_cake">
          <h1 className="name_cake">{name}</h1>
          <p className="type_cake">{type}</p>
          <p className="lovers_cake">
            <img src="images/icons8_love_50px.png" alt="Love" />
            {lovers}
          </p>
        </div>
      </div>
    </ReactWOW>
  );
};

export default ItemCake;
