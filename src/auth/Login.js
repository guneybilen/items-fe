import React, { useEffect } from 'react';
import login_api from '../api/login_api';
import { useStoreActions } from 'easy-peasy';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const history = useNavigate();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [message, setMessage] = React.useState('');
  const setLoggedInID = useStoreActions((actions) => actions.setLoggedInID);
  // const loggedInNickname = useStoreState((state) => state.loggedInNickname);
  const setLoggedInNickname = useStoreActions(
    (actions) => actions.setLoggedInNickname
  );

  useEffect(() => {
    localStorage.clear();
  }, []);

  const success = (data) => {
    console.log('Authenticated!');
    console.log(data.user.nickname);
    localStorage.setItem('access', data.access_token);
    localStorage.setItem('refresh', data.refresh_token);
    localStorage.setItem('nickname', data['user']['nickname']);
    localStorage.setItem('loggedInId', data['user']['id']);
    setLoggedInID(data['user']['id']);
    setLoggedInNickname(data['user']['nickname']);
    console.log(data['user']['nickname']);
    history('/');
  };

  const tryLogin = async (e) => {
    e.preventDefault();
    await login_api(username, password, success, (text) => {
      setMessage(text);
    });
  };

  return (
    <main className="LoginPage text-center">
      <form>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            autoFocus
            type="text"
            className="form-control"
            id="username"
            placeholder="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="password"
            autoComplete="on"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
        </div>
        <div style={{ margin: '1em', color: 'red' }}>{message}</div>
        <button
          type="submit"
          className="btn btn-primary btn-lg w-100"
          onClick={tryLogin}
        >
          Login
        </button>
      </form>
    </main>
  );
}
