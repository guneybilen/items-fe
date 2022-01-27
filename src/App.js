import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './components/Home';
import NewItem from './components/NewItem';
import ItemPage from './components/ItemPage';
import About from './components/About';
import Missing from './components/Missing';
import EditItem from './components/EditItem';
import Login from './auth/Login';
import Signup from './auth/Signup';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useEffect } from 'react';
import useAxiosFetch from './hooks/useAxiosFetch';
import axios from 'axios';
import { Route, Routes, useNavigate } from 'react-router-dom';

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.withCredentials = true;

function App() {
  const history = useNavigate();
  const items = useStoreState((state) => state.items);
  const setItems = useStoreActions((actions) => actions.setItems);

  const { data, fetchError, isLoading } = useAxiosFetch(
    'http://localhost:8000/api/items/'
  );

  useEffect(() => {
    if (!localStorage.getItem('access')) {
      axios
        .post('http://localhost:8000/api/refreshtokenview/')
        .then((e) => localStorage.setItem('access', e.data.access_token))
        .catch((e) => {
          console.log(e.message);
        });
    }
  }, []);

  useEffect(() => {
    setItems(data);
    // console.log(data);
  }, [data, setItems]);

  // useEffect(() => {
  //   if (items) {
  //     setLoaded(true);
  //   }
  // }, [items]);

  return (
    <div className="App">
      <Header title="electronics guru" />
      <Nav />
      {items && (
        <Routes history={history}>
          <Route
            path="/"
            forceRefresh={true}
            exact
            element={<Home fetchError={fetchError} isLoading={isLoading} />}
          />
          <Route path="items/:slug" exact element={<ItemPage />} />
          <Route path="/item" exact element={<NewItem />} />
          <Route path="login/" element={<Login />} />
          <Route path="signup/" element={<Signup />} />

          <Route path="edit/:slug" element={<EditItem />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Missing />} />
        </Routes>
      )}
      <Footer />
    </div>
  );
}

export default App;
