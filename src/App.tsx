import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from "./components/login";
import "./components/styles/main.scss";
import Home from "./components/home";
import {useSelector} from 'react-redux'
import PrivateRoute from "./components/privateRoute";

function App() {

  const user  = useSelector((state:any) => state.login.user)


  console.log(user)

  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        <PrivateRoute
          exact
          path="/doces"
          component={Home}
          authed={true}
        />
      </div>
    </Router>
  );
}

export default App;
