import Item from './Item';

const Feed = ({ items }) => {
  return (
    <>
      {items.map((item) => (
        <Item key={item.slug} item={item} />
      ))}
    </>
  );
};

export default Feed;
