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
import { useStoreState } from 'easy-peasy';
import { useState, useEffect } from 'react';

import { Route, Routes } from 'react-router-dom';

function App() {
  const items = useStoreState((state) => state.items);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, [items]);

  console.log(items);
  return (
    <div className="App">
      <Header title="electronics guru" />
      <Nav />
      <Routes>
        {loaded && <Route path="/" exact element={<Home />} />}
        <Route path="/item" exact element={<NewItem />} />
        <Route path="login/" exact element={<Login />} />
        <Route path="signup/" exact element={<Signup />} />

        <Route path="edit/:slug" exact element={<EditItem />} />
        <Route path="items/:slug" element={<ItemPage />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
