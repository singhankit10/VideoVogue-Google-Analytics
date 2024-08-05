import React, { useState, useEffect } from 'react';
import axios from 'axios';

import AnalyticsTable from './AnalyticsTable';
import AnalyticsChart from './AnalyticsChart';
import AnalyticsGeoChart from './AnalyticsGeoChart';
import '../styles.css';

const AnalyticsData = ({ token }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      console.log('Fetching data with token', token);
      const fetchData = async () => {
        try {
          const response = await axios.post(
            'https://analyticsdata.googleapis.com/v1beta/properties/442280582:runReport',
            {
              dateRanges: [
                {
                  startDate: '2024-05-01',
                  endDate: '2024-07-31',
                },
              ],
              dimensions: [
                {
                  name: 'date',
                },
                {
                  name: 'eventName',
                },
              ],
              metrics: [
                {
                  name: 'activeUsers',
                },
                {
                  name: 'eventCount',
                },
                {
                  name: 'eventValue',
                },
                {
                  name: 'totalUsers',
                }
              ],
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log('API Response', response.data);
          setData(response.data);

          // Prepare an array to log the data
          const logData = response.data.rows.map(row => ({
            date: row.dimensionValues[0].value,
            eventName: row.dimensionValues[1].value,
            activeUsers: row.metricValues[0].value,
            eventCount: row.metricValues[1].value,
            eventValue: row.metricValues[2].value,
            evenCountPerUser: row.metricValues[1].value / row.metricValues[3].value,

          }));

          console.log(logData);
        } catch (error) {
          console.error('Error fetching data', error);
          setError(error);
        }
      };

      fetchData();
    }
  }, [token]);

  if (error) return <div>Error fetching data: {error.message}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="container">
      <h2>Analytics Data</h2>
      <AnalyticsGeoChart data={data} />
      <AnalyticsChart data={data} />
      <AnalyticsTable data={data} />
    </div>
  );
};

export default AnalyticsData;
