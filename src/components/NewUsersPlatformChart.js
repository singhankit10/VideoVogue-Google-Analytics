import React from 'react';
import { Chart } from 'react-google-charts';

const NewUsersPlatformChart = ({ data }) => {
  const chartData = [
    ['Platform', 'New Users'],
    ['Web', data.rows.reduce((sum, row) => sum + Number(row.metricValues[2].value), 0)],
  ];

  const options = {
    title: 'New Users by Platform',
    pieHole: 0.4,
  };

  return (
    <Chart
      chartType="PieChart"
      data={chartData}
      options={options}
      width="100%"
      height="400px"
    />
  );
};

export default NewUsersPlatformChart;
