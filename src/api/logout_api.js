import axios from 'axios';

const login_api = async () => {
  const response = await axios.get(`http://localhost:8000/api/logout/`);

  if (response.status === 200) {
    console.log('success');
  } else {
    console.log('login in failed ', response.status);
  }
};

export default login_api;
