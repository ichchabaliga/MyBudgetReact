// CreateBudgetComponent.js
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import React, { useState, useEffect } from "react";
import axios from "./middleware";
import {
  Button,
  Form,
  Input,
  Label,
  Table,
  Header,
  Grid,
  GridColumn,
  Container,
  Segment,
} from "semantic-ui-react";

const Budget = () => {
  const [budgets, setBudgets] = useState([]);
  const [criterion, setcriterion] = useState("");
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState();
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
  function mapToKeyValueArray(budgetData) {
    return budgetData.map((item, index) => ({
      key: index + 1,
      text: item,
      value: index + 1,
    }));
  }
  // Usage example:
  // styles.container, styles.form, styles.list, etc.
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month_dropdown = mapToKeyValueArray(months);

  const handleCreateBudget = async () => {
    // Validate input
    if (!criterion || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid budget category and amount.");
      return;
    }

    try {
      // Make a POST request to add the expense
      await axios
        .post(
          "http://127.0.0.1:5000/api/budget",
          [
            {
              criterion: criterion,
              amount: amount,
              month: month,
            },
          ],
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) showToast("Budgets set successfully!");
          const newBudget = {
            criterion: criterion,
            amount: parseFloat(amount),
            month: month,
          };
          setBudgets([...budgets, newBudget]);

          // Clear form fields
          setcriterion("");
          setAmount("");
          setMonth("");
        });

      // Update budgets array with the new budget
    } catch (error) {
      // Handle errors, e.g., show an error message to the user
      console.error("Error adding expense:", error.message);
    }
  };

  const calculateTotal = () => {
    return budgets
      .reduce((total, budget) => total + budget.amount, 0)
      .toFixed(2);
  };

  const showToast = (info) => {
    toast.info(info);

    // toast.drain();
  };
  useEffect(() => {
    // Define the API endpoint from which you want to fetch data
    const apiUrl = "http://127.0.0.1:5000/api/budget";

    // Make the API request
    axios
      .get("/budget", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        // Extract the data from the response
        const budget = response.data.budget;
        // Update the state with the fetched data
        console.log(budget);
        setBudgets(budget);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
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
            <h2>Create Budget</h2>
            <Form>
              <Form.Select
                label="Month"
                options={month_dropdown}
                placeholder="January"
                onChange={(e, { value }) => setMonth(value)}
              />
              <Label htmlFor="criterion">Budget Category:</Label>
              <Input
                type="text"
                id="criterion"
                placeholder="eg: Rent"
                value={criterion}
                onChange={(e) => setcriterion(e.target.value)}
                style={styles.inputStyle}
              />
              <br></br>
              <Label htmlFor="amount">Amount:</Label>
              <Input
                type="number"
                id="amount"
                placeholder="Enter amount in $"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={styles.inputStyle}
              />
              <br />
              <Button
                type="button"
                onClick={handleCreateBudget}
                style={styles.buttonStyle}
              >
                Add to Budget
              </Button>
            </Form>
          </div>
        </GridColumn>
        <GridColumn>
          <div style={styles.listStyle}>
            <Header as="h3">Budget List</Header>
            <Table style={styles.tableStyle} celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell style={styles.thStyle}>
                    Category
                  </Table.HeaderCell>
                  <Table.HeaderCell style={styles.thStyle}>
                    Amount
                  </Table.HeaderCell>
                  <Table.HeaderCell style={styles.thStyle}>
                    Month
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {budgets.map((budget) => (
                  <Table.Row key={budget.id}>
                    <Table.Cell style={styles.tdStyle}>
                      {budget.criterion}
                    </Table.Cell>
                    <Table.Cell style={styles.tdStyle}>
                      {budget.amount.toFixed(2)}
                    </Table.Cell>
                    <Table.Cell style={styles.tdStyle}>
                      {months[budget.month - 1]}
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

export default Budget;
