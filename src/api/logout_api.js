import axios from 'axios';

let origin;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  origin = 'http://localhost:8000/api';
} else {
  origin = 'https://justlikenew-vaauo.ondigitalocean.app/api';
}

const logout_api = async () => {
  console.log(`Bearer ${localStorage.getItem('refresh')}`);
  let response = await axios.post(
    `${origin}/logout/`,
    { id: localStorage.getItem('loggedInId') },
    {
      headers: {
        'Content-Type': 'application/json',
        // access: `Bearer ${localStorage.getItem('access')}`,
        refresh: `Bearer ${localStorage.getItem('refresh')}`,
      },
    }
  );
  if (response.status === 202) {
    localStorage.clear();
    console.log('success');
    // window.location.href = '/login';
  } else {
    console.log('login out failed ', response.status);
  }
};

export default logout_api;
