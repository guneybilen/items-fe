import React from 'react';
import login_api from '../api/login_api';

export default function Login() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [message, setMessage] = React.useState('');

  const success = (data) => {
    console.log('Authenticated!');
    localStorage.setItem('token', data.access);
    localStorage.setItem('token', data.refresh);
    window.location = '/';
  };

  const tryLogin = async (e) => {
    e.preventDefault();
    console.log('Loggin in with', username, password);
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
