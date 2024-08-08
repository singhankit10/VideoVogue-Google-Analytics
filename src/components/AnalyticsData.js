import React, { useState, useEffect } from 'react';
import axios from 'axios';

import AnalyticsTable from './AnalyticsTable';
import AnalyticsBarChart from './AnalyticsBarChart';
import AnalyticsLineChart from './AnalyticsLineChart';
import '../styles.css';

const AnalyticsData = ({ token }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      console.log('Fetching data with token', token);
      const fetchData = async () => {
        const requestPayload = {
          dateRanges: [
            {
              startDate: '2024-07-01',
              endDate: '2024-08-04',
            },
          ],
          dimensions: [
            { name: 'pageTitle' },
            { name: 'eventName' }
          ],
          metrics: [
            { name: 'screenPageViews' },
            { name: 'userEngagementDuration' },
            { name: 'activeUsers' }, // Add active users metric
            { name: 'eventCount' }, // Add event count metric
            { name: 'averageSessionDuration' } // Add average session duration metric
          ],
        };

        console.log('Request Payload:', requestPayload);

        try {
          const response = await axios.post(
            'https://analyticsdata.googleapis.com/v1beta/properties/442280582:runReport',
            requestPayload,
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
            pageTitle: row.dimensionValues[0].value,
            eventName: row.dimensionValues[1].value,
            screenPageViews: row.metricValues[0].value,
            userEngagementDuration: row.metricValues[1].value,
            activeUsers: row.metricValues[2].value, // Add active users to log data
            eventCount: row.metricValues[3].value, // Add event count to log data
            averageSessionDuration: row.metricValues[4].value, // Add average session duration to log data
          }));

          console.log(logData);
        } catch (error) {
          console.error('Error fetching data', error);
          if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
          } else if (error.request) {
            console.error('Request data:', error.request);
          } else {
            console.error('Error message:', error.message);
          }
          setError(error);
        }
      };

      fetchData();
    }
  }, [token]);

  if (error) {
    console.error('Request failed with status code:', error.response?.status);
    console.error('Error details:', error.response?.data);
    return <div>Error fetching data: {error.message}</div>;
  }
  if (!data) return <div>Loading...</div>;

  return (
    <div className="container">
      <h2>GA4 Analytics Data</h2>
      <AnalyticsLineChart data={data} />
      <AnalyticsBarChart data={data} />
      <AnalyticsTable data={data} />
    </div>
  );
};

export default AnalyticsData;
