import React from 'react';

const ViewsTable = ({ data }) => {
  const headers = ["Page Title", "Screen Class", "Page Views", "Engagement Duration", "Active Users", "Event Count", "Average Session Duration"];

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {headers.map(header => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, index) => (
            <tr key={index}>
              <td>{row.dimensionValues[0].value}</td>
              <td>{row.dimensionValues[1].value}</td>
              <td>{row.metricValues[0].value}</td>
              <td>{row.metricValues[1].value}s</td>
              <td>{row.metricValues[2].value}</td>
              <td>{row.metricValues[3].value}</td>
              <td>{row.metricValues[4].value}s</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewsTable;
