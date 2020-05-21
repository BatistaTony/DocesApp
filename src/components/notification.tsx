import React from "react";
import "./styles/notification.scss";
import Navbar from "./navbar";

function Notification() {
  return (
    <div className="notification">
      <Navbar title={"Notifications"} />

      <ul className="list_not">
        {[12, 3, 4, 5, 64, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4].map((i, key) => (
          <li className="not_" key={key}>
            <h1 className="title_not">Top Doces</h1>
            <p className="time_not">15 min ago</p>
            <p className="active_not"></p>
            <p className="texto_not">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
              sapiente quos vitae aliquid distinctio error porro expedita nisi
              pariatur velit mollitia sit at, libero doloribus officia ea sed
              iure blanditiis.
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notification;
