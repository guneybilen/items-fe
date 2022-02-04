import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';
import About from './components/About';
import Home from './components/Home';
import Login from './auth/Login';
import Signup from './auth/Signup';
import ItemPage from './components/ItemPage';
import { useStoreActions } from 'easy-peasy';
import { useEffect } from 'react';
import useAxiosFetch from './hooks/useAxiosFetch';
import RequireAuth from './components/RequireAuth';
import { Routes, Route } from 'react-router-dom';
// import { construction } from '../public/construction.png';

let url;
if (process.env.NODE_ENV === 'development') {
  url = 'http://localhost:8000/api';
} else {
  url = 'https://justlikenew-vaauo.ondigitalocean.app/api';
}

function App() {
  const setItems = useStoreActions((actions) => actions.setItems);
  const { data } = useAxiosFetch(`${url}/items/`);

  useEffect(() => {
    // console.log(data);
    setItems(data);
  }, [data, setItems]);

  return (
    <div className="App">
      <img
        src="/construction.png"
        className="construction"
        alt="construction"
      />
      <Header title="electronics guru" />
      <Nav />
      <Routes>
        <Route forceRefresh={true} path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="items/:slug" element={<ItemPage />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <RequireAuth />
      <Footer />
    </div>
  );
}

export default App;
