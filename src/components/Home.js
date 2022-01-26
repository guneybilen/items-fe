import Feed from './Feed';
import { useStoreState } from 'easy-peasy';
import useAxiosFetch from '../hooks/useAxiosFetch';
import { useStoreActions } from 'easy-peasy';
import { useEffect } from 'react';

const Home = () => {
  const searchResults = useStoreState((state) => state.searchResults);
  const setItems = useStoreActions((actions) => actions.setItems);

  const { data, fetchError, isLoading } = useAxiosFetch(
    'http://localhost:8000/api/items/'
  );

  useEffect(() => {
    setItems(data);
    // console.log(data);
  }, [data, setItems]);

  return (
    <main className="Home">
      {isLoading && <p className="statusMsg">Loading posts...</p>}
      {!isLoading && fetchError && (
        <p className="statusMsg" style={{ color: 'red' }}>
          {fetchError}
        </p>
      )}
      {!isLoading &&
        !fetchError &&
        (searchResults && searchResults.length ? (
          <Feed items={searchResults} />
        ) : (
          <p className="statusMsg">No items to display.</p>
        ))}
    </main>
  );
};

export default Home;
