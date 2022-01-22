import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';
// import { format } from 'date-fns';

const EditItem = () => {
  const history = useNavigate();
  const { slug } = useParams();

  const brand = useStoreState((state) => state.brand);
  const model = useStoreState((state) => state.model);
  const entry = useStoreState((state) => state.entry);
  const price = useStoreState((state) => state.price);

  const setBrand = useStoreActions((actions) => actions.setBrand);
  const setModel = useStoreActions((actions) => actions.setModel);
  const setPrice = useStoreActions((actions) => actions.setPrice);
  const setEntry = useStoreActions((actions) => actions.setEntry);

  const editItem = useStoreActions((actions) => actions.editItem);

  const getItemById = useStoreState((state) => state.getItemById);
  const item = getItemById(slug);

  useEffect(() => {
    if (item) {
      setBrand(item.brand);
      setModel(item.model);
      setPrice(item.price);
      setEntry(item.entry);
    }
  }, [item, setBrand, setModel, setPrice, setEntry]);

  const handleEdit = (slug) => {
    // const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedItem = {
      slug: slug,
      brand: brand,
      model: model,
      price: price,
      entry: entry,
    };
    editItem(updatedItem);
    history(`/item/${slug}`);
  };

  return (
    <main className="NewPost">
      {item && (
        <>
          <h2>Edit Item</h2>
          <form
            action=""
            className="newPostForm"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="itemBrand">Brand:</label>
            <input
              type="text"
              id="itemBrand"
              required
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
            <label htmlFor="itemModel">Model:</label>
            <input
              type="text"
              id="itemModel"
              required
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />
            <label htmlFor="itemPrice">Price:</label>
            <input
              type="text"
              id="itemPrice"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <label htmlFor="itemBody">Entry:</label>
            <textarea
              type="text"
              id="itemBody"
              required
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
            />
            <button type="button" onClick={() => handleEdit(item.slug)}>
              Submit
            </button>
          </form>
        </>
      )}
      {!brand && !model && !price && (
        <>
          <h2>item not found</h2>
          <p>well that's dissapponting.</p>
          <p>
            <Link to="/">visit our homepage</Link>
          </p>
        </>
      )}
    </main>
  );
};

export default EditItem;
