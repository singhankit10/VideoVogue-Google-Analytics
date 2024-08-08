import React from 'react';
import { Chart } from 'react-google-charts';

const AnalyticsBarChart = ({ data }) => {
  const chartData = [
    ['Page Title', 'Views'],
    ...data.rows.map(row => [
      row.dimensionValues[0].value,
      parseInt(row.metricValues[0].value)
    ])
  ];

  const options = {
    title: 'Views by Page title and screen class',
    chartArea: { width: '50%' },
    hAxis: {
      title: 'Views',
      minValue: 0,
    },
    vAxis: {
      title: 'Page Title',
    },
  };

  return (
    <Chart
      chartType="BarChart"
      data={chartData}
      options={options}
      width="100%"
      height="400px"
    />
  );
};

export default AnalyticsBarChart;
