import React from "react";
import "./styles/home.scss";
import Navbar from "./navbar";
import { ListOfitens } from "./listOfItens";
import ButtonCart from "./cartButton";
import Notification from "./notification";
import Cart from "./cart";
import Cake from "./cake";
import ReactWOW from "react-wow";
import { userType, cartType } from "./types";
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
    itens: [],
    itensnew: [],
    animation: {
      delay: "0.1s",
      duration: ".3s",
    },
  };

  async componentDidMount() {
    const firestore = firebase.firestore();

    await firestore.collection("doces").onSnapshot((docs) => {
      var doces: Array<Object> = [];
      var newDoces: Array<Object> = [];
      var dataNow = new Date().getDate();
      docs.forEach((doc) => {
        if (typeof doc.data().timestamps.seconds !== "undefined") {
          var itemDate = new Date(
            doc.data().timestamps.seconds * 1000
          ).getDate();
          if (dataNow - itemDate < 6) {
            newDoces.push(doc.data());
          } else {
            doces.push(doc.data());
          }
        }
      });

      this.setState({ itens: doces });
      this.setState({ itensnew: newDoces });
    });

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
                  {this.state.itensnew.length > 0 ? (
                    <ListOfitens title={"News"} itens={this.state.itensnew} />
                  ) : null}

                  {this.state.itens.length > 0 ? (
                    <ListOfitens
                      title={"Most Populars"}
                      itens={this.state.itens}
                    />
                  ) : null}

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
