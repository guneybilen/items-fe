import { useParams, Link, useNavigate } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { format, parseISO } from 'date-fns';
import { useState, useEffect } from 'react';

const ItemPage = () => {
  const { slug } = useParams();
  const history = useNavigate();
  const loggedInNickname = useStoreState((state) => state.loggedInNickname);
  const loggedInID = useStoreState((state) => state.loggedInID);
  const deleteItem = useStoreActions((actions) => actions.deleteItem);
  const getItemById = useStoreState((state) => state.getItemById);
  const item = getItemById(slug);
  const [itemOwner, setItemOwner] = useState(false);

  // let dt = format(parseISO(item.createdAt), 'MMMM dd, yyyy pp');

  const handleDelete = (slug) => {
    let confirmation = window.confirm('Are you sure for deleting the item?');
    if (confirmation) {
      deleteItem({ slug: slug, nickname: item.get_seller_nickname });
      history('/');
    }
  };

  useEffect(() => {
    if (
      item &&
      item.get_seller_nickname === loggedInNickname &&
      parseInt(item.seller) === parseInt(loggedInID)
    )
      setItemOwner(true);
  }, [item, loggedInNickname, loggedInID]);

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

            {itemOwner && (
              <>
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
          </>
        )}
      </article>
    </main>
  );
};

export default ItemPage;
