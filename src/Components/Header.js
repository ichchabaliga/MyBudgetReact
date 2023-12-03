// src/Header.js

import React from "react";
import {
  Header as SemanticHeader,
  Icon,
  Button,
  Segment,
} from "semantic-ui-react";

const PageHeader = ({ isLoggedIn, username }) => {
  return (
    <SemanticHeader as="h2" block textAlign="center" style={styles.header}>
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
  closeButton: {
    cursor: "pointer",
    fontSize: "1.5em",
    color: "white",
  },
};

export default PageHeader;
