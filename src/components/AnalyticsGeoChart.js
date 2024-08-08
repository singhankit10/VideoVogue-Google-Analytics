import React from 'react';
import { Chart } from "react-google-charts";

const AnalyticsGeoChart = ({ data }) => {
  const chartData = [
    ['Country', 'Active Users'], // Column headers
    ...data.rows.map(row => [
      row.dimensionValues[0].value, // Country
      parseFloat(row.metricValues[0].value) // Active Users
    ])
  ];

  return (
    <Chart
      chartType="GeoChart"
      data={chartData}
      width="100%"
      height="400px"
      legendToggle
    />
  );
};

export default AnalyticsGeoChart;