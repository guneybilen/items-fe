import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

let url;

if (process.env.NODE_ENV === 'development') {
  url = 'http://localhost:8000/api/passwordreset/';
} else {
  url = 'https://justlikenew-vaauo.ondigitalocean.app/api/passwordreset/';
}

export default function ForgotPassword() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [errors, setErrors] = useState('');
  const [link, setLink] = useState(false);

  useEffect(() => {
    localStorage.clear();
  }, []);

  const sendRequestForReset = async (e) => {
    e.preventDefault();
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
        console.log(data);
        setErrors('');
        setErrors(data.state);
        setLink(true);
      })
      .catch((error) => {
        console.log(error.response);
        setError(true);
        setErrors(error.response.data.state);
      });
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
          <strong>{errors}</strong>
        </div>
      )}
      <form>
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

        <button
          type="submit"
          className="btn btn-primary btn-lg w-100"
          onClick={sendRequestForReset}
        >
          Send Password Reset Email
        </button>
      </form>

      <br />
      <br />
      {link ? <Link to="/">Goto Main Page</Link> : <></>}
    </main>
  );
}
