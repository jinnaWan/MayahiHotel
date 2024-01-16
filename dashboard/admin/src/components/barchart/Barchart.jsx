import "./barchart.scss";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import axios from "axios";
import { useEffect, useState } from "react";

// const data = [
//   { name: "Standard Twin City View", Percentage: 40 },
//   { name: "Standard Double City View", Percentage: 45 },
//   { name: "Superior Garden View", Percentage: 60 },
//   { name: "Deluxe Garden View", Percentage: 70 },
//   { name: "Deluxe City View", Percentage: 90 },
// ];

const Barchart = ({ aspect, title }) => {
  const [newData, setnewData] = useState([]);

  useEffect(() => {
    async function fetchAllusers() {
      const { data } = await axios.get(
        "/transactions/getBookingTimeDistribution"
      );
      setnewData(data);
      console.log(data);
    }
    fetchAllusers();
  }, []);

  const data = newData.map(item => {
    return { name: item.range, Counts: item.count };
  });

  return (
    <div class="barchart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="90%" aspect={aspect}>
        <BarChart width="100%" data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" fontSize={13} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Counts" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Barchart;
