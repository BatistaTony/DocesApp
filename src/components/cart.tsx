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
}

class Cart extends Component<Props, {}> {
  state: stateType = {
    prods: [],
    deleteOne: "",
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

  notDelete = () => {
    $(".overlayDelete").removeClass("showDetails");
    this.setState({ deleteOne: {} });
  };

  ShowLocationDiv = () => {
    $(".overlayConfirm").fadeIn();
    $(".confirDiv").addClass("showConfirDiv");
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

  orderCart = async (position: any) => {
    const orderData = {
      user: this.props.state.user,
      prods: this.state.prods,
      location: {
        coords: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
      },
      timestamp: Date.now(),
    };

    const firestore = firebase.firestore();

    firestore.collection("order").add({
      orderData,
    }).then(res => {
      console.log(res)
      this.hideLocationDiv()
    });

    console.log(orderData);
  };

  takeLocation = async () => {
    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition(this.orderCart);
    }
  };

  render() {
    return (
      <div className="cart">
        <Navbar title={"Cart"} />

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

        <div className="overlayConfirm">
          <div className="confirDiv">
            <div className="confirmDelivery">
              <button className="btnDelete_prod" onClick={this.hideLocationDiv}>
                <img src="images/icons8_delete_30px_2.png" alt="" />
              </button>
              <img src="images/ImageLoc.png" alt="" className="img_loc" />
              <h1 className="titl_loc">
                Para fazer a encomenda precisamos pegar a localizacao
              </h1>
              <button className="yes_take_lo" onClick={this.takeLocation}>
                Permitir
              </button>
            </div>
          </div>
        </div>

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
