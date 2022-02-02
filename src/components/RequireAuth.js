import NewItem from './NewItem';
import Profile from './Profile';
import EditItem from './EditItem';
import axios from 'axios';
import usePostRefreshTokenAxios from '../hooks/usePostRefreshTokenAxios';

import { Routes, Route, Navigate } from 'react-router-dom';

function RequireAuth() {
  axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
  axios.defaults.xsrfCookieName = 'csrftoken';
  // axios.defaults.withCredentials = true;
  usePostRefreshTokenAxios();
  return (
    <Routes>
      <Route
        path="/item"
        element={
          <Auth redirectTo="/login">
            <NewItem />
          </Auth>
        }
      />
      <Route
        path="/edit/:slug"
        element={
          <Auth redirectTo="/login">
            <EditItem />
          </Auth>
        }
      />
      <Route
        path="/profile"
        element={
          <Auth redirectTo="/login">
            <Profile />
          </Auth>
        }
      />
    </Routes>
  );
}

export default RequireAuth;

function Auth({ children, redirectTo }) {
  let cookieValue;
  try {
    cookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith('loggedIn='))
      .split('=')[1];
  } catch (e) {
    cookieValue = false;
  }

  return cookieValue ? children : <Navigate to={redirectTo} />;
}
