import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UsersChart from './UsersChart';
import ViewsTable from './ViewsTable';
import NewUsersChart from './NewUsersChart';
import NewUsersPlatformChart from './NewUsersPlatformChart';

const Overview = ({ token, setToken }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const requestPayload = {
        dateRanges: [
          {
            startDate: '2024-07-11',
            endDate: '2024-08-07',
          },
        ],
        dimensions: [
          { name: 'pageTitle' },
          { name: 'eventName' }
        ],
        metrics: [
          { name: 'screenPageViews' },
          { name: 'userEngagementDuration' },
          { name: 'activeUsers' },
          { name: 'eventCount' },
          { name: 'averageSessionDuration' }
        ],
      };

      console.log('Request Payload:', requestPayload);

      try {
        console.log('Making API call...');
        const response = await axios.post(
          'https://analyticsdata.googleapis.com/v1beta/properties/442280582:runReport',
          requestPayload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log('API Response:', response);
        setData(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error('Invalid token. Attempting to refresh...');
          localStorage.removeItem('token');
          setToken(null);
        } else {
          console.error('API Error:', error.response ? error.response.data : error.message);
          setError(error);
        }
      }
    };

    if (token) {
      console.log('Token:', token);
      fetchData();
    } else {
      console.warn('No token available. Please log in.');
    }
  }, [token, setToken]);

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }
  if (!data) return <div>Loading...</div>;

  return (
    <div className="container">
      <h2>GA4 Analytics Overview</h2>
      <UsersChart data={data} />
      <ViewsTable data={data} />
      <NewUsersChart data={data} />
      <NewUsersPlatformChart data={data} />
    </div>
  );
};

export default Overview;
