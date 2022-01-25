import { useParams, Link, useNavigate } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { format, parseISO } from 'date-fns';

const ItemPage = () => {
  const { slug } = useParams();
  const history = useNavigate();
  const nickname = useStoreState((state) => state.nickname);
  const deleteItem = useStoreActions((actions) => actions.deleteItem);
  const getItemById = useStoreState((state) => state.getItemById);
  const item = getItemById(slug);

  // let dt = format(parseISO(item.createdAt), 'MMMM dd, yyyy pp');

  const handleDelete = (slug) => {
    let confirmation = window.confirm('Are you sure for deleting the item?');
    if (confirmation) {
      deleteItem({ slug, nickname });
      history('/');
    }
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
              onClick={() => handleDelete(item.slug)}
            >
              Delete Item
            </button>
          </>
        )}
      </article>
    </main>
  );
};

export default ItemPage;
