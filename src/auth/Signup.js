import React, { useState, useRef, useEffect } from 'react';
// import login_api from '../api/login_api';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

let backend;
if (process.env.NODE_ENV === 'development') {
  backend = 'http://localhost:8000/api/securityquestions/';
} else {
  backend =
    'https://justlikenew-vaauo.ondigitalocean.app/api/securityquestions/';
}

const Signup = () => {
  const scrollRef = useRef(null);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [names, setNames] = useState([]);
  const [values, setValues] = useState([]);
  const [forsend, setForSend] = useState('');
  const [answer, setAnswer] = useState([]);

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

  useEffect(() => {
    const grab = async () => {
      const result = await axios.get(backend);
      console.log(result.data);
      setNames(result.data.names);
      setValues(result.data.values);
    };

    grab();
  }, []);

  //eslint-disable-next-line
  const success = () => {
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
      s_name: forsend,
      s_answer: answer,
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
        // login_api(email, password1, success, fail);
        history('/login');
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
            />
            <br />
            <label htmlFor="security_question" className="form-label">
              Pick One For Your Secuirty Question:
            </label>
            <select
              id="security_question"
              className="form-select"
              aria-label="Default select example"
              value={forsend}
              onChange={(e) => setForSend(e.target.value)}
            >
              <>
                <option defaultValue="0">Open this select menu</option>
                <option value={names[0]}>{values[0]}</option>
                <option value={names[1]}>{values[1]}</option>
                <option value={names[2]}>{values[2]}</option>
                <option value={names[3]}>{values[3]}</option>
                <option value={names[4]}>{values[4]}</option>
                <option value={names[5]}>{values[5]}</option>
              </>
            </select>
            <br />
            <label htmlFor="security_question_answer" className="form-label">
              Type Your Answer For The Selected Security Question:
            </label>
            <br />
            <input
              name="sqanswer"
              id="security_question_answer"
              type="text"
              value={answer}
              className="form-control"
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
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
