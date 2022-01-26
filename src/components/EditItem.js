import { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';
// import { format } from 'date-fns';

const EditItem = () => {
  const history = useNavigate();
  const updated = useRef(false);
  const dirty = useRef(false);

  const formEl = useRef(null);

  const { slug } = useParams();

  const brand = useStoreState((state) => state.brand);

  const sellerNickname = useStoreState((state) => state.sellerNickname);
  const model = useStoreState((state) => state.model);
  const entry = useStoreState((state) => state.entry);
  const price = useStoreState((state) => state.price);
  const seller = useStoreState((state) => state.seller);
  const sluggy = useStoreState((state) => state.slug);
  const setBrand = useStoreActions((actions) => actions.setBrand);
  const setModel = useStoreActions((actions) => actions.setModel);
  const setPrice = useStoreActions((actions) => actions.setPrice);
  const setEntry = useStoreActions((actions) => actions.setEntry);
  const setSellerNickname = useStoreActions(
    (actions) => actions.setSellerNickname
  );
  const setSeller = useStoreActions((actions) => actions.setSeller);
  const setSlug = useStoreActions((actions) => actions.setSlug);
  const editItem = useStoreActions((actions) => actions.editItem);

  const getItemById = useStoreState((state) => state.getItemById);
  const item = getItemById(slug);

  // console.log('sluggy', sluggy);
  // console.log('slug', slug);

  useEffect(() => {
    if (updated.current === true && dirty.current === false) {
      history(`/items/${slug}`);
    }

    if (updated.current === true && dirty.current === true) {
      history(`/items/${sluggy}`);
    }
  });

  useEffect(() => {
    if (item) {
      setSlug(slug);
      setBrand(item.brand);
      setModel(item.model);
      setPrice(item.price);
      setEntry(item.entry);
      setSellerNickname(item.get_seller_nickname);
      setSeller(item.seller);
      setSlug(item.slug);
    }

    let eventVar;
    if (formEl && formEl.current) {
      eventVar = formEl.current.addEventListener('input', () => {
        dirty.current = true;
      });
    }

    return () => eventVar?.removeEventListener('input');

    //eslint-disable-next-line
  }, [item, setBrand, setModel, setPrice, setEntry, setSeller, setSlug]);

  const handleEdit = (sluggy) => {
    // const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedItem = {
      slug: sluggy,
      brand: brand,
      model: model,
      price: price,
      entry: entry,
      seller: seller,
      nickname: sellerNickname,
    };
    editItem(updatedItem);
    updated.current = true;
  };

  return (
    <main className="NewPost">
      {item && (
        <>
          <h2>Edit Item</h2>
          <form
            action=""
            className="newPostForm"
            ref={formEl}
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
            <label htmlFor="itemPrice">CAD$ Price:</label>
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
            <button
              type="button"
              onClick={() => {
                handleEdit(sluggy);
              }}
            >
              Submit
            </button>
          </form>
        </>
      )}
    </main>
  );
};
export default EditItem;
