import axios from 'axios';

const login_api = async (username, password, success, fail) => {
  const json = JSON.stringify({ email: username, password: password });
  const response = await axios.post(`http://localhost:8000/api/token/`, json, {
    headers: {
      // Overwrite Axios's automatically set Content-Type
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 200) {
    console.log('success');
    console.log(response);
    success(response.data);
  } else {
    console.log('login in failed ', response.status);
  }
};

export default login_api;
