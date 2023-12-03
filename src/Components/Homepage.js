// src/Homepage.js

import React from "react";
import { Container, Header, Segment, Menu, Icon } from "semantic-ui-react";
import PageHeader from "./Header";
import Footer from "./Footer";
import MenuExampleVerticalDropdown from "./Menu";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Expense from "./Expense,js";

const Homepage = ({ isLoggedIN, username }) => {
  return (
    <Container>
      <PageHeader isLoggedIn={isLoggedIN} username={username} />

      <Container>
        <Menu />
        <hr />
        <Router>
          <Routes>
            <Route path="/" exact component={Homepage} />
            <Route path="/Expense" component={Expense} />
          </Routes>
        </Router>
      </Container>

      {/* Header */}
      <Segment placeholder>
        <MenuExampleVerticalDropdown />
      </Segment>
      {/* Footer */}
      <Footer />
    </Container>
  );
};

export default Homepage;
