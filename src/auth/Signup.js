import React, { useState, useRef } from 'react';
import login_api from '../api/login_api';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const scrollRef = useRef(null);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [nickname, setNickname] = useState('');
  const [errors, setErrors] = useState(false);
  //eslint-disable-next-line
  const [loading, setLoading] = useState(true);
  const history = useNavigate();

  const scrollTo = (ref) => {
    if (ref && ref.current /* + other conditions */) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  //eslint-disable-next-line
  const success = (data) => {
    console.log('Authenticated!');
    // console.log(data);
    history('/');
  };

  //eslint-disable-next-line
  const fail = () => {
    localStorage.clear();
    setEmail('');
    setPassword1('');
    setPassword2('');
    setNickname('');
    setErrors(true);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const user = {
      email: email,
      password: password1,
      passwordConfirm: password2,
      nickname: nickname,
    };

    let url;

    if (process.env.NODE_ENV === 'development') {
      url = 'http://localhost:8000/api/users/';
    } else {
      url = 'https://justlikenew-vaauo.ondigitalocean.app/api/users/';
    }

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(text);
          });
        } else {
          return res.json();
        }
      })
      .then(() => {
        login_api(email, password1, success, fail);
      })
      .catch((err) => {
        let errorLocal = err;
        // console.log('errorLocal', JSON.parse(errorLocal['message']).message);
        setError(JSON.parse(errorLocal['message']).message);
        scrollTo(scrollRef);
      });
  };

  return (
    <>
      <main className="SignupPage text-center">
        {error && (
          <div className="alert" id="id001" ref={scrollRef}>
            <span
              className="closebtn"
              // onClick="this.parentElement.style.display='none';"
            >
              &times;
            </span>
            <strong>{error}</strong>
          </div>
        )}
        <form onSubmit={onSubmit}>
          <div>
            {loading === false && <h1>Signup</h1>}
            {errors === true && (
              <h2>Cannot signup with provided credentials</h2>
            )}
            <label htmlFor="email" className="form-label">
              Email address:
            </label>{' '}
            <br />
            <input
              name="email"
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />{' '}
            <br />
            <label htmlFor="password1" className="form-label">
              Password:
            </label>{' '}
            <br />
            <input
              name="password1"
              type="password"
              className="form-control"
              value={password1}
              autoComplete="on"
              onChange={(e) => setPassword1(e.target.value)}
              required
            />{' '}
            <br />
            <label htmlFor="password2" className="form-label">
              Confirm password:
            </label>{' '}
            <br />
            <input
              name="password2"
              autoComplete="on"
              type="password"
              className="form-control"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
            />{' '}
            <br />
            <label htmlFor="nickname" className="form-label">
              Nickname:
            </label>{' '}
            <br />
            <input
              name="nickname"
              type="text"
              value={nickname}
              className="form-control"
              onChange={(e) => setNickname(e.target.value)}
              required
            />{' '}
            <br />
            <input
              type="submit"
              value="Signup"
              className="btn btn-primary btn-lg w-100"
            />
          </div>
        </form>
      </main>
    </>
  );
};

export default Signup;
