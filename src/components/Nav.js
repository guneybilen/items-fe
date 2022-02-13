import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import logout_api from '../api/logout_api';

const Nav = () => {
  const history = useNavigate();
  const items = useStoreState((state) => state.items);
  const search = useStoreState((state) => state.search);
  const setSearch = useStoreActions((actions) => actions.setSearch);
  const [show, setShow] = useState(false);
  const [closeonclick, setCloseOnClick] = useState(false);

  const setSearchResults = useStoreActions(
    (actions) => actions.setSearchResults
  );

  const handleLogout = (e) => {
    e.preventDefault();
    setShow(true);
    logout_api()
      .then(() => {
        setShow(false);
      })
      .catch(() => {});
    setCloseOnClick(false);
    history('/');
  };

  useEffect(() => {
    if (Array.isArray(items) && items.length > 0) {
      const filteredResults = items.filter(
        (item) =>
          item.brand.toLowerCase().includes(search.toLowerCase()) ||
          item.model.toLowerCase().includes(search.toLowerCase()) ||
          parseInt(item.price) === parseInt(search.toLowerCase()) ||
          item.entry.toLowerCase().includes(search.toLowerCase())
      );
      setSearchResults(filteredResults.reverse());
    } else {
      setSearchResults('');
    }
  }, [items, search, setSearchResults]);

  const displayNone = (e) => {
    e.preventDefault();
    setCloseOnClick(true);
  };

  return (
    <>
      {show && !closeonclick && (
        <div
          className="blur loader"
          role="status"
          onClick={(e) => displayNone(e)}
        />
      )}
      <nav className="Nav">
        <form action="" className="inline" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <input
              id="search"
              type="text"
              placeholder="search items"
              className="searchInput"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {localStorage.getItem('nickname') && (
              <>
                <a href="/" className="logout" onClick={(e) => handleLogout(e)}>
                  Logout
                </a>
                <i className="nickname">
                  <i>{localStorage.getItem('nickname')}</i>
                </i>
              </>
            )}
            {!localStorage.getItem('nickname') && (
              <NavLink to="/login" className="login">
                Login
              </NavLink>
            )}
          </div>
        </form>
      </nav>
      <ul>
        <li>
          <NavLink to="/" className="homelink">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/item">New</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          {!localStorage.getItem('nickname') && (
            <NavLink to="/signup">Signup</NavLink>
          )}

          {localStorage.getItem('nickname') && (
            <>
              <NavLink to="/profile" className="profileLink">
                Profile
              </NavLink>
            </>
          )}
        </li>
      </ul>
    </>
  );
};

export default Nav;
