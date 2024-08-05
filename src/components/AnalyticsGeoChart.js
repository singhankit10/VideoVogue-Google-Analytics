import React from 'react';
import { Chart } from "react-google-charts";


  const AnalyticsGeoChart = ({ data }) => {
    const labels = data.rows.map(row => row.dimensionValues[0].value);
    const values = data.rows.map(row => row.metricValues[0].value);
  
    // const chartData = {
    //   labels,
    //   datasets: [
    //     {
    //       label: 'Active Users',
    //       data: values,
    //       borderColor: 'rgba(75, 192, 192, 1)',
    //       backgroundColor: 'rgba(75, 192, 192, 0.2)',
    //     },
    //   ],
    // };
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
