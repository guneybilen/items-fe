import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStoreActions } from 'easy-peasy';
import axios from 'axios';

const usePostRefreshTokenAxios = () => {
  axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.withCredentials = true;
  const history = useNavigate();
  const setLoggedInNickname = useStoreActions(
    (actions) => actions.setLoggedInNickname
  );

  useEffect(() => {
    async function fetchData() {
      try {
        let response = await axios.post(
          'http://localhost:8000/api/refreshtokenview/'
        );
        if (response.status === 200 && response.data['nickname']) {
          localStorage.setItem('access', response.data.access_token);
          localStorage.setItem('nickname', response.data.nickname);
          localStorage.setItem('loggedInId', response.data.user_id);
          setLoggedInNickname(response.data['nickname']);
        }
        if (response.status === 204) {
          localStorage.removeItem('nickname');
          setLoggedInNickname('');
        }
      } catch (e) {
        console.log(e.message);
        localStorage.clear();
      }
    }
    fetchData();
  }, [history, setLoggedInNickname]);
};

export default usePostRefreshTokenAxios;
