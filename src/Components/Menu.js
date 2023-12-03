// components/MenuBar.js

import React, { useState, Component } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

export default class Menubar extends Component {
  state = { activeItem: "account" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu>
        <Menu.Item
          name="account"
          active={activeItem === "account"}
          onClick={this.handleItemClick}
        >
          <Link to="/"></Link>
        </Menu.Item>

        <Menu.Item>
          <Link to="/Expense">Expense</Link>
        </Menu.Item>
        {/* <Menu.Item>
          <Link to="/contact">Contact</Link>
        </Menu.Item> */}
      </Menu>
    );
  }
}
