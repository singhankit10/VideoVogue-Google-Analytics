import React, { useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';

const Auth = ({ setToken }) => {
  const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      console.log('Login Success', tokenResponse);
      setToken(tokenResponse.access_token);
      localStorage.setItem('token', tokenResponse.access_token);
    },
    onError: () => console.log('Login Failed'),
    scope: 'https://www.googleapis.com/auth/analytics.readonly',
    redirectUri: 'http://localhost:3000',
  });

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      console.log('Token from local storage', storedToken);
      setToken(storedToken);
    }
  }, [setToken]);

  return (
    <div>
      <button onClick={() => login()}>Login with Google</button>
    </div>
  );
};

export default Auth;
