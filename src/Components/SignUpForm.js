import React, { useState } from "react";
import { Form, Button, Grid, Header, Segment } from "semantic-ui-react";

const SignupForm = ({ onSignup }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const handleSignup = () => {
    fetch("http://127.0.0.1:5000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, email, birthdate }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error signing up:", error));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add any validation logic here

    // Pass the signup information to the parent component
    handleSignup();
  };

  return (
    <Grid textAlign="center">
      <Grid.Column>
        <Form size="large" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Input
              fluid
              icon="mail"
              iconPosition="left"
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Input
              fluid
              icon="calendar"
              iconPosition="left"
              placeholder="Birthdate"
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            />
          </Segment>
          <Button color="teal" type="submit">
            Signup
          </Button>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default SignupForm;
