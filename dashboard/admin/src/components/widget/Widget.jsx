import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
//import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
//import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';// booking
import VisibilityIcon from '@mui/icons-material/Visibility'; // views
import PersonAddIcon from '@mui/icons-material/PersonAdd';
//import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import axios from "axios";
import { useEffect, useState } from "react";

const Widget = ({ type }) => {
  let data;
  const [allBooking, setallBooking] = useState([]);
  const [allUsers, setallUsers] = useState([]);

  useEffect(() => {
    async function fetchAllusers() {
      const { data } = await axios.get("/transactions/totalBookings");
      setallBooking(data);
      const { data : data1 } = await axios.get("/transactions/totalUsers");
      setallUsers(data1);
      // console.log(data);
    }
    fetchAllusers();
  }, []);

  //temporary
  //const amount = 100;
  //const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        amount:allUsers,
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "booking":
      data = {
        title: "BOOKING",
        isMoney: false,
        link: "Number of booking",
        amount:allBooking,
        icon: (
          <EventAvailableIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    // case "views":
    //   data = {
    //     title: "VIEWS",
    //     isMoney: false,
    //     link: "User view",
    //     icon: (
    //       <VisibilityIcon
    //         className="icon"
    //         style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
    //       />
    //     ),
    //   };
    // break;
    // case "active users":
    //   data = {
    //     title: "ACTIVE USERS",
    //     isMoney: false,
    //     link: "See all active users",
    //     icon: (
    //       <PersonAddIcon
    //         className="icon"
    //         style={{
    //           backgroundColor: "rgba(128, 0, 128, 0.2)",
    //           color: "purple",
    //         }}
    //       />
    //     ),
    //   };
    break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {data.amount}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {/* {diff} % */}
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
