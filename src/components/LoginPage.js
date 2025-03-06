import {
  GoogleLogin,
  googleLogout,
  GoogleOAuthProvider,
} from '@react-oauth/google';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (credentialResponse) => {
    console.log('Successfully logged in!:', credentialResponse);
    const decode = jwtDecode(credentialResponse.credential);
    console.log('decoded user info:', decode);
    localStorage.setItem('user', JSON.stringify(decode));
    navigate('/landingpage');
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleLogin}
        onError={(credentialResponse) =>
          console.log('Failed to login!:', credentialResponse)
        }
      />
    </div>
  );
}
