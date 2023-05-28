import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

function Chartscreen() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: response } = await axios.get('/api/bookings/getRoomTypePopularity');
        setData(response);
        console.log(response);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: 'Room Type Popularity',
        data: Object.values(data),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 205, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderWidth: 1,
      },
    ],
  };

  console.log(chartData);

  return (
    <div>
      <h1>Room Type Popularity</h1>
      <div>
        <Bar
          data={chartData}
        />
      </div>
    </div>
  );
}

export default Chartscreen;
