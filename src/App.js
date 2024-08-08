import React, { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Auth from './components/Auth';
// import AnalyticsData from './components/AnalyticsData';
import Overview from './components/Overview';

const App = () => {
  const [token, setToken] = useState(null);

  const handleSetToken = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
  };

  return (
    <GoogleOAuthProvider clientId="430206269404-hoe018qt8tm41fa16uge4dl0pgt4r26b.apps.googleusercontent.com">
      <div className="App">
        <h1>GA4 Analytics Data</h1>
        {!token ? (
          <Auth setToken={handleSetToken} />
        ) : (
          <Overview token={token} />
        )}
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;
