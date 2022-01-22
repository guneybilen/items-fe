import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

const Item = ({ item }) => {
  let dt = format(parseISO(item.createdAt), 'MMMM dd, yyyy pp');
  return (
    <article className="item">
      <Link to={`items/${item.slug}/`} className="item-link">
        <div className="h4 text-dark">
          {item.brand} &nbsp;
          {item.model}
        </div>
        <div className="h5 text-dark">{item.price}</div>
        <p className="postDate">{dt}</p>
      </Link>
      <p className="postBody">
        {item.entry?.length < 25
          ? item.entry
          : `${item.entry?.slice(0, 25)}...`}
      </p>
      <hr />
    </article>
  );
};

export default Item;
