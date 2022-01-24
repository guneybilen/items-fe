import React from 'react';
import login_api from '../api/login_api';
import { useStoreActions } from 'easy-peasy';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const history = useNavigate();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [message, setMessage] = React.useState('');
  const setUser = useStoreActions((actions) => actions.setUser);
  const setId = useStoreActions((actions) => actions.setId);
  const setUserNameEasyPeasy = useStoreActions(
    (actions) => actions.setUsername
  );
  const setNickname = useStoreActions((actions) => actions.setNickname);

  const success = (data, username) => {
    console.log('Authenticated!');
    localStorage.setItem('access', data.access);
    localStorage.setItem('refresh', data.refresh);
    setUser(username);
    setId(data.id);
    setUserNameEasyPeasy(data.username);
    setNickname(data.nickname);
    history('/');
  };

  const tryLogin = async (e) => {
    e.preventDefault();
    await login_api(username, password, success, (text) => {
      setMessage(text);
    });
  };

  return (
    <div>
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
        <button type="submit" className="btn btn-primary" onClick={tryLogin}>
          Login
        </button>
      </form>
    </div>
  );
}
