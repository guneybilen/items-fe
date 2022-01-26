import React, { useState } from 'react';
import login_api from '../api/login_api';
import { useStoreActions } from 'easy-peasy';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const setNicknameEasyPeasy = useStoreActions(
    (actions) => actions.setLoggedInNickname
  );

  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [nickname, setNickname] = useState('');
  const [errors, setErrors] = useState(false);
  //eslint-disable-next-line
  const [loading, setLoading] = useState(true);
  const history = useNavigate();

  //eslint-disable-next-line
  const success = (data) => {
    console.log('Authenticated!');
    localStorage.setItem('access', data.access);
    localStorage.setItem('refresh', data.refresh);
    setNicknameEasyPeasy(nickname);
    history('/');
  };

  //eslint-disable-next-line
  const fail = () => {
    setEmail('');
    setPassword1('');
    setPassword2('');
    setNickname('');
    localStorage.clear();
    setErrors(true);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const user = {
      email: email,
      password: password1,
      password2: password2,
      nickname: nickname,
    };

    fetch('http://127.0.0.1:8000/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then(() => {
        login_api(email, password1, success, fail);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <main className="PostPage text-center">
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
              value={password1}
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
              type="password"
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
              onChange={(e) => setNickname(e.target.value)}
              required
            />{' '}
            <br />
            <br />
            <input type="submit" value="Signup" />
          </div>
        </form>
      </main>
    </>
  );
};

export default Signup;
