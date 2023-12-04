// src/Homepage.js

import React from "react";
import {
  Container,
  Header,
  Segment,
  Menu,
  Icon,
  Grid,
} from "semantic-ui-react";
import PageHeader from "./Header";
import Footer from "./Footer";
import MenuExampleVerticalDropdown from "./Menu";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Expense from "./Expense";
import Budget from "./Budget";
import Menubar from "./Menu";
import Dashboard from "./Dashboard";

function Homepage({ isLoggedIN, username }) {
  return (
    <Router>
      <Container style={styles.container}>
        <PageHeader isLoggedIn={isLoggedIN} username={username} />
        <Menubar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Expense" element={<Expense />} />
          <Route path="/Budget" element={<Budget />} />
          {/* <Route path="/contact" component={Contact} /> */}
        </Routes>
      </Container>
    </Router>
  );
}
const styles = {
  container: {
    width: "100%",

    backgroundColor: "#f5f5f5",
    color: "Pink",
  },
  title: {
    flex: 1,
    color: "white",
  },
  closeButton: {
    cursor: "pointer",
    fontSize: "1.5em",
    color: "white",
  },
};
export default Homepage;
