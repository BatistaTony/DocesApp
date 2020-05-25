import React, { Component } from "react";
import Navbar from "./navbar";
import "./styles/cart.scss";
import $ from "jquery";
import { connect } from "react-redux";
import { cartType, ItemType, userType } from "./types";
import { setMenu } from "./store/actions/menu";
import { setCake } from "./store/actions/cake";
import { deleteOfCart } from "./store/actions/cart";
import firebase from "./../firebase";
import UserOrder from "./userOrder";

interface Props {
  dispatch: any;
  state: {
    cart: cartType;
    user: userType;
  };
}

interface stateType {
  prods: Array<ItemType>;
  deleteOne: string;
  error: string
}

class Cart extends Component<Props, {}> {
  state: stateType = {
    prods: [],
    deleteOne: "",
    error: ""
  };

  componentDidMount() {
    this.setState({ prods: this.props.state.cart.prods });
  }

  showDelete = (prod: string) => {
    $(".overlayDelete").addClass("showDetails");
    this.setState({ deleteOne: prod });
  };

  delete = () => {
    $(".overlayDelete").removeClass("showDetails");
    this.props.dispatch(deleteOfCart(this.state.deleteOne));

    this.setState({ prods: this.props.state.cart.prods });
  };

  orderCart = async () => {
    const orderData = {
      user: this.props.state.user,
      cart: this.props.state.cart,
      timestamp: Date.now(),
    };

    const firestore = firebase.firestore();
    firestore
      .collection("order")
      .add({
        ...orderData,
      })
      .then((res) => {
        this.showSucessOrFail("Ordered")
      }).catch(err => this.showSucessOrFail("Failed") );
  };

  showSucessOrFail = async (text: string) => {
    this.setState({error: text});
    await $(".OverlaySucess").fadeIn(500);

    setTimeout(() => {
      $(".OverlaySucess").fadeOut(400);
    }, 500);
  };

  notDelete = () => {
    $(".overlayDelete").removeClass("showDetails");
    this.setState({ deleteOne: {} });
  };

  ShowLocationDiv = () => {
    if (this.props.state.user.phonenumber.length > 0) {
      this.orderCart()
    } else {
      $(".overlayConfirm").fadeIn();
      $(".confirDiv").addClass("showConfirDiv");
    }
  };

  hideLocationDiv = () => {
    $(".confirDiv").removeClass("showConfirDiv");
    setTimeout(() => {
      $(".overlayConfirm").fadeOut();
    }, 400);
  };

  goToCake = async (item: ItemType) => {
    await this.props.dispatch(setCake(item));
    await this.props.dispatch(setMenu({ number: 3, status: "go", OutOf: 2 }));
  };

  render() {
    return (
      <div className="cart">
        <Navbar title={"Cart"} />

        <div className="OverlaySucess">
          <div className="div_1_">
            <div className="textD">
              <img src="images/icons8_checkmark_40px.png" alt="" />
              {this.state.error}
            </div>
          </div>
        </div>

        <div className="overlayDelete">
          <div className="divDelet">
            <button className="btnDelete_prod" onClick={this.notDelete}>
              <img src="images/icons8_delete_30px_2.png" alt="" />
            </button>{" "}
            <h1 className="txt_del">Pretende deletar ?</h1>
            <button className="btnDelete_yes" onClick={this.delete}>
              Deletar
            </button>
          </div>
        </div>

        <UserOrder orderWhat={"cart"} />

        {this.state.prods.length === 0 ? (
          <div className="GotNothing">
            <img src="images/nothing.png" className="img_nth" alt="" />
            <h1 className="textNth">Oh crap, you've got nothing.</h1>
          </div>
        ) : (
          <div className="divCar_">
            <ul className="prods">
              {this.state.prods.map((p, key) => (
                <li className="prod_cart" key={key}>
                  <div
                    className="img_prod"
                    style={{ backgroundImage: `url(${p.img})` }}
                  ></div>

                  <div
                    className="prod_details"
                    onClick={() => this.goToCake(p)}
                  >
                    <h1 className="name_prod">{p.name}</h1>
                    <h5 className="price_prod">${p.price}</h5>
                    <h1 className="price_12_prod">{p.quantity}</h1>
                  </div>

                  <button
                    className="btnDelete"
                    onClick={() => this.showDelete(p.key)}
                  >
                    <img src="images/icons8_delete_30px_2.png" alt="" />
                  </button>
                </li>
              ))}
            </ul>

            <div className="btnDiv">
              <button onClick={this.ShowLocationDiv} className="btnConfirm">
                Confirm
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: object | any) => ({ state });
const mapDispatchToProps = (dispatch: any) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
