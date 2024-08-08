import React from 'react';
import { Chart } from 'react-google-charts';

const UsersChart = ({ data }) => {
  const chartData = [
    ['Event Name', 'Active Users'],
    ...data.rows.map(row => [row.dimensionValues[1].value, Number(row.metricValues[2].value)]),  // eventName is in dimensionValues[1] and activeUsers is in metricValues[2]
  ];

  const options = {
    title: 'Users Over Time',
    hAxis: { title: 'Event Name' },
    vAxis: { title: 'Active Users' },
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

export default UsersChart;
