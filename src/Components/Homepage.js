// src/Homepage.js
import { useState, useEffect } from "react";
import React from "react";
import {
  Container,
  Header,
  Segment,
  Menu,
  Button,
  Modal,
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

const Homepage = ({ handleLogout, isLoggedIN, username }) => {
  const [isUserActive, setIsUserActive] = useState(true);
  const [userResponded, setUserResponded] = useState(false);
  const [modalOpen, setIsModalOpen] = useState(false);
  const [logoutTimer, setLogoutTimer] = useState(null);
  const [isMouseMoving, setIsMouseMoving] = useState(false);

  useEffect(() => {
    // Attach event listeners for mousemove and keydown to track user activity
    const handleUserActivity = () => {
      // setIsModalOpen(false); // Reset modal if user is active
      clearTimeout(logoutTimer); // Reset logout timer

      // Set a new timeout for 1 minute to open the modal
      setLogoutTimer(
        setTimeout(() => {
          setIsModalOpen(true);
          setLogoutTimer(
            setTimeout(() => {
              // Auto logout after 20 seconds if user doesn't respond
              handleLogout();
              // Perform logout actions here
            }, 20000)
          );
        }, 60000)
      );
    };

    // Attach event listeners for user activity

    document.addEventListener("mousemove", handleUserActivity);
    document.addEventListener("keydown", handleUserActivity);

    return () => {
      document.removeEventListener("mousemove", handleUserActivity);
      document.removeEventListener("keydown", handleUserActivity);
      clearTimeout(logoutTimer);
    };
  }, [logoutTimer, isMouseMoving]);

  const handleTokenExpired = () => {
    console.log("handleTokenExpired");
    setIsModalOpen(false);
    handleLogout();
  };

  const handleModalYesClick = () => {
    setIsModalOpen(false);
    setIsMouseMoving(false);
    clearTimeout(logoutTimer); // Reset logout timer
    setLogoutTimer(
      setTimeout(() => {
        // Auto logout after 20 seconds if user doesn't respond
        console.log("Auto logout after 20 seconds");
        // Perform logout actions here
      }, 20000)
    );
  };

  const handleModalNoClick = () => {
    setIsMouseMoving(false);
    setIsModalOpen(false);
    clearTimeout(logoutTimer); // Reset logout timer
    console.log("User clicked No. Logging out immediately.");
    handleLogout();
    // Perform logout actions here
  };

  return (
    <Router>
      <Container style={styles.container}>
        <PageHeader
          isLoggedIn={isLoggedIN}
          username={username}
          handlelogout={handleLogout}
        />
        <Menubar />
        <Modal
          basic
          onClose={() => setIsModalOpen(false)}
          onOpen={() => setIsModalOpen(true)}
          open={modalOpen}
          size="small"
          // trigger={<Button>Basic Modal</Button>}
        >
          <Header icon>
            <Icon name="session" />
            Are you still here?
          </Header>
          <Modal.Content>
            <p> Do you want to keep your session active?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button basic color="red" inverted onClick={handleModalNoClick}>
              <Icon name="remove" /> No
            </Button>
            <Button color="green" inverted onClick={handleModalYesClick}>
              <Icon name="checkmark" /> Yes
            </Button>
          </Modal.Actions>
        </Modal>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Expense" element={<Expense />} />
          <Route path="/Budget" element={<Budget />} />
          {/* <Route path="/contact" component={Contact} /> */}
        </Routes>
        <Footer />
      </Container>
    </Router>
  );
};
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
