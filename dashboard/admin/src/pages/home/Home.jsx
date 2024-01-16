import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
//import Table from "../../components/table/Table";
import Barchart from "../../components/barchart/Barchart";
//import { Stack } from "@mui/material";
//import { PieChart } from "recharts";
import Piechart from "../../components/piechart/Piechart";
//import { Box } from "@mui/material";

const Home = () => {
  return (
    <div class="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="booking" />
          {/* <Widget type="views" />
          <Widget type="active users" /> */}
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Total income range" aspect={2 / 1} />
        </div>
        <div class="charts"> 
          <Barchart title="Number of bookings in different periods(4 hours split)" aspect={2 / 1} />
          <Piechart title="Most popular room type" aspect={2/1}/>
        </div>
        {/*<div className="piechart">
        <Piechart />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
        <Table />
        </div>*/}
      </div>
    </div>
  );
};

export default Home;
