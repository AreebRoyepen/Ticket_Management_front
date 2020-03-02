import React, { Component } from "react";
import Menu from "./Menu";
import { Route } from "react-router-dom";

class Landing extends Component {
  render() {
    return <Route exact path="/" render={() => <Menu />} />;
  }
}
export default Landing;
