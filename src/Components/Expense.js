// CreateExpenseComponent.js
import "react-toastify/dist/ReactToastify.css";

import React, { useState, useEffect } from "react";
import axios from "./middleware";
import {
  Button,
  Form,
  Input,
  Label,
  Select,
  Table,
  Header,
  Grid,
  GridColumn,
  Container,
  Segment,
} from "semantic-ui-react";
import { toast, ToastContainer } from "react-toastify";

const Expense = () => {
  const [Expenses, setExpenses] = useState([]);
  const [criterion, setcriterion] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState([]);
  const styles = {
    container: {
      display: "flex",
      justifyContent: "space-around",
      padding: "20px",
    },
    form: {
      width: "40%",
      marginRight: "20px",
    },
    list: {
      width: "40%",
    },
    input: {
      width: "100%",
      padding: "10px",
      margin: "8px 0",
      boxSizing: "border-box",
    },
    button: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#4CAF50",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
    },
    th: {
      backgroundColor: "#4CAF50",
      color: "white",
      padding: "12px 15px",
      textAlign: "left",
    },
    td: {
      border: "1px solid #ddd",
      padding: "8px 15px",
    },
  };

  const showToast = (info) => {
    toast.info(info);

    // toast.drain();
  };
  // Usage example:
  // styles.container, styles.form, styles.list, etc.

  const handleCreateExpense = async () => {
    // Validate input
    if (!criterion || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid Expense category and amount.");
      return;
    }

    try {
      // Make a POST request to add the expense
      axios
        .post("http://127.0.0.1:5000/api/expense", [
          {
            budget_id: criterion,
            amount: amount,
            description: description,
          },
        ])
        .then((response) => {
          if (response.status === 200) showToast();
          const newExpense = {
            category: criterion,
            amount: parseFloat(amount),
            description: description,
          };
          setExpenses([...Expenses, newExpense]);

          // Clear form fields
          setcriterion("");
          setAmount("");
        });

      // Update Expenses array with the new Expense
    } catch (error) {
      // Handle errors, e.g., show an error message to the user
      console.error("Error adding expense:", error.message);
    }
  };

  const calculateTotal = () => {
    return Expenses.reduce(
      (total, Expense) => total + Expense.amount,
      0
    ).toFixed(2);
  };

  function mapToKeyValueArray(budgetData) {
    return budgetData.map(({ budget_id, criterion, amount }) => ({
      key: budget_id.toString(),
      text: criterion.toString(),
      value: budget_id.toString(),
    }));
  }

  useEffect(() => {
    const apiUrl1 = "http://127.0.0.1:5000/api/expense";

    // Make the API request
    axios
      .get("/expense")
      .then((response) => {
        // Extract the data from the response
        const Expense = response.data.expenses;
        // Update the state with the fetched data
        console.log(Expense);
        setExpenses(Expense);
      })
      .then(() => {
        const apiUrl = "http://127.0.0.1:5000/api/budget";
        axios
          .get(apiUrl)
          .then((response) => {
            // Extract the data from the response
            const budget = response.data.budget;
            // Update the state with the fetched data

            const budget_dropdown = mapToKeyValueArray(budget);
            console.log(budget_dropdown);

            setBudget(budget_dropdown);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    // Define the API endpoint from which you want to fetch data
  }, []);

  // useEffect(() => {
  //   // Define the API endpoint from which you want to fetch data

  // }, []);
  return (
    <Segment raised>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Grid columns={2}>
        <GridColumn>
          <div style={styles.formStyle}>
            <h2>Create Expense</h2>
            <Form>
              {/* <Form.Group unstackable widths={2}> */}
              <Form.Field
                control={Input}
                label="Description"
                placeholder="For eg: Rent"
                onChange={(e) => setDescription(e.target.value)}
              />
              <br />
              <Form.Select
                label="Category"
                options={budget}
                placeholder="Gender"
                onChange={(e, { value }) => setcriterion(value)}
              />
              <br />

              <Form.Field
                control={Input}
                label="Amount"
                placeholder="Enter amount in $"
                onChange={(e) => setAmount(e.target.value)}
              />
              <br />
              {/* </Form.Group> */}
              <Button
                type="button"
                onClick={handleCreateExpense}
                style={styles.buttonStyle}
              >
                Add to Expense
              </Button>
            </Form>
          </div>
        </GridColumn>
        <GridColumn>
          <div style={styles.listStyle}>
            <Header as="h3">Expense List</Header>
            <Table style={styles.tableStyle} celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell style={styles.thStyle}>
                    Description
                  </Table.HeaderCell>
                  <Table.HeaderCell style={styles.thStyle}>
                    Amount
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {Expenses.map((Expense) => (
                  <Table.Row key={Expense.id}>
                    <Table.Cell style={styles.tdStyle}>
                      {Expense.description}
                    </Table.Cell>
                    <Table.Cell style={styles.tdStyle}>
                      {Expense.amount.toFixed(2)}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
            <div>
              <Header as="h3">Total: ${calculateTotal()}</Header>
            </div>
          </div>
        </GridColumn>
      </Grid>
    </Segment>
  );
};

export default Expense;
