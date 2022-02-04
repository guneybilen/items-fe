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
  } else {
    console.log('login in failed ', response.status);
    fail();
  }
};

export default login_api;
