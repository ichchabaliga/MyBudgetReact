// src/App.js

import React, { useState, useEffect } from "react";
import { Button, Header, Form, Input, List, Segment } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import Homepage from "./Components/Homepage";
import LogInPage from "./Components/LoginPage";
const url = "http://127.0.0.1:5000";
function App() {
  const [budget, setBudget] = useState({});
  const [newExpense, setNewExpense] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [criterion, setCriterion] = useState("");
  const [amount, setAmount] = useState("");
  const [jwtToken, setJwtToken] = useState("");

  // useEffect(() => {
  //   const token = localStorage.getItem("jwtToken");
  //   if (token) {
  //     setJwtToken(token);
  //     setIsLoggedIn(true);
  //     fetch("http://12.0.0.1:5000/api/budget", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((data) => setBudget(data.budget))
  //       .catch((error) => console.error("Error checking login status:", error));
  //   }
  // }, []);

  // const handleSignup = () => {
  //   fetch('http://localhost:5000/api/signup', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ username, password }),
  //   })
  //     .then(response => response.json())
  //     .then(data => console.log(data))
  //     .catch(error => console.error('Error signing up:', error));
  // };

  // const handleLogout = () => {
  //   fetch("http://localhost:5000/api/logout", {
  //     method: "GET",
  //     credentials: "include",
  //   })
  //     .then((response) => {
  //       if (response.status === 200) {
  //         setIsLoggedIn(false);
  //       }
  //       return response.json();
  //     })
  //     .then((data) => console.log(data))
  //     .catch((error) => console.error("Error logging out:", error));
  // };

  // const handleLogout = () => {
  //   localStorage.removeItem("jwtToken");
  //   setJwtToken("");
  //   setIsLoggedIn(false);
  // };

  // const handleSetBudget = () => {
  //   fetch('http://localhost:5000/api/budget', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     credentials: 'include',
  //     body: JSON.stringify({ [criterion]: amount }),
  //   })
  //     .then(response => response.json())
  //     .then(data => console.log(data))
  //     .catch(error => console.error('Error setting budget:', error));
  // };

  // const handleAddExpense = () => {
  //   fetch('http://localhost:5000/api/budget', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     credentials: 'include',
  //     body: JSON.stringify({ [criterion]: amount }),
  //   })
  //     .then(response => response.json())
  //     .then(data => console.log(data))
  //     .catch(error => console.error('Error setting budget:', error));
  // };

  // const handleGoogleLogin = (googleUser) => {
  //   // (unchanged)
  // };

  // useEffect(() => {
  //   window.gapi.load('auth2', () => {
  //     window.gapi.auth2.init({
  //       client_id: 'your_google_client_id',
  //     });
  //   });
  // }, []);

  const handleLogin = (isLoggedIn, username) => {
    setIsLoggedIn(isLoggedIn);
    setUsername(username);
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <Homepage isLoggedIn={isLoggedIn} username={username} />
      ) : (
        // <LogInPage handleLogin={handleLogin} />
        <Homepage isLoggedIn={isLoggedIn} username={username} />
      )}
    </div>
  );
}
const styles = {};
export default App;
