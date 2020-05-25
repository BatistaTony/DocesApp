import React from "react";
import "./styles/notification.scss";
import Navbar from "./navbar";
import firebase from "./../firebase";

interface stateType {
  notifications: [
    {
      title: string;
      text: string;
    }
  ];
}

class Notification extends React.Component {
  state: stateType = {
    notifications: [
      {
        title: "",
        text: "",
      },
    ],
  };

  componentDidMount() {
    const firestore = firebase.firestore();

    firestore.collection("notifications").onSnapshot((docs) => {
      var notif: Array<Object> = [];

      docs.forEach((doc) => {
        notif.push(doc.data());
      });

      this.setState({ notifications: notif });
    });
  }

  render() {
    return (
      <div className="notification">
        <Navbar title={"Notifications"} />

        {this.state.notifications.length > 0 ?  
        <ul className="list_not">
          {this.state.notifications.map((i, key) => (
            <li className="not_" key={key}>
              <h1 className="title_not">{i.title}</h1>
              <p className="time_not">15 min ago</p>
              <p className="active_not"></p>
              <p className="texto_not">{i.text}</p>
            </li>
          ))}
        </ul>: null}
      </div>
    );
  }
}

export default Notification;
