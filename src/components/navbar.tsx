import React, { useState } from "react";
import "./styles/navbar.scss";
import StoriesDoces from "./storiesCake";
import { setMenu } from "./store/actions/menu";
import { search } from "./store/actions/search"; //@ts igonre
import { useSelector, useDispatch } from "react-redux";
import $ from "jquery";
import { ItemType } from "./types";

interface Props {
  title?: string;
}

export default function Navbar({ title }: Props) {

  const searchValue = useSelector((state: any) => state.Search.name);

  const menu = useSelector((state: any) => state.Menu);
  const cart = useSelector((state: any) => state.cart);
  const cake = useSelector((state: any) => state.cake);
  const [notifications, setNotifi] = useState(1)

  const dispatch = useDispatch();

  const handleSearch = (e: any) => {
    e.preventDefault();

    const data = {
      name: e.target.value,
    };

    dispatch(search(data));
  };

  const goTo = (to: number, status: string, OutOf: number) => {
    dispatch(setMenu({ number: to, status: status, OutOf }));
  };

 

  const loveCake = (cake_id: string) => {
    $(".cake_" + cake_id).toggleClass("cakeLoved");
  };

 

  const calTotalCart = () => {
    var total: number = 0;
    var totalN: number = 0;

    cart.prods.map((item: ItemType) => {
      if (item.quantity) {
        total += item.price * item.quantity;
        totalN += item.quantity;
      }
    });

    return { total, totalN };
  };

  return (
    <div className={menu.number ? "navbar NavbarBack" : "navbar"}>
      <div className="menuNavbar">
        {menu.number === 0 ? (
          <img src="images/Doces.png" alt="" className="logo" />
        ) : null}

        {menu.number !== 0 ? (
          <button
            className="btnBack"
            onClick={() =>
              goTo(
                menu.number === 3 && menu.OutOf === 2 ? 2 : 0,
                "back",
                menu.number
              )
            }
          >
            <img src="images/icons8_back_24px_1.png" alt="" />
          </button>
        ) : null}

        {menu.number !== 0 ? <h1 className="title_nav">{title}</h1> : null}

        {menu.number === 3 ? (
          <button className="btnLove btnLoveAlone" onClick={() => loveCake(cake.key)}>
            <h1 className={"heart cake_" + cake.key}>❤</h1>
          </button>
        ) : (
          <div className="op_navb">
            <ul className="menu_nv">
              <li onClick={() => goTo(1, "go", 0)}>
                <img src="images/icons8_notification_24px.png" alt="" />{" "}
                  <p className="not_n">{notifications}</p>{" "}
              </li>
              
            </ul>
          </div>
        )}
      </div>

      {menu.number === 0 ? (
        <div className="searchDiv">
          <input
            type="text"
            onChange={handleSearch}
            placeholder="Search for name or type"
            className="iptSearch"
            value={searchValue}
          />
        </div>
      ) : null}

      {menu.number === 0 ? <StoriesDoces /> : null}

      {menu.number === 2 ? (
        <div className="cartInf">
          <div className="inf_cr">
            <h1 className="total_price">${calTotalCart().total}</h1>
            <p className="pros_t">{calTotalCart().totalN}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
