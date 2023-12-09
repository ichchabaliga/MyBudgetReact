import React, { useState, useEffect } from "react";
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
import axios from "./middleware";

import Menubar from "./Menu";
import ChartComponent from "./ChartComponent";
const Dashboard = () => {
  const [chartData1, setChartData1] = useState({});
  const [chartData2, setChartData2] = useState({});
  const [chartData3, setChartData3] = useState({});
  const [chartData4, setChartData4] = useState({});
  const [chartData5, setChartData5] = useState({});
  const [Istoken, setIstoken] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [chartData6, setChartData6] = useState({});

  // const [chartData5, setChartData5] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/chartdata");
        const data = response.data;
        console.log(data);

        setChartData1(data.chardata1);
        setChartData2(data.chardata2);
        setChartData3(data.chardata3);
        setChartData4(data.chardata4);
        setChartData5(data.chardata5);
        setChartData6(data.chardata6);
        setDataLoaded(true);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchData();
  }, [localStorage.getItem("token")]);

  return (
    <>
      <Container style={styles.container}>
        {dataLoaded ? (
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Segment raised>
                  <Header as="h3" textAlign="center">
                    <Icon name="dollar" />
                    <Header.Content>Monthly Expense</Header.Content>
                  </Header>
                  <ChartComponent chartData={chartData1} type="line" />
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment raised>
                  <Header as="h3" textAlign="center">
                    <Icon name="dollar" />
                    <Header.Content>Monthly Budget</Header.Content>
                  </Header>
                  <ChartComponent chartData={chartData5} type="line" />
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Segment raised>
                  <Header as="h3" textAlign="center">
                    <Icon name="dollar" />
                    <Header.Content> Total Budget</Header.Content>
                  </Header>
                  <ChartComponent chartData={chartData3} type="pie" />
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment raised>
                  <Header as="h3" textAlign="center">
                    <Icon name="dollar" />
                    <Header.Content>Category-wise Expense</Header.Content>
                  </Header>
                  <ChartComponent chartData={chartData4} type="pie" />
                </Segment>
              </Grid.Column>
              {/* <Grid.Column>
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
              </Grid.Column> */}
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Segment raised>
                  <Header as="h3" textAlign="center">
                    <Icon name="dollar" />
                    <Header.Content>Expense Vs Budget</Header.Content>
                  </Header>
                  <ChartComponent
                    chartData={chartData2.data}
                    type="bar"
                    options={chartData2.options}
                  />
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment raised>
                  <Header as="h3" textAlign="center">
                    <Icon name="dollar" />
                    <Header.Content>Daily Expense</Header.Content>
                  </Header>
                  <ChartComponent chartData={chartData6} type="line" />
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        ) : (
          <div>
            <h1>Loading...</h1>
          </div>
        )}
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
