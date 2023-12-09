// src/Header.js

import React from "react";
import {
  Header as SemanticHeader,
  Icon,
  Button,
  Segment,
  Container,
  Grid,
} from "semantic-ui-react";

const PageHeader = ({ isLoggedIn, username, handlelogout }) => {
  return (
    <Container fluid style={styles.header}>
      <SemanticHeader as="h2" style={styles.header}>
        <Grid>
          <Grid.Column width={10}>
            <Icon name="dollar" />
            <SemanticHeader.Content>My Personal Budget</SemanticHeader.Content>
          </Grid.Column>
          {isLoggedIn ? (
            <Grid.Column width={10} textAlign="right">
              <Icon name="user circle" />
              <SemanticHeader.Content>
                Hello, {username}!
              </SemanticHeader.Content>
              <Button onClick={handlelogout} color="red">
                Logout
              </Button>
            </Grid.Column>
          ) : null}
        </Grid>
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
    padding: "10px",
  },
  title: {
    flex: 1,
    color: "white",
  },
};

export default PageHeader;
