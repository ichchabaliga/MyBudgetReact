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
          name="Dashboard"
          active={activeItem === "Dashboard"}
          onClick={this.handleItemClick}
        >
          <Link to="/">Dashboard</Link>
        </Menu.Item>

        <Menu.Item
          name="Expense"
          active={activeItem === "Expense"}
          onClick={this.handleItemClick}
        >
          <Link to="/Expense">Add Expense</Link>
        </Menu.Item>
        <Menu.Item
          name="Budget"
          active={activeItem === "Budget"}
          onClick={this.handleItemClick}
        >
          <Link to="/Budget">Add Budget</Link>
        </Menu.Item>
      </Menu>
    );
  }
}
