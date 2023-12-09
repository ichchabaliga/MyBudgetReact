// src/App.js
import { confirmAlert } from "react-confirm-alert";

import React, { useState, useEffect } from "react";
import { Button, Header, Modal, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import Homepage from "./Components/Homepage";
import LogInPage from "./Components/LoginPage";
import { useJwt } from "react-jwt";
import axios from "./Components/middleware";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jwtToken, setJwtToken] = useState("");

  const [user, setUser] = useState({});
  const [isUserActive, setIsUserActive] = useState(true);
  const [userResponded, setUserResponded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (jwtToken) {
          console.log(jwtToken);
          console.log(isLoggedIn);
          setIsLoggedIn(true);
          setUser(JSON.parse(localStorage.getItem("user")));
          console.log(user);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    fetchData();
  }, [localStorage.getItem("token")]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setJwtToken("");
    setIsLoggedIn(false);
  };

  const handleLogin = () => {
    console.log("handleLogin");
    const token = localStorage.getItem("token");

    if (token) {
      const user = localStorage.getItem("user");
      console.log(user.username);
      setJwtToken(token);
      setUser(user);
    }
  };
  // };

  return (
    <div className="App">
      {isLoggedIn ? (
        <>
          {console.log(user.username)}
          <Homepage
            handleLogout={handleLogout}
            isLoggedIN={isLoggedIn}
            username={user.username}
          />
        </>
      ) : (
        <LogInPage handleLogin={handleLogin} />
        // <Homepage isLoggedIn={isLoggedIn} username={username} />
      )}
    </div>
  );
}
const styles = {};
export default App;
