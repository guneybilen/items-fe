import axios from 'axios';

const logout_api = async () => {
  const response = await axios.get(
    `https://justlikenew-vaauo.ondigitalocean.app/api/logout/`
  );

  if (response.status === 200) {
    console.log('success');
  } else {
    console.log('login in failed ', response.status);
  }
};

export default logout_api;
