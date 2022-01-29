import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import logout_api from '../api/logout_api';
import jwt_decode from 'jwt-decode';

const Nav = () => {
  const history = useNavigate();
  const items = useStoreState((state) => state.items);
  const search = useStoreState((state) => state.search);
  const setSearch = useStoreActions((actions) => actions.setSearch);
  const setLoggedInNickname = useStoreActions(
    (actions) => actions.setLoggedInNickname
  );

  const setSearchResults = useStoreActions(
    (actions) => actions.setSearchResults
  );

  useEffect(() => {
    let decoded = jwt_decode(localStorage.getItem('access'));

    if (decoded['exp'] > Date.now()) {
      console.log(decoded['exp'] > Date.now());
      setLoggedInNickname('');
    }
  }, [setLoggedInNickname]);

  const handleLogout = () => {
    localStorage.clear();
    logout_api();
    setLoggedInNickname('');
    history('/');
  };

  useEffect(() => {
    try {
      const filteredResults =
        items &&
        items.filter(
          (item) =>
            item.brand.toLowerCase().includes(search.toLowerCase()) ||
            item.model.toLowerCase().includes(search.toLowerCase()) ||
            parseInt(item.price) === parseInt(search.toLowerCase()) ||
            item.entry.toLowerCase().includes(search.toLowerCase())
        );
      setSearchResults(filteredResults.reverse());
    } catch (e) {
      console.error(e);
      setSearchResults('');
    }
  }, [items, search, setSearchResults]);

  return (
    <nav className="Nav">
      <form
        action=""
        className="searchForm"
        onSubmit={(e) => e.preventDefault()}
      >
        <label htmlFor="search">Search Item</label>
        <input
          id="search"
          type="text"
          placeholder="search items"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/item">New</Link>
        </li>
        <li>
          {localStorage.getItem('nickname') && (
            //eslint-disable-next-line
            <a href="#" onClick={handleLogout}>
              Logout
            </a>
          )}
          {!localStorage.getItem('nickname') && <Link to="/login">Login</Link>}
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          {!localStorage.getItem('access') && <Link to="/signup">Signup</Link>}

          {localStorage.getItem('access') && (
            <span>
              <i>{localStorage.getItem('nickname')}</i>
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
