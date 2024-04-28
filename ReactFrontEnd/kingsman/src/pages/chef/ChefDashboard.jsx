import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);


export default function ChefDashboard() {
  const data = {

    labels: ['Pizza', 'Burger', 'Pasta', 'Sandwich', 'Salad'],
    datasets: [
      {
        label: 'Number of Orders',
        data: [12, 19, 3, 5, 2],
        backgroundColor: 'aqua',
        borderWidth: 1,
        borderColor: 'black',
      },
    ],
  };

  const options = {
  };


  return (
    <div>
      <h2>Number of Orders per Food Item</h2>
      <Bar
        data = {data}
        options={options}
      ></Bar>
    </div>
  )
}
