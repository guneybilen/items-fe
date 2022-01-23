import { useParams, Link, useNavigate } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { format, parseISO } from 'date-fns';

const ItemPage = () => {
  const { sluggedName } = useParams();
  const history = useNavigate();
  const deleteItem = useStoreActions((actions) => actions.deleteItem);
  const getItemById = useStoreState((state) => state.getItemById);
  const item = getItemById(sluggedName);

  // let dt = format(parseISO(item.createdAt), 'MMMM dd, yyyy pp');

  const handleDelete = (id) => {
    deleteItem(id);
    history('/');
  };

  return (
    <main className="PostPage">
      <article className="post">
        {item && (
          <>
            <h3>{item?.brand}</h3>
            <p>{item?.model}</p>
            <p>CAD$ {item.price}</p>

            <p className="itemBody">{item?.entry}</p>

            <p className="itemDate">
              {item.createdAt &&
                format(parseISO(item.createdAt), 'MMMM dd, yyyy pp')}
            </p>

            <Link to={`/edit/${item.slug}`}>
              <button className="editButton">Edit Item</button>
            </Link>
            <button
              className="deleteButton"
              onClick={() => handleDelete(item.sluggedName)}
            >
              Delete Item
            </button>
          </>
        )}
        {/* {!item && (
          <>
            <h2>item not found</h2>
            <p>well, that is disappointing</p>
            <p>
              <Link to="/">visit our homepage</Link>
            </p>
          </>
        )} */}
      </article>
    </main>
  );
};

export default ItemPage;
