import React, { useEffect } from "react";
import {
  Container,
  Header,
  Segment,
  Menu,
  Icon,
  Grid,
} from "semantic-ui-react";
import PageHeader from "./Header";
import Footer from "./Footer";
import axios from "axios";

import Menubar from "./Menu";
import ChartComponent from "./ChartComponent";
const Dashboard = () => {
  //   useEffect(() => {
  //     const res = axios.get("http://localhost:5000/api/budget").then((res) => {
  //       console.log(res.data);
  //       const chartData1 = res.data.chartData1;
  //       const chartData2 = res.data.chartData2;
  //       const chartData3 = res.data.chartData3;
  //       const chartData4 = res.data.chartData4;
  //       const chartData5 = res.data.chartData5;
  //     });
  //   }, []);
  const chartData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Budeget",
        data: [65, 59, 80, 81, 56],
        backgroundColor: [
          "#050A30",
          "#000C66",
          "#0000FF",
          "#7EC8E3",
          "#0E86D4",
          "#055C9D",
        ],
      },
    ],
  };
  const chartData2 = {
    data: {
      labels: ["January", "February", "March", "April", "May"],
      datasets: [
        {
          label: "Budget",
          data: [65, 59, 80, 81, 56],
          backgroundColor: "#7EC8E3",
        },
        { label: "Expense", data: [6, 9, 8, 8, 5], backgroundColor: "#055C9D" },
      ],
    },
    option: {
      plugins: {
        title: {
          display: true,
          text: "Chart.js Bar Chart - Stacked",
        },
      },
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    },
  };
  return (
    <>
      <Container style={styles.container}>
        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column>
              <Segment raised>
                <Header as="h3" textAlign="center">
                  <Icon name="dollar" />
                  <Header.Content>Monthly Expense</Header.Content>
                </Header>
                <ChartComponent chartData={chartData} type="line" />
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment raised>
                <Header as="h3" textAlign="center">
                  <Icon name="dollar" />
                  <Header.Content>Expense Vs Budget</Header.Content>
                </Header>
                <ChartComponent
                  chartData={chartData2.data}
                  type="bar"
                  options={chartData2.option}
                />
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment raised>
                <Header as="h3" textAlign="center">
                  <Icon name="dollar" />
                  <Header.Content> Total Budget</Header.Content>
                </Header>
                <ChartComponent chartData={chartData} type="pie" />
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Segment raised>
                <Header as="h3" textAlign="center">
                  <Icon name="dollar" />
                  <Header.Content>Category-wise Expense</Header.Content>
                </Header>
                <ChartComponent chartData={chartData} type="pie" />
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment raised>
                <Header as="h3" textAlign="center">
                  <Icon name="dollar" />
                  <Header.Content>Expense</Header.Content>
                </Header>
                <ChartComponent chartData={chartData} type="bar" />
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment raised>
                <Header as="h3" textAlign="center">
                  <Icon name="dollar" />
                  <Header.Content>Balance</Header.Content>
                </Header>
                <ChartComponent chartData={chartData} type="bar" />
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Footer />
      </Container>
    </>
  );
};
const styles = {
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    color: "Pink",
    padding: "20px",
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
export default Dashboard;
