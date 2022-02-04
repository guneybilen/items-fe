import axios from 'axios';

let server;
if (process.env.NODE_ENV === 'development') {
  server = 'http://localhost:8000/api';
} else {
  server = 'https://justlikenew-vaauo.ondigitalocean.app/api';
}

const login_api = async (username, password, success, fail) => {
  const json = JSON.stringify({ email: username, password: password });
  let response = await axios.post(`${server}/login/`, json, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status === 200) {
    success(response.data);
    localStorage.setItem('access', response.data.access_token);
    localStorage.setItem('refresh', response.data.refresh_token);
    localStorage.setItem('nickname', response.data['user']['nickname']);
    localStorage.setItem('loggedInId', response.data['user']['id']);
  } else {
    console.log('login in failed ', response.status);
    fail();
  }
};

export default login_api;
