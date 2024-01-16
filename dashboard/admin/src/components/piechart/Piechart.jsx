import { ResponsivePie } from "@nivo/pie";
import { useTheme } from "@mui/material";
import "./piechart.scss";
import React, { PureComponent } from "react";
//import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
//import ApexCharts from 'apexcharts';
//import PropTypes from 'prop-types';
import axios from "axios";
import { useEffect, useState } from "react";



// const data = [
//   {
//     id: "Standard Twin City View",
//     value: 60,
//   },
//   {
//     id: "Standard Double City View",
//     value: 102,
//   },
//   {
//     id: "Superior Garden View",
//     value: 275,
//   },
//   {
//     id: "Deluxe Garden View",
//     value: 476,
//   },
//   {
//     id: "Deluxe City View",
//     value: 338,
//   },
// ];

const Piechart = ({ title }) => {
  const [newData, setnewData] = useState([]);

  useEffect(() => {
    async function fetchAllusers() {
      const { data } = await axios.get(
        "/transactions/totalBookingsByRoomType"
      );
      setnewData(data);
      // console.log(data);
    }
    fetchAllusers();
  }, []);

  const data = Object.entries(newData).map(([id, value]) => ({
    id,
    value
  }));

  const theme = useTheme();
  //const colors = tokens(theme.palette.mode);
  return (
    <div class="piechart">
      <div className="title">{title}</div>
      <ResponsivePie
        width="500"
        height="300"
        // haspect={aspect}
        data={data}
        margin={{ top: 30, right: 60, bottom: 50, left: 50 }}
        innerRadius={0.45}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ scheme: "purple_orange" }}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#999"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        enableArcLabels={false}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        // legends={[
        //     {
        //         anchor: 'right',
        //         direction: 'column',
        //         justify: false,
        //         translateX: 20,
        //         translateY: 50,
        //         itemsSpacing: 0,
        //         itemWidth: 100,
        //         itemHeight: 18,
        //         itemTextColor: '#999',
        //         itemDirection: 'left-to-right',
        //         itemOpacity: 1,
        //         symbolSize: 18,
        //         symbolShape: 'circle',
        //         effects: [
        //             {
        //                 on: 'hover',
        //                 style: {
        //                     itemTextColor: '#000'
        //                 }
        //             }
        //         ]
        //     }
        // ]}
      />
    </div>
  );
};

{
  /*const PieChart = () => {
  useEffect(() => {
    const chart = new ApexCharts(document.getElementById('chart-demo-pie'), {
      chart: {
        type: 'donut',
        fontFamily: 'inherit',
        height: 240,
        sparkline: {
          enabled: true,
        },
        animations: {
          enabled: false,
        },
      },
      fill: {
        opacity: 1,
      },
      series: [44, 55, 12, 2],
      labels: ['Direct', 'Affiliate', 'E-mail', 'Other'],
      tooltip: {
        theme: 'dark',
      },
      grid: {
        strokeDashArray: 4,
      },
      colors: [
        tabler.getColor('primary'),
        tabler.getColor('primary', 0.8),
        tabler.getColor('primary', 0.6),
        tabler.getColor('gray-300'),
      ],
      legend: {
        show: true,
        position: 'bottom',
        offsetY: 12,
        markers: {
          width: 10,
          height: 10,
          radius: 100,
        },
        itemMargin: {
          horizontal: 8,
          vertical: 8,
        },
      },
      tooltip: {
        fillSeriesColor: false,
      },
    });

    chart.render();

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div className="card">
      <div className="card-body">
        <div id="chart-demo-pie" className="chart-lg"></div>
      </div>
    </div>
  );
};*/
}

{
  /*const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


const Piechart = ({aspect,title}) => 
{
    return (
    <div className="Piechart">
    <div className="title">{title}</div>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
    );
  };*/
}

export default Piechart;
