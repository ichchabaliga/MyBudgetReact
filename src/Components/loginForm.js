import React, { useState } from "react";
import {
  Header,
  Form,
  Button,
  Label,
  Input,
  Divider,
  Segment,
} from "semantic-ui-react";
import Modal from "./modal";
import SignupForm from "./SignUpForm";

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    fetch("http://127.0.0.1:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username, password }),
      mode: "cors",
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("Login successful!");
          return response.json();
        } else if (response.status === 401) {
          alert("Incorrect username or password");
        }
      })
      .then((data) => {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.user));
        console.log("token" + data.access_token);
        handleLogin();
      })
      .catch((error) => console.error("Error logging in:", error));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label color="blue">
        Username:
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Label>
      <br />
      <Label>
        Password:
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Label>

      <br />
      <br />
      <Button type="submit" color="blue">
        Login
      </Button>
    </Form>
  );
};
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  logo: {
    width: "100px", // Adjust the size as needed
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    marginTop: "10px",
  },
  signupContainer: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  signupButton: {
    marginTop: "10px",
    cursor: "pointer",
    color: "blue",
    border: "none",
    background: "none",
  },
  additionalImage: {
    width: "200px", // Adjust the size as needed
    marginTop: "20px",
  },
  modalHeader: {
    textAlign: "center",
    color: "White",
  },
};
export default LoginForm;
