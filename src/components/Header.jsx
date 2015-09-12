import React from "react";

import { NavLink } from "fluxible-router";

export default class Header extends React.Component {
  render() {
    return (
      <p>
        <NavLink routeName="home">Home</NavLink>
        <NavLink routeName="mypage" navParams={{ userCode: "admin" }}>管理</NavLink>
      </p>
    );
  }
}
