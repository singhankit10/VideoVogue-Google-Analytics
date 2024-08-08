import React from 'react';
import { Chart } from 'react-google-charts';

const NewUsersChart = ({ data }) => {
  const chartData = [
    ['Event Name', 'New Users'],
    ...data.rows.map(row => [row.dimensionValues[1].value, Number(row.metricValues[2].value)]),  // Adjust based on actual metric for new users
  ];

  const options = {
    title: 'New Users Over Time',
    hAxis: { title: 'Event Name' },
    vAxis: { title: 'New Users' },
    legend: 'none',
  };

  return (
    <Chart
      chartType="LineChart"
      data={chartData}
      options={options}
      width="100%"
      height="400px"
      legendToggle
    />
  );
};

export default NewUsersChart;
