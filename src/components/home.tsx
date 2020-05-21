import React from "react";
import "./styles/home.scss";
import Navbar from "./navbar";
import { ListOfitens } from "./listOfItens";
import ButtonCart from "./cartButton";
import Notification from "./notification";
import Cart from "./cart";
import Cake from "./cake";
import ReactWOW from "react-wow";
import { ItemType, userType, cartType } from "./types";
import { createCart } from "./store/actions/cart";
import { connect } from "react-redux";
import { setMenu } from "./store/actions/menu";
import ResultSearch from "./searchResult";
import firebase from "./../firebase";

interface Props {
  dispatch: any;
  state: {
    user: userType;
    Menu: {
      status: string;
      number: number;
      OutOf: number;
    };
    cart: cartType;
    Search: {
      name: string;
    };
  };
}

class Home extends React.Component<Props, {}> {
  state = {
    itens: [
      {
        img: "/images/cake.jpg",
        name: "Ony cake",
        price: 100,
        type: "aNIVERSARY",
        isLoved: false,
        lovers: 40,
        key: "654645",
      },
      {
        img: "/images/shot-cropped-1558159069082.png",
        name: "Ony cake",
        price: 100,
        type: "aNIVERSARY",
        isLoved: false,
        lovers: 40,
        key: "654646",
      },
    ],
    itensnew: [
      {
        img: "/images/luxuryCake.jpg",
        name: "joao cake",
        price: 100,
        type: "aNIVERSARY",
        isLoved: false,
        lovers: 40,
        key: "654642",
      },
      {
        img: "/images/transferir.jpg",
        name: "JOny cake",
        price: 100,
        type: "aNIVERSARY",
        isLoved: false,
        lovers: 40,
        key: "6546g48",
      },
      {
        img: "/images/HAMURGUER.jpg",
        name: "TOny cake",
        price: 100,
        type: "aNIVERSARY",
        isLoved: false,
        lovers: 40,
        key: "6546s49",
      },
    ],
    animation: {
      delay: "0.1s",
      duration: ".3s",
    },
  };

  createCartToUser = () => {
    this.props.dispatch(createCart(this.props.state.user));
  };

  async componentDidMount() {
    if (this.props.state.cart.prods) {
      if (this.props.state.cart.prods.length > 0) {
        this.createCartToUser();
      }
    }

    const firestore = firebase.firestore();

    await firestore
      .collection("doces")
      .get()
      .then((docs) => {
        var doces: Array<Object> = [];
        docs.forEach((doc) => {
          doces.push(doc.data());
          console.log(doc.data());
        });
        this.setState({ itens: doces });
      });

    // var newsdoces: Array<object> = [];

    // await this.state.itens.map((doce, i) => {
    //   if (i <= 10) {
    //     newsdoces.push(doce);
    //   }
    // });
    // this.setState({ itensnew: newsdoces });

    // var time = [1, 2, 3, 4, 5, 6, 7, 8]
    // var minVal

    // await  time.map((x: any,i) => {
    //   var nm = time.filter((y: any, t) => {
    //      return x < y ? y : null
    //   })
    //   minVal = nm
    // })

    // console.log(minVal)

    this.props.dispatch(setMenu({ ...this.props.state.Menu, OutOf: 0 }));
  }

  render() {
    return (
      <div className="home">
        {this.props.state.Menu.number === 0 ? (
          <ReactWOW
            animation={
              this.props.state.Menu.status === "none" ? "fadeIn" : "slideInLeft"
            }
            duration={this.state.animation.duration}
            delay={this.state.animation.delay}
          >
            <div className="pag">
              <Navbar />

              {this.props.state.Search.name ? (
                <ResultSearch />
              ) : (
                <div className="content">
                  <ListOfitens title={"News"} itens={this.state.itensnew} />

                  <ListOfitens
                    title={"Most Populars"}
                    itens={this.state.itens}
                  />

                  <ButtonCart />
                </div>
              )}
            </div>
          </ReactWOW>
        ) : null}

        {this.props.state.Menu.number === 1 ? (
          <ReactWOW
            animation={"slideInRight"}
            duration={this.state.animation.duration}
            delay={this.state.animation.delay}
          >
            <div className={"pag"}>
              <Notification />
            </div>
          </ReactWOW>
        ) : null}

        {this.props.state.Menu.number === 2 ? (
          <ReactWOW
            animation={"slideInRight"}
            duration={this.state.animation.duration}
            delay={this.state.animation.delay}
          >
            <div className={"pag"}>
              <Cart />
            </div>
          </ReactWOW>
        ) : null}

        {this.props.state.Menu.number === 3 ? (
          <ReactWOW
            animation={"slideInRight"}
            duration={this.state.animation.duration}
            delay={this.state.animation.delay}
          >
            <div className={"pag"}>
              <Cake />
            </div>
          </ReactWOW>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state: object | any) => ({ state });
const mapDispatchToProps = (dispatch: any) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Home);
