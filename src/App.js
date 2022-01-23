import { useEffect } from 'react';
import useAxiosFetch from './hooks/useAxiosFetch';
import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './components/Home';
// import NewItem from './components/NewItem';
import ItemPage from './components/ItemPage';
import About from './components/About';
import Missing from './components/Missing';
import EditItem from './components/EditItem';
import Login from './auth/Login';

import { Route, Routes } from 'react-router-dom';
import { useStoreActions } from 'easy-peasy';

function App() {
  const setItems = useStoreActions((actions) => actions.setItems);

  const { data, fetchError, isLoading } = useAxiosFetch(
    'http://localhost:8000/api/items/'
  );

  useEffect(() => {
    setItems(data);
  }, [data, setItems]);

  return (
    <div className="App">
      <Header title="electronics guru" />
      <Nav />
      <Routes>
        <Route
          path="/"
          exact
          element={<Home fetchError={fetchError} isLoading={isLoading} />}
        />
        {/* <Route path="/item" exact element={<NewItem />} /> */}
        <Route path="login/" exact element={<Login />} />
        <Route path="edit/:sluggedName" exact element={<EditItem />} />
        <Route path="items/:sluggedName" element={<ItemPage />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
