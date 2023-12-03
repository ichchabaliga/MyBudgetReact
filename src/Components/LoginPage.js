import React, { useState } from "react";
import { Header, Button, Divider, Segment } from "semantic-ui-react";
import Modal from "./modal";
import SignupForm from "./SignUpForm";
import { Image, Container, Grid } from "semantic-ui-react";
import PageHeader from "./Header";
import LoginForm from "./loginForm";

const LogInPage = ({ handleLogin }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleSignup = () => {
    // Add any signup logic or navigate to the signup page
    // onSignup();
  };
  return (
    <div style={styles.backgroundDiv}>
      <PageHeader />
      <Grid columns={2} textAlign="center" verticalAlign="middle">
        <Grid.Column>
          <Image
            centered
            size="Massive"
            src="https://www.pngall.com/wp-content/uploads/7/Budget-PNG-Free-Image.png"
            alt="BSDK"
          ></Image>
        </Grid.Column>
        <Grid.Column>
          <Container>
            <Segment
              inverted
              color="purple"
              textAlign="center"
              raised
              style={styles.Segment}
            >
              <Segment style={{ height: "550px" }}>
                <br />
                <Header as="h2">Login To Continue..</Header>
                <LoginForm handleLogin={handleLogin} />
                <Divider />
                <br />
                <div style={styles.signupContainer}>
                  <p>Don't have an account?</p>
                  <Button onClick={openModal} color="green">
                    Sign Up
                  </Button>
                  <Modal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    title={
                      <Header as="h2" style={styles.modalHeader}>
                        Sign-Up for an Account
                      </Header>
                    }
                    content={<SignupForm onSignup={handleSignup} />}
                  />
                </div>
              </Segment>
            </Segment>
          </Container>
        </Grid.Column>
      </Grid>
    </div>
  );
};
const styles = {
  Segment: {
    width: "500px",
    height: "600px",
    margin: "auto",
    marginTop: "50px",
    marginBottom: "10px",
    padding: "20px",
    textAlign: "center",
    backgroundColor: "purple",
    color: "white",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
  },
  backgroundDiv: {
    backgroundImage:
      'url("/Users/ichchabaliga/Documents/NBAD FInal Project/Frontend/personal-budget-app/public/Budget-planning.jpg")', // Replace with the path to your image
    backgroundSize: "cover", // Adjust to 'contain' or other values based on your preference
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    height: "300px", // Adjust the height based on your design
    // Other styles...
    color: "teal",
    backgroundcolor: "teal",
  },
};
export default LogInPage;