import axios from 'axios';

const login_api = async (username, password, success, fail) => {
  const json = JSON.stringify({ email: username, password: password });
  const response = await axios.post(
    `https://justlikenew-vaauo.ondigitalocean.app/api/login/`,
    json,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (response.status === 200) {
    console.log('success');
    // console.log(response.data);
    success(response.data);
  } else {
    console.log('login in failed ', response.status);
    fail();
  }
};

export default login_api;
