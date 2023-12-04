// src/Header.js

import React from "react";
import {
  Header as SemanticHeader,
  Icon,
  Button,
  Segment,
  Container,
} from "semantic-ui-react";

const PageHeader = ({ isLoggedIn, username }) => {
  return (
    <Container fluid>
      <SemanticHeader as="h2" style={styles.header}>
        {isLoggedIn ? (
          <div>
            <Icon name="user circle" />
            <p>`Hello, ${username}!` </p>
          </div>
        ) : (
          <div>
            <Icon name="dollar" />
            <p> My Personal Budget</p>
          </div>
        )}

        <div></div>
      </SemanticHeader>
    </Container>
  );
};
const styles = {
  header: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "purple",
    color: "white",
  },
  title: {
    flex: 1,
    color: "white",
  },
};

export default PageHeader;
