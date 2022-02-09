import React, { useState, useRef, useEffect } from 'react';
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
  const [answer, setAnswer] = useState('');

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

    axios
      .post(url, user, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log(data);
        history('/login');
      })
      .catch((error) => {
        console.log(error.response);
        setForSend('');
        setError(true);
        setErrors(error.response.data.message);
        scrollTo(scrollRef);
      });
  };

  const displayNone = (e) => {
    e.preventDefault();
    setError('');
  };

  return (
    <>
      <main className="SignupPage text-center">
        {error && (
          <div className="alert" id="id001" ref={scrollRef}>
            <span className="closebtn" onClick={(e) => displayNone(e)}>
              &times;
            </span>
            <strong>{errors}</strong>
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
            <label htmlFor="password2" className="form-label" required>
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
                <option value="">Choose one from the list</option>
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
