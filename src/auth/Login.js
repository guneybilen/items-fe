import React, { useState, useEffect } from 'react';
import login_api from '../api/login_api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const history = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.clear();
  }, []);

  const success = () => {
    console.log('Authenticated!');
    history('/');
  };

  const fail = (status) => {
    console.log('Authentication Failed!');
    localStorage.clear();
    if (status === 401) setError('please enter your email and password');
    if (status === 403)
      setError('there is a problem with your email or password');
    if (status === 500) setError('a problem in the server occurred');
  };

  const tryLogin = async (e) => {
    e.preventDefault();
    await login_api(username, password, success, fail);
  };

  const displayNone = (e) => {
    e.preventDefault();
    setError('');
  };

  return (
    <main className="LoginPage text-center">
      {error && (
        <div className="alert" id="id001">
          <span className="closebtn" onClick={(e) => displayNone(e)}>
            &times;
          </span>
          <strong>{error}</strong>
        </div>
      )}
      <form>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            autoFocus
            type="email"
            className="form-control"
            required
            id="username"
            placeholder="example@example.com"
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
            required
            autoComplete="on"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
        </div>
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
