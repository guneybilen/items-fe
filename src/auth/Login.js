import React, { useState, useRef } from 'react';
import login_api from '../api/login_api';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const myRef = useRef(null);
  const history = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [alert, setAlert] = useState('');
  const [link, setLink] = useState(false);

  const requestActivation = (e) => {
    e.preventDefault();
    let url;

    if (process.env.NODE_ENV === 'development') {
      url = 'http://localhost:8000/api/repeatactivate/';
    } else {
      url = 'https://justlikenew.shop/api/repeatactivate/';
    }

    axios
      .post(
        url,
        { username: username },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        // console.log(data);
        if (data.state) {
          setError(true);
          setAlert(data.state);
          scrollTo(myRef);
        }
      })
      .catch((error) => {
        console.log(error.response);
        setError(true);
        setAlert(error.response.data.message);
        scrollTo(myRef);
      });
  };

  const scrollTo = (ref) => {
    if (ref && ref.current /* + other conditions */) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const success = () => {
    console.log('Authenticated!');
    history('/');
  };

  const fail = (status) => {
    console.log('Authentication Failed!');
    localStorage.clear();
    scrollTo(myRef);
    if (status === 401) setAlert('wrong email and/or password');
    if (status === 403) {
      setLink(true);

      setAlert(
        'You need to activate your account in order to authorize. You can request another activtion email from the link below'
      );
    }
    if (status === 500) setAlert('a problem in the server occurred');
  };

  const tryLogin = async (e) => {
    e.preventDefault();
    await login_api(username, password, success, fail);
  };

  const displayNone = (e) => {
    e.preventDefault();
    setError(false);
  };

  return (
    <main className="LoginPage text-center">
      {(error || alert?.length > 0) && (
        <div className="alert" id="id001" ref={myRef}>
          <span className="closebtn" onClick={(e) => displayNone(e)}>
            &times;
          </span>
          <strong>{error ? error : <></>}</strong>
          <strong>{alert ? alert : <></>}</strong>
        </div>
      )}
      <form>
        <br />
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Email
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
        <br />
        <br />
        {link ? (
          <button
            className="btn btn-primary btn-lg w-100"
            onClick={(e) => requestActivation(e)}
          >
            Request Activation Email
          </button>
        ) : (
          <></>
        )}
        <br />
        <br />
        <Link to="/forgotpassword">Forgot Password</Link>
      </form>
    </main>
  );
}
